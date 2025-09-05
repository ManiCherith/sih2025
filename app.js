// CivicConnect Application JavaScript
console.log('app.js loaded');

class CivicConnectApp {
    constructor() {
        this.currentRole = null;
        this.currentTab = null;
        this.issues = [];
        this.departments = [];
        this.analytics = {};
        this.userReports = [];
        this.currentLanguage = 'en';
        this.theme = 'light';
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.setupNavigationHistory();
        this.showLandingPage();
        this.setupTheme();
        this.startRealTimeUpdates();
    }
_renderIssueMarkers(map) {
    if (this._issueMarkersLayer) {
        this._issueMarkersLayer.clearLayers();
    } else {
        this._issueMarkersLayer = L.layerGroup().addTo(map);
    }

    this.issues.forEach(issue => {
        if (!issue.coordinates) return;
        const [lat, lng] = issue.coordinates;
        const marker = L.marker([lat, lng])
            .bindPopup(`<strong>${issue.title}</strong><br>${issue.location}<br>Status: ${this.formatStatus(issue.status)}`);
        this._issueMarkersLayer.addLayer(marker);
    });
}

    loadSampleData() {
        // Load sample issues
        this.issues = [];

        // Generate additional sample issues for better demonstration
        this.generateAdditionalIssues();

        // Load departments data
        this.departments = [
            {
                id: "public-works",
                name: "Public Works Department",
                categories: ["potholes", "roads", "infrastructure"],
                responseTime: "0",
                resolvedIssues: 0,
                pendingIssues: 0
            },
            {
                id: "sanitation",
                name: "Sanitation Department", 
                categories: ["garbage", "waste", "cleanliness"],
                responseTime: "0",
                resolvedIssues: 0,
                pendingIssues: 0
            },
            {
                id: "electrical",
                name: "Electrical Department",
                categories: ["streetlights", "power", "electrical"],
                responseTime: "",
                resolvedIssues: 0,
                pendingIssues: 0
            },
            {
                id: "traffic",
                name: "Traffic Management",
                categories: ["traffic", "signals", "transportation"],
                responseTime: "",
                resolvedIssues: 0,
                pendingIssues: 0
            }
        ];

        // Load analytics data
        this.analytics = {
            totalIssues: 0,
            resolvedIssues: 0,
            avgResolutionTime: "",
            citizenSatisfaction: 0,
            monthlyTrends: [],
            categoryBreakdown: {}
        };

        // Load user's reports (simulated)
        this.userReports = [];
    }

    generateAdditionalIssues() {}

    generateIssueTitle(category) {
        const titles = {
            potholes: ['Large pothole', 'Road damage', 'Cracked pavement', 'Street deterioration'],
            streetlights: ['Broken streetlight', 'Flickering light', 'Dark intersection', 'Faulty lamp'],
            garbage: ['Overflowing bin', 'Missed collection', 'Litter problem', 'Waste accumulation'],
            drainage: ['Blocked drain', 'Flooding issue', 'Clogged gutter', 'Water pooling'],
            traffic: ['Signal malfunction', 'Missing sign', 'Faded markings', 'Traffic congestion'],
            vandalism: ['Graffiti damage', 'Broken property', 'Vandalized sign', 'Property damage'],
            noise: ['Loud construction', 'Noise complaint', 'Excessive noise', 'Sound pollution'],
            parks: ['Broken equipment', 'Park maintenance', 'Unsafe conditions', 'Damaged facilities']
        };
        const categoryTitles = titles[category] || ['General issue'];
        return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
    }

    generateIssueDescription(category) {
        const descriptions = {
            potholes: 'Road surface damage requiring immediate attention to prevent vehicle damage.',
            streetlights: 'Street lighting issue affecting visibility and safety in the area.',
            garbage: 'Waste management issue requiring sanitation department attention.',
            drainage: 'Water drainage problem causing flooding or standing water issues.',
            traffic: 'Traffic management issue affecting flow and safety of vehicles.',
            vandalism: 'Property damage from vandalism requiring repair and cleanup.',
            noise: 'Excessive noise levels affecting quality of life in residential area.',
            parks: 'Park facility issue requiring maintenance or safety attention.'
        };
        return descriptions[category] || 'General civic issue requiring attention.';
    }

