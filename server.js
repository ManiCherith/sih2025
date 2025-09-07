const logger = require('./logger');

'use strict';

require('dotenv').config(); 

const express = require('express'); const rateLimit = require('express-rate-limit'); const helmet = require('helmet'); const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
};



const { PrismaClient, Prisma } = require('@prisma/client');
const z = require('zod'); const argon2 = require('argon2'); // validation + hashing

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient(); 

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'replace_with_strong_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'replace_with_strong_secret';
const ACCESS_TOKEN_EXPIRES_IN = '15m';   // access tokens last 15 minutes
const REFRESH_TOKEN_EXPIRES_IN = '7d';  // refresh tokens last 7 days

const app = express();

app.use(helmet()); app.use(express.json());app.use(cookieParser());app.use(cors(corsOptions)); // security + JSON body parsing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip} on ${req.originalUrl}`);
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  },
});
app.use(['/auth/signup', '/auth/login', '/auth/refresh'], authLimiter);
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
// Health check

app.get('/health', (_req, res) => res.json({ ok: true })); // simple readiness probe

// Validation schema

const SignupSchema = z.object({
email: z.string().email().max(254),
password: z.string().min(12).max(200),
}); // strong basic rules
const IssueSchema = z.object({
  title: z.string().min(1).max(200),
  category: z.string(),
  description: z.string().min(1),
  location: z.string().min(1),
  priority: z.string(),
  coordinates: z.array(z.number()).optional()
});

const UpdateIssueSchema = z.object({
  status: z.string().optional(),
  assignedTo: z.string().optional(),
  upvotes: z.number().optional()
});

// Signup route

app.post('/auth/signup', async (req, res) => {
try {
const parsed = SignupSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ error: 'Invalid request' }); // input validation

const email = parsed.data.email.trim().toLowerCase(); 
const passwordHash = await argon2.hash(parsed.data.password); 
const user = await prisma.user.create({
data: { email, passwordHash, role: 'citizen' },
select: { id: true, email: true, role: true, createdAt: true },
}); 
return res.status(201).json(user); // success response
} catch (e) {
    if (
      (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') ||
      e.code === 'P2002'
    ) {
      // Unique constraint failed on the email field
      return res.status(409).json({ error: 'Email already registered' });
    }
    // Other errors
    return res.status(500).json({ error: 'Unexpected error' });
  }
});
// Replace your existing login route
app.post('/auth/login', async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(12),
    role: z.string().optional() // Add role to schema
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });

  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;
  const requestedRole = parsed.data.role; // Get requested role

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    // Check if user's role matches the requested role
    if (requestedRole && user.role !== requestedRole) {
      return res.status(403).json({ error: `Access denied. You are not authorized as ${requestedRole}.` });
    }

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken, role: user.role }); // Return actual role
  } catch (e) {
    logger.error(`Login error for email ${email}: ${e.stack || e}`);
    return res.status(500).json({ error: 'Unexpected error' });
  }
});

app.post('/auth/refresh', async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ error: 'Refresh token missing' });
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (e) {
      // Invalid or expired token - clear cookie and reject
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/auth/refresh',
      });
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Optionally, verify the user still exists in the DB
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/auth/refresh',
      });
      return res.status(401).json({ error: 'User not found' });
    }

    // Issue new access token
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_ACCESS_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );

    // Return new access token
    return res.json({ accessToken });
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error' });
  }
});
app.post('/auth/logout', (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/auth/refresh',
  });
  res.status(204).send();
});
app.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ id: user.id, email: user.email, role: user.role });
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error' });
  }
});
// Replace your existing GET /api/issues route
app.get('/api/issues', authMiddleware, async (req, res) => {
  try {
    let whereClause = {};
    
    // Citizens can only see their own issues, admins see all issues
    if (req.user.role === 'citizen') {
      whereClause = { userId: req.user.id };
    }
    // For admins, whereClause remains empty = see all issues
    
    const issues = await prisma.issue.findMany({
      where: whereClause,
      include: {
        user: {
          select: { email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    logger.info(`User ${req.user.id} (${req.user.role}) fetched ${issues.length} issues`);
    
    return res.json(issues);
  } catch (e) {
    logger.error(`Get issues error: ${e.stack || e}`);
    return res.status(500).json({ error: 'Failed to fetch issues' });
  }
});


app.post('/api/issues', authMiddleware, async (req, res) => {
  try {
    const parsed = IssueSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid issue data' });
    }
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    const issue = await prisma.issue.create({
      data: {
        ...parsed.data,
        userId: req.user.id,
        submittedBy: user?.email || 'Unknown User',
        coordinates: parsed.data.coordinates || null,
      },
    });
    return res.status(201).json(issue);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to create issue' });
  }
});


app.patch('/api/issues/:id', authMiddleware, async (req, res) => {
  try {
    const parsed = UpdateIssueSchema.safeParse(req.body);
    console.log('UpdateIssue PATCH request body:', req.body);
   console.log('Parsed update data:', parsed.data);

    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid update data' });
    }

    if (req.user.role !== 'admin' && parsed.data.status) {
      return res.status(403).json({ error: 'Admin access required for status updates' });
    }

    const issue = await prisma.issue.update({
      where: { id: req.params.id },
      data: parsed.data,
      include: {
        user: {
          select: { email: true }
        }
      }
    });

    return res.json(issue);
  } catch (e) {
    if (e.code === 'P2025') {
      return res.status(404).json({ error: 'Issue not found' });
    }
    logger.error(`Update issue error: ${e.stack || e}`);
    return res.status(500).json({ error: 'Failed to update issue' });
  }
});

app.get('/api/issues/:id', authMiddleware, async (req, res) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: { email: true }
        }
      }
    });

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    if (req.user.role === 'citizen' && issue.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    return res.json(issue);
  } catch (e) {
    logger.error(`Get issue error: ${e.stack || e}`);
    return res.status(500).json({ error: 'Failed to fetch issue' });
  }
});
// Start server

const PORT = process.env.PORT || 3443;

app.listen(PORT, () => console.log('API listening on http://localhost:'+PORT)); // start Express