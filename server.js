const logger = require('./logger');
BigInt.prototype.toJSON = function () {
  return this.toString();  
};


'use strict';

require('dotenv').config(); 

const express = require('express'); 
const rateLimit = require('express-rate-limit'); 
const helmet = require('helmet'); 
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8080',      
  credentials: true,
  methods: ['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
      cb(null, uniqueName);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (/image\/(jpeg|png|jpg|webp)/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files are allowed!'));
  },
  limits: { fileSize: 4 * 1024 * 1024 }
});



const { PrismaClient, Prisma } = require('@prisma/client');
const z = require('zod'); const argon2 = require('argon2'); 

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient(); 

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'replace_with_strong_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'replace_with_strong_secret';
const ACCESS_TOKEN_EXPIRES_IN = '15m';   
const REFRESH_TOKEN_EXPIRES_IN = '7d';  

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.get('/health', (_req, res) => res.json({ ok: true })); 


const SignupSchema = z.object({
email: z.string().email().max(254),
password: z.string().min(12).max(200),
}); 
const IssueSchema = z.object({
  title: z.string().min(1).max(200),
  category: z.enum(['potholes','streetlights','garbage','drainage','traffic','vandalism','noise','parks']),
  description: z.string().min(1),
  location: z.string().min(1),
  priority: z.enum(['low','medium','high','urgent']),
  coordinates: z.array(z.number()).optional()
});


const UpdateIssueSchema = z.object({
  status: z.string().optional(),
  assignedTo: z.string().optional(),
  upvotes: z.number().optional()
});


app.post('/auth/signup', async (req, res) => {
try {
const parsed = SignupSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ error: 'Invalid request' }); 

const email = parsed.data.email.trim().toLowerCase(); 
const passwordHash = await argon2.hash(parsed.data.password); 
const user = await prisma.user.create({
data: { email, passwordHash, role: 'citizen' },
select: { id: true, email: true, role: true, createdAt: true },
}); 
return res.status(201).json(user); 
} catch (e) {
    if (
      (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') ||
      e.code === 'P2002'
    ) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    return res.status(500).json({ error: 'Unexpected error' });
  }
});
app.post('/auth/login', async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(12),
    role: z.string().optional() 
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });

  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;
  const requestedRole = parsed.data.role; 

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

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

    return res.json({ accessToken, role: user.role }); 
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
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/auth/refresh',
      });
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

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
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_ACCESS_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );

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
app.get('/api/issues', authMiddleware, async (req, res) => {
  try {
    let whereClause = {};
    
    if (req.user.role === 'citizen') {
      whereClause = { userId: req.user.id };
    }
    
const issues = await prisma.issue.findMany({
  where: whereClause,
  include: { user: { select: { email: true } } },
  orderBy: { createdAt: 'desc' }
});

    
    logger.info(`User ${req.user.id} (${req.user.role}) fetched ${issues.length} issues`);
    
    return res.json(issues);
  } catch (e) {
    logger.error(`Get issues error: ${e.stack || e}`);
    return res.status(500).json({ error: 'Failed to fetch issues' });
  }
});


app.post('/api/issues', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    let coordinates = undefined;
    if (req.body.coordinates) {
      try {
        coordinates = JSON.parse(req.body.coordinates);
      } catch {
        return res.status(400).json({ error: 'Coordinates must be a valid array of numbers' });
      }
      if (!Array.isArray(coordinates) || !coordinates.every(n => typeof n === 'number')) {
        return res.status(400).json({ error: 'Coordinates must be an array of numbers' });
      }
    }

 
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    const issueData = {
      title: req.body.title,
      category: req.body.category ? req.body.category.trim().toLowerCase() : 'uncategorized',
      description: req.body.description,
      location: req.body.location,
      priority: req.body.priority,
      coordinates: coordinates || null,
      userId: req.user.id,
      submittedBy: user?.email || 'Unknown User',  
      photoPath: req.file ? "/uploads/" + req.file.filename : null ,
      status: 'submitted'
    };

    const issue = await prisma.issue.create({ data: issueData });
    res.status(201).json(issue);
  } catch (e) {
    console.error('Failed to create issue:', e);
    res.status(500).json({ error: 'Failed to create issue', details: e.message });
  }
});
app.post('/api/issues/check-duplicates', authMiddleware, async (req, res) => {
  try {
    const { category, coordinates, title, description } = req.body;
    
    const PROXIMITY_RADIUS = 0.005; 
    
    let similarIssues = [];
    
    if (coordinates && coordinates.length === 2) {
      const [lat, lng] = coordinates;
      
      similarIssues = await prisma.issue.findMany({
        where: {
          category: category,
          status: { not: 'resolved' },
          coordinates: {
            not: null
          }
        },
        include: {
          user: { select: { email: true } }
        }
      });
      
      similarIssues = similarIssues.filter(issue => {
        if (!issue.coordinates || issue.coordinates.length !== 2) return false;
        
        const [issueLat, issueLng] = issue.coordinates;
        const distance = calculateDistance(lat, lng, issueLat, issueLng);
        return distance <= 0.5; 
      });
    }
    
    const textSimilar = await prisma.issue.findMany({
      where: {
        category: category,
        status: { not: 'resolved' },
        OR: [
          { title: { contains: title.substring(0, 20), mode: 'insensitive' } },
          { description: { contains: description.substring(0, 50), mode: 'insensitive' } }
        ]
      },
      include: {
        user: { select: { email: true } }
      }
    });
    
    const allSimilar = [...similarIssues, ...textSimilar].filter((issue, index, self) => 
      index === self.findIndex(i => i.id === issue.id)
    );
    
    return res.json({ similarIssues: allSimilar });
    
  } catch (e) {
    console.error('Duplicate check error:', e);
    return res.status(500).json({ error: 'Failed to check for duplicates' });
  }
});

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
           Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