    generateRandomName() {
        const firstNames = ['Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'John', 'Maria', 'Robert', 'Jennifer'];
        const lastInitials = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastInitials[Math.floor(Math.random() * lastInitials.length)]}.`;
    }

    getDepartmentForCategory(category) {
        const mapping = {
            potholes: 'Public Works Department',
            streetlights: 'Electrical Department',
            garbage: 'Sanitation Department',
            drainage: 'Public Works Department',
            traffic: 'Traffic Management',
            vandalism: 'Public Works Department',
            noise: 'Environmental Department',
            parks: 'Parks & Recreation'
        };
        return mapping[category] || 'General Services';
    }

    setupEventListeners() {

        document.addEventListener('click', (e) => {
 if (e.target.id === 'citizenLoginBtn') {
    this.selectRole('citizen');
    return;
  }
  
  if (e.target.id === 'citizenSignupBtn') {
    this.showCitizenSignup();
    return;
  }
  
  const adminCard = e.target.closest('#adminRole');
  if (adminCard) {
    this.selectRole('admin');
    return;
  }

             const citizenLoginForm = document.getElementById('citizenLoginForm');
  if (citizenLoginForm && !citizenLoginForm.hasListener) {
    citizenLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitButton = citizenLoginForm.querySelector('button[type="submit"]');
           if (submitButton) {
      submitButton.disabled = true;               
      submitButton.textContent = 'Logging in...'; 
    }
      const email = document.getElementById('citizenEmail').value;
      const password = document.getElementById('citizenPassword').value;
      try {
        await this.login(email, password, 'citizen');
      } catch (err) {
      }finally {
      
      if (submitButton) {
        submitButton.disabled = false;             
        submitButton.textContent = 'Login';        
      }
    }
    });
    citizenLoginForm.hasListener = true;
  }

  const adminLoginForm = document.getElementById('adminLoginForm');
  if (adminLoginForm && !adminLoginForm.hasListener) {
    adminLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitButton = adminLoginForm.querySelector('button[type="submit"]');
         if (submitButton) {
      submitButton.disabled = true;               
      submitButton.textContent = 'Logging in...'; 
    }
      const email = document.getElementById('adminEmail').value;
      const password = document.getElementById('adminPassword').value;
      try {
        await this.login(email, password, 'admin');
      } catch (err) {
      }finally {
      
      if (submitButton) {
        submitButton.disabled = false;             
        submitButton.textContent = 'Login';        
      }
    }
    });
    adminLoginForm.hasListener = true;
  }

            // Tab navigation
            if (e.target.classList.contains('tab-btn')) {
                this.switchTab(e.target.dataset.tab);
                return;
            }

            // Modal close
            if (e.target.classList.contains('modal-close')) {
                this.closeModal();
                return;
            }

            // Issue interactions
            if (e.target.closest('.report-item') || e.target.closest('.table-row')) {
                const issueElement = e.target.closest('.report-item, .table-row');
                const issueId = issueElement.dataset.issueId;
                if (issueId) {
                    this.showIssueModal(issueId);
                }
                return;
            }

            // Upvote handling
            if (e.target.classList.contains('upvote-btn')) {
                e.stopPropagation();
                const issueId = e.target.dataset.issueId;
                this.toggleUpvote(issueId, e.target);
                return;
            }
        });

        // Navigation
        const backToHomeBtn = document.getElementById('backToHome');
        if (backToHomeBtn) {
            backToHomeBtn.addEventListener('click', () => this.showLandingPage());
        }

        const languageToggleBtn = document.getElementById('languageToggle');
        if (languageToggleBtn) {
            languageToggleBtn.addEventListener('click', () => this.toggleLanguage());
        }

        const themeToggleBtn = document.getElementById('themeToggle');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Issue reporting form
        const issueForm = document.getElementById('issueReportForm');
        if (issueForm) {
            issueForm.addEventListener('submit', (e) => this.handleIssueSubmission(e));
        }
        
        const photoUploadBtn = document.getElementById('photoUploadBtn');
        if (photoUploadBtn) {
            photoUploadBtn.addEventListener('click', () => {
                const photoInput = document.getElementById('issuePhoto');
                if (photoInput) {
                    photoInput.click();
                }
            });
        }

        const issuePhoto = document.getElementById('issuePhoto');
        if (issuePhoto) {
            issuePhoto.addEventListener('change', (e) => this.handlePhotoUpload(e));
        }

        const useGPSBtn = document.getElementById('useGPSLocation');
        if (useGPSBtn) {
            useGPSBtn.addEventListener('click', () => this.useGPSLocation());
        }

        // Filters
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => this.filterUserReports(e.target.value));
        }

        const mapCategoryFilter = document.getElementById('mapCategoryFilter');
        if (mapCategoryFilter) {
            mapCategoryFilter.addEventListener('change', (e) => this.filterMapIssues(e.target.value));
        }

        const searchIssues = document.getElementById('searchIssues');
        if (searchIssues) {
            searchIssues.addEventListener('input', (e) => this.searchIssues(e.target.value));
        }

        const categoryFilterAdmin = document.getElementById('categoryFilterAdmin');
        if (categoryFilterAdmin) {
            categoryFilterAdmin.addEventListener('change', (e) => this.filterAdminIssues());
        }

        const statusFilterAdmin = document.getElementById('statusFilterAdmin');
        if (statusFilterAdmin) {
            statusFilterAdmin.addEventListener('change', (e) => this.filterAdminIssues());
        }

        const exportData = document.getElementById('exportData');
        if (exportData) {
            exportData.addEventListener('click', () => this.exportData());
        }

        const toggleHeatmap = document.getElementById('toggleHeatmap');
        if (toggleHeatmap) {
            toggleHeatmap.addEventListener('click', () => this.toggleHeatmap());
        }
const citizenSignupForm = document.getElementById('citizenSignupForm');
if (citizenSignupForm && !citizenSignupForm.hasListener) {
  const form = citizenSignupForm.querySelector('form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Creating Account...';
      }
      
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('signupConfirmPassword').value;
      
      try {
        await this.handleSignup(email, password, confirmPassword);
      } catch (err) {
        console.error('Signup error:', err);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Sign Up';
        }
      }
    });
    citizenSignupForm.hasListener = true;
  }
}
const showLoginLink = document.getElementById('showCitizenLogin');
if (showLoginLink) {
  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('citizenSignupWrapper')?.classList.remove('active');
    this.selectRole('citizen');
  });
}

    }
selectRole(role) {
    if (!window.history.state || window.history.state.page !== 'landing') {
        window.history.pushState({page: 'landing'}, 'CivicConnect', '/');
    }
    
    this.currentRole = role;
    const landingPage = document.getElementById('landingPage');
    if (landingPage) landingPage.classList.add('hidden');

    const citizenForm = document.getElementById('citizenLoginForm');
    const adminForm = document.getElementById('adminLoginForm');
    const citizenWrap = citizenForm ? citizenForm.parentElement : null;
    const adminWrap = adminForm ? adminForm.parentElement : null;

    citizenForm?.classList.add('hidden');
    adminForm?.classList.add('hidden');
    citizenWrap?.classList.remove('active');
    adminWrap?.classList.remove('active');

    if (role === 'citizen') {
        citizenForm?.classList.remove('hidden');
        citizenWrap?.classList.add('active');
    } else if (role === 'admin') {
        adminForm?.classList.remove('hidden');
        adminWrap?.classList.add('active');
    }

    document.body.classList.add('modal-open');
}



showLandingPage() {
  this.currentRole = null;
  document.getElementById('landingPage')?.classList.remove('hidden');
  
  const citizenForm = document.getElementById('citizenLoginForm');
  const adminForm = document.getElementById('adminLoginForm');
  const signupWrapper = document.getElementById('citizenSignupWrapper');
  
  citizenForm?.classList.add('hidden');
  adminForm?.classList.add('hidden');
  signupWrapper?.classList.remove('active');
  
  citizenForm?.parentElement?.classList.remove('active');
  adminForm?.parentElement?.classList.remove('active');
  
  document.getElementById('citizenInterface')?.classList.add('hidden');
  document.getElementById('adminInterface')?.classList.add('hidden');
  document.getElementById('backToHome')?.classList.add('hidden');
  document.body.classList.remove('modal-open');
}


 async login(email, password, role) {
  try {
    const res = await fetch('http://localhost:3443/auth/login', {
        
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  
      body: JSON.stringify({ email, password, role }),
    });

    if (!res.ok) {
      
      const errorData = await res.json().catch(() => ({}));
      const msg = errorData.message || 'Login failed. Please try again.';
      throw new Error(msg);
    }

    const data = await res.json();
    this.accessToken = data.accessToken;  
    this.currentRole = role;

    const defaultTab = role === 'citizen' ? 'report' : 'overview';
window.history.pushState({
    page: 'dashboard', 
    role: role, 
    tab: defaultTab
}, 'Dashboard', window.location.href);

this.currentTab = defaultTab;

    
    document.getElementById('citizenLoginForm').classList.add('hidden');
    document.getElementById('adminLoginForm').classList.add('hidden');
document.getElementById('landingPage')?.classList.add('hidden');
    
    if (role === 'citizen') {
      document.getElementById('citizenInterface').classList.remove('hidden');
    } else if (role === 'admin') {
      document.getElementById('adminInterface').classList.remove('hidden');
    }
document.getElementById('citizenLoginForm')?.parentElement?.classList.remove('active');
document.getElementById('adminLoginForm')?.parentElement?.classList.remove('active');

document.body.classList.remove('modal-open');
    
    const backToHome = document.getElementById('backToHome');
    if (backToHome) backToHome.classList.remove('hidden');

    this.showNotification('Logged in successfully!', 'success');
  } catch (error) {
    this.showNotification(error.message, 'error');
    throw error;  
  }
}

showCitizenSignup() {
  this.currentRole = 'citizen';
  const landingPage = document.getElementById('landingPage');
  if (landingPage) landingPage.classList.add('hidden');
  
  document.getElementById('citizenLoginForm')?.classList.add('hidden');
  document.getElementById('adminLoginForm')?.classList.add('hidden');
  document.getElementById('citizenLoginForm')?.parentElement?.classList.remove('active');
  document.getElementById('adminLoginForm')?.parentElement?.classList.remove('active');
  
  const signupWrapper = document.getElementById('citizenSignupWrapper');
  if (signupWrapper) {
    signupWrapper.classList.add('active');
    document.body.classList.add('modal-open');
  }
}

showCitizenLogin() {
  this.selectRole('citizen');
}

async handleSignup(email, password, confirmPassword) {
  const errorElement = document.getElementById('signupError');
  
  errorElement.textContent = '';
  
  if (password !== confirmPassword) {
    errorElement.textContent = 'Passwords do not match';
    return;
  }
  
  if (password.length < 12) {
    errorElement.textContent = 'Password must be at least 12 characters long';
    return;
  }
  
  try {
    const res = await fetch('http://localhost:3443/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const msg = errorData.error || 'Signup failed. Please try again.';
      throw new Error(msg);
    }
    
    this.showNotification('Account created successfully! Please login.', 'success');
    
    document.getElementById('citizenSignupWrapper')?.classList.remove('active');
    window.history.pushState({page: 'landing'}, 'CivicConnect', '/');
    this.selectRole('citizen');
    
    const loginEmail = document.getElementById('citizenEmail');
    if (loginEmail) {
      loginEmail.value = email;
    }
    
  } catch (error) {
    errorElement.textContent = error.message;
  }
}
setupNavigationHistory() {
    window.addEventListener('popstate', (event) => {
        console.log('Navigation event:', event.state);
        
        if (event.state) {
            if (event.state.page === 'landing') {
                this.showLandingPage();
            } else if (event.state.page === 'login') {
                this.selectRole(event.state.role);
            } else if (event.state.page === 'dashboard' && event.state.tab) {
                this.switchTabWithoutHistory(event.state.tab);
            }
        } else {
            this.showLandingPage();
        }
    });
}
switchTabWithoutHistory(tabName) {
    console.log('Switching to tab without history:', tabName);
    this.currentTab = tabName;

    const uiScope = this.currentRole === 'citizen' ? 'citizenInterface' : 'adminInterface';
    const tabBtns = document.querySelectorAll(`#${uiScope} .tab-btn`);
    const tabContents = document.querySelectorAll(`#${uiScope} .tab-content`);

    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    const activeTabBtn = document.querySelector(`#${uiScope} [data-tab="${tabName}"]`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }

    if (this.currentRole === 'citizen') {
        this.loadCitizenTab(tabName);
    } else {
        this.loadAdminTab(tabName);
    }

    if (this.currentRole === 'citizen') {
        if (tabName === 'map') {
            this.loadCommunityMap();
        }
    } else {
        if (tabName === 'admin-map') {
            this.loadAdminMap();
        }
    }

    if (this._adminMap) {
        this._adminMap.invalidateSize();
    }
}



switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    this.currentTab = tabName;

    // Add tab navigation to browser history
    const currentState = window.history.state || {};
    window.history.pushState({
        ...currentState,
        page: 'dashboard',
        role: this.currentRole,
        tab: tabName
    }, `${tabName} - CivicConnect`, window.location.href);

    const uiScope = this.currentRole === 'citizen' ? 'citizenInterface' : 'adminInterface';
    const tabBtns = document.querySelectorAll(`#${uiScope} .tab-btn`);
    const tabContents = document.querySelectorAll(`#${uiScope} .tab-content`);

    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    const activeTabBtn = document.querySelector(`#${uiScope} [data-tab="${tabName}"]`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }

    if (this.currentRole === 'citizen') {
        this.loadCitizenTab(tabName);
    } else {
        this.loadAdminTab(tabName);
    }

    if (this.currentRole === 'citizen') {
        if (tabName === 'map') {
            this.loadCommunityMap();
        }
    } else {
        if (tabName === 'admin-map') {
            this.loadAdminMap();
        }
    }

    if (this._adminMap) {
        this._adminMap.invalidateSize();
    }
}

   


    loadCitizenTab(tabName) {
        const tabElement = document.getElementById(`${tabName}Tab`);
        if (tabElement) {
            tabElement.classList.add('active');
        }

        switch (tabName) {
            case 'report':
                // Report tab is already visible, just show notification
                this.showNotification('Ready to report a new issue', 'info');
                break;
            case 'track':
                this.loadUserReports();
                break;
            case 'map':
                this.loadCommunityMap();
                break;
            case 'engage':
                this.loadCommunityIssues();
                break;
        }
    }

    loadAdminTab(tabName) {
        const tabElement = document.getElementById(`${tabName}Tab`);
        if (tabElement) {
            tabElement.classList.add('active');
        }

        switch (tabName) {
            case 'overview':
                this.loadDashboardOverview();
                break;
            case 'manage':
                this.loadIssueManagement();
                break;
            case 'departments':
                this.loadDepartments();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
            case 'admin-map':
                this.loadAdminMap();
                break;
        }
    }

    handleIssueSubmission(e) {
        e.preventDefault();
        console.log('Handling issue submission');
        
        const titleEl = document.getElementById('issueTitle');
        const categoryEl = document.getElementById('issueCategory');
        const descriptionEl = document.getElementById('issueDescription');
        const locationEl = document.getElementById('issueLocation');
        const priorityEl = document.getElementById('issuePriority');
        
        if (!titleEl || !categoryEl || !descriptionEl || !locationEl || !priorityEl) {
            this.showNotification('Form elements not found', 'error');
            return;
        }
        
        const newIssue = {
            id: `CIV-2025-${String(this.issues.length + 1).padStart(3, '0')}`,
            title: titleEl.value,
            category: categoryEl.value,
            description: descriptionEl.value,
            location: locationEl.value,
            priority: priorityEl.value,
            status: 'submitted',
            submittedBy: 'Current User',
            submittedDate: new Date().toISOString(),
            upvotes: 0,
            comments: 0,
            coordinates: [40.7128 + (Math.random() - 0.5) * 0.1, -74.0060 + (Math.random() - 0.5) * 0.1]
        };

        this.issues.unshift(newIssue);
        this.userReports.unshift(newIssue);
        
        this.showNotification('Issue reported successfully!', 'success');
        e.target.reset();
        
        const photoPreview = document.getElementById('photoPreview');
        if (photoPreview) {
            photoPreview.classList.add('hidden');
        }
        
        // Simulate real-time processing
        setTimeout(() => {
            newIssue.status = 'assigned';
            newIssue.assignedTo = this.getDepartmentForCategory(newIssue.category);
            newIssue.assignedDate = new Date().toISOString();
            this.showNotification('Issue has been assigned to ' + newIssue.assignedTo, 'info');
        }, 3000);
    }

    handlePhotoUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('photoPreview');
                if (preview) {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; border-radius: 8px;">`;
                    preview.classList.remove('hidden');
                }
            };
            reader.readAsDataURL(file);
        }
    }

    useGPSLocation() {
        const locations = [
            'Current Location (GPS)',
            '123 Main Street',
            'Downtown Plaza',
            'Central Park Area',
            'City Hall District'
        ];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const locationInput = document.getElementById('issueLocation');
        if (locationInput) {
            locationInput.value = randomLocation;
        }
        this.showNotification('Location detected: ' + randomLocation, 'info');
    }

    loadUserReports(statusFilter = '') {
        const container = document.getElementById('myReportsList');
        if (!container) return;
        
        let reports = this.userReports;
        
        if (statusFilter) {
            reports = reports.filter(report => report.status === statusFilter);
        }
        
        if (reports.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <p>No reports found</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = reports.map(report => `
            <div class="report-item" data-issue-id="${report.id}">
                <div class="report-header">
                    <div>
                        <h4 class="report-title">${report.title}</h4>
                        <div class="report-id">${report.id}</div>
                    </div>
                    <div class="status status--${report.status}">
                        ${this.formatStatus(report.status)}
                    </div>
                </div>
                <div class="report-meta">
                    <span class="report-meta-item">📍 ${report.location}</span>
                    <span class="report-meta-item">📅 ${this.formatDate(report.submittedDate)}</span>
                    <span class="report-meta-item">⚡ ${report.priority} priority</span>
                </div>
                <p class="report-description">${report.description}</p>
                <div class="report-footer">
                    <div class="report-stats">
                        <span>👍 ${report.upvotes} upvotes</span>
                        <span>💬 ${report.comments} comments</span>
                    </div>
                    <div class="status status--${report.status}">
                        ${this.getStatusProgress(report.status)}
                    </div>
                </div>
            </div>
        `).join('');
    }
      loadAdminMap() {
        console.log('Admin map loading...')
  const mapContainer = document.getElementById('adminMap');
  if (!mapContainer || typeof L === 'undefined') return;

  if (!this._adminMap) {
    this._adminMap = L.map('adminMap').setView([23.35, 85.33], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this._adminMap);
  }

  this._renderIssueMarkers(this._adminMap);
}

    loadCommunityMap() {
  const mapContainer = document.getElementById('communityMap');
  if (!mapContainer || typeof L === 'undefined') return;

  if (!this._communityMap) {
    this._communityMap = L.map('communityMap').setView([23.35, 85.33], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this._communityMap);
  }

  this._renderIssueMarkers(this._communityMap);
}


    loadCommunityIssues() {
        const container = document.getElementById('communityIssues');
        if (!container) return;
        
        const publicIssues = this.issues.filter(issue => issue.submittedBy !== 'Current User');
        
        container.innerHTML = publicIssues.slice(0, 10).map(issue => `
            <div class="community-issue-item" data-issue-id="${issue.id}">
                <div class="report-header">
                    <div>
                        <h4 class="report-title">${issue.title}</h4>
                        <div class="report-meta">
                            <span class="report-meta-item">📍 ${issue.location}</span>
                            <span class="report-meta-item">📅 ${this.formatDate(issue.submittedDate)}</span>
                        </div>
                    </div>
                    <div class="status status--${issue.status}">
                        ${this.formatStatus(issue.status)}
                    </div>
                </div>
                <p class="report-description">${issue.description}</p>
                <div class="issue-engagement">
                    <button class="upvote-btn ${issue.userUpvoted ? 'voted' : ''}" data-issue-id="${issue.id}">
                        👍 ${issue.upvotes}
                    </button>
                    <span>💬 ${issue.comments} comments</span>
                </div>
            </div>
        `).join('');
    }

    loadAdminDashboard() {
        this.updateDashboardMetrics();
    }

    loadDashboardOverview() {
        this.updateDashboardMetrics();
        setTimeout(() => {
            this.loadDashboardCharts();
        }, 100);
    }

    updateDashboardMetrics() {
        const totalIssuesEl = document.getElementById('totalIssuesMetric');
        const pendingIssuesEl = document.getElementById('pendingIssuesMetric');
        const avgResponseEl = document.getElementById('avgResponseMetric');
        const satisfactionEl = document.getElementById('satisfactionMetric');

        if (totalIssuesEl) totalIssuesEl.textContent = this.analytics.totalIssues.toLocaleString();
        if (pendingIssuesEl) pendingIssuesEl.textContent = (this.analytics.totalIssues - this.analytics.resolvedIssues).toLocaleString();
        if (avgResponseEl) avgResponseEl.textContent = this.analytics.avgResolutionTime;
        if (satisfactionEl) satisfactionEl.textContent = this.analytics.citizenSatisfaction + '★';
    }

    loadDashboardCharts() {
        // Monthly trends chart
        const trendsCtx = document.getElementById('trendsChart');
        if (trendsCtx && typeof Chart !== 'undefined') {
            new Chart(trendsCtx, {
                type: 'line',
                data: {
                    labels: this.analytics.monthlyTrends.map(item => item.month),
                    datasets: [{
                        label: 'Submitted',
                        data: this.analytics.monthlyTrends.map(item => item.submitted),
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'Resolved',
                        data: this.analytics.monthlyTrends.map(item => item.resolved),
                        borderColor: '#5D878F',
                        backgroundColor: 'rgba(93, 135, 143, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Issue Trends'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Category breakdown chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx && typeof Chart !== 'undefined') {
            new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(this.analytics.categoryBreakdown),
                    datasets: [{
                        data: Object.values(this.analytics.categoryBreakdown),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Issues by Category'
                        }
                    }
                }
            });
        }
    }

    loadIssueManagement() {
        this.renderIssuesTable();
    }

    renderIssuesTable() {
        const container = document.getElementById('issuesTable');
        if (!container) return;
        
        const filteredIssues = this.getFilteredAdminIssues();
        
        container.innerHTML = `
            <div class="table-header">
                <div>Issue Details</div>
                <div>Category</div>
                <div>Priority</div>
                <div>Status</div>
                <div>Date</div>
                <div>Assigned To</div>
            </div>
            ${filteredIssues.map(issue => `
                <div class="table-row" data-issue-id="${issue.id}">
                    <div class="issue-summary">
                        <div class="issue-title-small">${issue.title}</div>
                        <div class="issue-description-small">${issue.description}</div>
                    </div>
                    <div><span class="category-badge ${issue.category}">${issue.category}</span></div>
                    <div><span class="priority-badge ${issue.priority}">${issue.priority}</span></div>
                    <div><span class="status status--${issue.status}">${this.formatStatus(issue.status)}</span></div>
                    <div>${this.formatDate(issue.submittedDate)}</div>
                    <div>${issue.assignedTo || 'Unassigned'}</div>
                </div>
            `).join('')}
        `;
    }

    getFilteredAdminIssues() {
        let filtered = [...this.issues];
        
        const categoryFilterEl = document.getElementById('categoryFilterAdmin');
        const statusFilterEl = document.getElementById('statusFilterAdmin');
        const searchEl = document.getElementById('searchIssues');
        
        const categoryFilter = categoryFilterEl ? categoryFilterEl.value : '';
        const statusFilter = statusFilterEl ? statusFilterEl.value : '';
        const searchTerm = searchEl ? searchEl.value.toLowerCase() : '';
        
        if (categoryFilter) {
            filtered = filtered.filter(issue => issue.category === categoryFilter);
        }
        
        if (statusFilter) {
            filtered = filtered.filter(issue => issue.status === statusFilter);
        }
        
        if (searchTerm) {
            filtered = filtered.filter(issue => 
                issue.title.toLowerCase().includes(searchTerm) ||
                issue.description.toLowerCase().includes(searchTerm) ||
                issue.location.toLowerCase().includes(searchTerm)
            );
        }
        
        return filtered;
    }

    filterAdminIssues() {
        this.renderIssuesTable();
    }

    searchIssues(searchTerm) {
        this.renderIssuesTable();
    }

    loadDepartments() {
        const container = document.getElementById('departmentsList');
        if (!container) return;
        
        container.innerHTML = this.departments.map(dept => `
            <div class="department-card">
                <div class="department-header">
                    <h3 class="department-name">${dept.name}</h3>
                </div>
                <div class="department-stats">
                    <div class="department-stat">
                        <span class="department-stat-value">${dept.resolvedIssues}</span>
                        <span class="department-stat-label">Resolved</span>
                    </div>
                    <div class="department-stat">
                        <span class="department-stat-value">${dept.pendingIssues}</span>
                        <span class="department-stat-label">Pending</span>
                    </div>
                </div>
                <div class="department-meta">
                    <p><strong>Avg Response:</strong> ${dept.responseTime}</p>
                    <div class="department-categories">
                        ${dept.categories.map(cat => `<span class="department-category">${cat}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadAnalytics() {
        setTimeout(() => {
            this.loadDetailedCharts();
        }, 100);
    }

    loadDetailedCharts() {
        // Detailed trends chart
        const detailedTrendsCtx = document.getElementById('detailedTrendsChart');
        if (detailedTrendsCtx && typeof Chart !== 'undefined') {
            new Chart(detailedTrendsCtx, {
                type: 'bar',
                data: {
                    labels: this.analytics.monthlyTrends.map(item => item.month),
                    datasets: [{
                        label: 'Issues Submitted',
                        data: this.analytics.monthlyTrends.map(item => item.submitted),
                        backgroundColor: '#1FB8CD'
                    }, {
                        label: 'Issues Resolved',
                        data: this.analytics.monthlyTrends.map(item => item.resolved),
                        backgroundColor: '#5D878F'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Detailed Monthly Performance'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Department performance chart
        const deptPerformanceCtx = document.getElementById('departmentPerformanceChart');
        if (deptPerformanceCtx && typeof Chart !== 'undefined') {
            new Chart(deptPerformanceCtx, {
                type: 'radar',
                data: {
                    labels: this.departments.map(dept => dept.name.split(' ')[0]),
                    datasets: [{
                        label: 'Performance Score',
                        data: this.departments.map(() => Math.floor(Math.random() * 40) + 60),
                        backgroundColor: 'rgba(31, 184, 205, 0.2)',
                        borderColor: '#1FB8CD',
                        pointBackgroundColor: '#1FB8CD'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Department Performance Comparison'
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    }



    showIssueModal(issueId) {
        const issue = this.issues.find(i => i.id === issueId);
        if (!issue) return;
        
        const modal = document.getElementById('issueModal');
        const modalBody = document.getElementById('modalBody');
        
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="issue-details">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div><strong>ID:</strong> ${issue.id}</div>
                        <div><strong>Category:</strong> <span class="category-badge ${issue.category}">${issue.category}</span></div>
                        <div><strong>Priority:</strong> <span class="priority-badge ${issue.priority}">${issue.priority}</span></div>
                        <div><strong>Status:</strong> <span class="status status--${issue.status}">${this.formatStatus(issue.status)}</span></div>
                        <div><strong>Location:</strong> ${issue.location}</div>
                        <div><strong>Submitted:</strong> ${this.formatDate(issue.submittedDate)}</div>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong>Description:</strong>
                        <p style="margin-top: 8px;">${issue.description}</p>
                    </div>
                    ${issue.assignedTo ? `<div><strong>Assigned to:</strong> ${issue.assignedTo}</div>` : ''}
                    ${issue.estimatedCompletion ? `<div><strong>Est. Completion:</strong> ${this.formatDate(issue.estimatedCompletion)}</div>` : ''}
                    <div style="margin-top: 16px;">
                        <strong>Community Engagement:</strong>
                        <div style="display: flex; gap: 16px; margin-top: 8px;">
                            <span>👍 ${issue.upvotes} upvotes</span>
                            <span>💬 ${issue.comments} comments</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeModal() {
        const modal = document.getElementById('issueModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    toggleUpvote(issueId, buttonElement) {
        const issue = this.issues.find(i => i.id === issueId);
        if (!issue) return;
        
        const wasVoted = buttonElement.classList.contains('voted');
        
        if (wasVoted) {
            issue.upvotes--;
            buttonElement.classList.remove('voted');
        } else {
            issue.upvotes++;
            buttonElement.classList.add('voted');
        }
        
        buttonElement.innerHTML = `👍 ${issue.upvotes}`;
        this.showNotification(wasVoted ? 'Vote removed' : 'Thanks for your vote!', 'info');
    }

    filterUserReports(status) {
        this.loadUserReports(status);
    }

    filterMapIssues(category) {
        this.showNotification(`Map filtered to show ${category || 'all'} issues`, 'info');
    }

    exportData() {
        const data = {
            issues: this.issues.length,
            departments: this.departments.length,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'civic-issues-export.json';
        a.click();
        
        this.showNotification('Data exported successfully', 'success');
    }

    toggleHeatmap() {
        this.showNotification('Heat map view toggled', 'info');
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
        const langBtn = document.getElementById('languageToggle');
        if (langBtn) {
            langBtn.textContent = `🌐 ${this.currentLanguage.toUpperCase()}`;
        }
        this.showNotification(`Language switched to ${this.currentLanguage === 'en' ? 'English' : 'Spanish'}`, 'info');
    }

    setupTheme() {
        // Don't use localStorage due to sandbox restrictions
        this.setTheme('light');
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-color-scheme', theme);
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    startRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance of update
                const randomIssue = this.issues[Math.floor(Math.random() * this.issues.length)];
                const oldStatus = randomIssue.status;
                
                // Progress status
                if (randomIssue.status === 'submitted') {
                    randomIssue.status = 'assigned';
                    randomIssue.assignedTo = this.getDepartmentForCategory(randomIssue.category);
                    randomIssue.assignedDate = new Date().toISOString();
                } else if (randomIssue.status === 'assigned') {
                    randomIssue.status = 'in-progress';
                } else if (randomIssue.status === 'in-progress' && Math.random() < 0.5) {
                    randomIssue.status = 'resolved';
                    randomIssue.resolvedDate = new Date().toISOString();
                }
                
                if (randomIssue.status !== oldStatus) {
                    this.showNotification(`Issue ${randomIssue.id} status updated to ${this.formatStatus(randomIssue.status)}`, 'info');
                    
                    // Refresh current view if needed
                    if (this.currentTab === 'track' && this.currentRole === 'citizen') {
                        this.loadUserReports();
                    } else if (this.currentTab === 'manage' && this.currentRole === 'admin') {
                        this.renderIssuesTable();
                    }
                }
            }
        }, 30000);
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    formatStatus(status) {
        const statusMap = {
            'submitted': 'Submitted',
            'assigned': 'Assigned',
            'in-progress': 'In Progress',
            'resolved': 'Resolved'
        };
        return statusMap[status] || status;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    getStatusProgress(status) {
        const progressMap = {
            'submitted': '1/4',
            'assigned': '2/4',
            'in-progress': '3/4',
            'resolved': '4/4'
        };
        return progressMap[status] || '1/4';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing CivicConnect app');
    window.civicApp = new CivicConnectApp();
});