app.post('/api/issues/:id/upvote', authMiddleware, async (req, res) => {
try {
    const issueId = BigInt(req.params.id);  
    const userId = req.user.id;
    
    const existing = await prisma.upvote.findUnique({
      where: {
        userId_issueId: { userId, issueId }  
      }
    });
    
    if (existing) {
      return res.status(400).json({ error: 'Already upvoted' });
    }
    
  await prisma.$transaction([
      prisma.upvote.create({
        data: { userId, issueId }  
      }),
      prisma.issue.update({
        where: { id: issueId }, 
        data: { upvotes: { increment: 1 } }
      })
    ]);
    
    const updatedIssue = await prisma.issue.findUnique({
      where: { id: issueId }
    });
    
    return res.json({ upvotes: updatedIssue.upvotes });
    
  } catch (e) {
    console.error('Upvote error:', e);
    return res.status(500).json({ error: 'Failed to upvote' });
  }
});




app.patch('/api/issues/:id', authMiddleware, upload.single('resolutionPhoto'), async (req, res) => {
    try {
        console.log('\n=== ISSUE UPDATE DEBUG ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('User ID:', req.user.id);
        console.log('User Role:', req.user.role);
        console.log('Issue ID:', req.params.id);
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
        console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
        console.log('Stack trace:');
        console.trace();
        console.log('==========================\n');

        const parsed = UpdateIssueSchema.safeParse(req.body);
        
        if (!parsed.success) {
            console.log('Validation failed:', parsed.error);
            return res.status(400).json({ error: 'Invalid update data' });
        }

        if (req.user.role !== 'admin' && parsed.data.status) {
            return res.status(403).json({ error: 'Admin access required for status updates' });
        }
        const id = BigInt(req.params.id);

        const updateData = { ...parsed.data };
        if (req.file) {
            updateData.resolutionPhotoPath = "/uploads/" + req.file.filename;
        }

        console.log('Final Update Data:', JSON.stringify(updateData, null, 2));

       const issue = await prisma.issue.update({
      where: { id },  
      data: updateData,
      include: { user: { select: { email: true } } }
    });

        console.log('Updated Issue Result:', JSON.stringify(issue, null, 2));
        return res.json(issue);
    } catch (e) {
        if (e.code === 'P2025') return res.status(404).json({ error: 'Issue not found' });
        logger.error('Update issue error', e.stack || e);
        return res.status(500).json({ error: 'Failed to update issue' });
    }
});
app.get('/api/analytics/issues-by-category', authMiddleware, async (req, res) => {
  try {
    const results = await prisma.issue.groupBy({
      by: ['category'],
      _count: { category: true },
    });
    return res.json(results);
  } catch (e) {
    console.error('Analytics error:', e);
    return res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});
app.get('/api/analytics/issues-by-status', authMiddleware, async (req, res) => {
  try {
    const results = await prisma.issue.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    return res.json(results);
  } catch (e) {
    console.error('Analytics error (by status):', e);
    return res.status(500).json({ error: 'Failed to fetch analytics by status' });
  }
});app.get('/api/analytics/issues-by-priority', authMiddleware, async (req, res) => {
  try {
    const results = await prisma.issue.groupBy({
      by: ['priority'],
      _count: { priority: true },
    });
    return res.json(results);
  } catch (e) {
    console.error('Analytics error (by priority):', e);
    return res.status(500).json({ error: 'Failed to fetch analytics by priority' });
  }
});
app.get('/api/analytics/average-resolution-time', authMiddleware, async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT AVG(EXTRACT(EPOCH FROM ("resolvedAt" - "createdAt")) / 3600) AS avg_resolution_hours
      FROM "Issue"
      WHERE "resolvedAt" IS NOT NULL;
    `;
    return res.json({ averageResolutionHours: result[0].avg_resolution_hours });
  } catch (e) {
    console.error('Analytics error (avg resolution time):', e);
    return res.status(500).json({ error: 'Failed to fetch average resolution time' });
  }
});
app.get('/api/analytics/issues-over-time', authMiddleware, async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        TO_CHAR("createdAt", 'YYYY-MM') AS year_month, 
        COUNT(*) AS count
      FROM "Issue"
      GROUP BY year_month
      ORDER BY year_month;
    `;
    const fixedResult = result.map(item => ({
      year_month: item.year_month,
      count: Number(item.count) 
    }));
    return res.json(fixedResult);
  } catch (e) {
    console.error('Analytics error (issues over time):', e);
    return res.status(500).json({ error: 'Failed to fetch issues over time' });
  }
});





app.get('/api/issues/:id', authMiddleware, async (req, res) => {
try {
    const id = BigInt(req.params.id); 
    const issue = await prisma.issue.findUnique({
      where: { id },  
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

app.listen(PORT, () => console.log('API listening on http://localhost:'+PORT)); 