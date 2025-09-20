console.log('app.js loaded');
const backendUrl = "http://localhost:3443";
class SkunkWorks{
translations = {
    en: {

        siteTitle: "SkunkWorksPrototype1",
        tagline: "Connecting Citizens & Government",
        backToHome: "Back to Home",

        heroTitle: "Report. Track. Resolve.",
        heroSubtitle: "Help improve your community by reporting civic issues and tracking their resolution.",
        citizenRole: "I'm a Citizen",
        citizenRoleDesc: "Report issues, track progress, and engage with your community",
        adminRole: "I'm an Administrator", 
        adminRoleDesc: "Manage issues and route to departments",
        login: "Login",
        signUp: "Sign Up",
        accessDashboard: "Access Dashboard",
        
        issuesReported: "Issues Reported",
        issuesResolved: "Issues Resolved", 
        avgResolutionTime: "Avg Resolution Time",
        citizenSatisfaction: "Citizen Satisfaction",

        reportIssue: "Report Issue",
        myReports: "My Reports",
        communityMap: "Community Map", 
        community: "Community",
        overview: "Overview",
        manageIssues: "Manage Issues",
        departments: "Departments",
        analytics: "Analytics",
        mapView: "Map View",

        issueCategory: "Issue Category",
        title: "Title",
        description: "Description",
        location: "Location",
        priorityLevel: "Priority Level",
        photo: "Photo (Optional)",
        useMyLocation: "Use My Location",
        submitReport: "Submit Report",

        potholes: "Potholes & Road Issues",
        streetlights: "Streetlights",
        garbage: "Garbage & Waste",
        drainage: "Drainage Issues", 
        traffic: "Traffic & Signals",
        vandalism: "Vandalism",
        noise: "Noise Complaints",
        parks: "Parks & Recreation",

        low: "Low - Can wait a few weeks",
        medium: "Medium - Should be addressed soon", 
        high: "High - Needs prompt attention",
        urgent: "Urgent - Safety hazard",
        
        submitted: "Submitted",
        assigned: "Assigned", 
        inProgress: "In Progress",
        resolved: "Resolved",
        
        category: "Category",
        priority: "Priority",
        status: "Status", 
        date: "Date",
        assignedTo: "Assigned To",
        upvotes: "Upvotes",
        noPhoto: "No Photo",
        unassigned: "Unassigned"
    },
    
    hi: {
        siteTitle: "स्कंकवर्क्सप्रोटोटाइप1",
        tagline: "नागरिकों और सरकार को जोड़ना",
        backToHome: "घर वापस",
        
        heroTitle: "रिपोर्ट करें। ट्रैक करें। हल करें।",
        heroSubtitle: "नागरिक मुद्दों की रिपोर्ट करके और उनके समाधान को ट्रैक करके अपने समुदाय को बेहतर बनाने में मदद करें।",
        citizenRole: "मैं एक नागरिक हूं",
        citizenRoleDesc: "मुद्दों की रिपोर्ट करें, प्रगति को ट्रैक करें, और अपने समुदाय के साथ जुड़ें",
        adminRole: "मैं एक प्रशासक हूं",
        adminRoleDesc: "मुद्दों का प्रबंधन करें और विभागों को भेजें",
        login: "लॉगिन",
        signUp: "साइन अप",
        accessDashboard: "डैशबोर्ड एक्सेस करें",
        
        issuesReported: "रिपोर्ट किए गए मुद्दे",
        issuesResolved: "हल किए गए मुद्दे",
        avgResolutionTime: "औसत समाधान समय", 
        citizenSatisfaction: "नागरिक संतुष्टि",

        reportIssue: "मुद्दा रिपोर्ट करें",
        myReports: "मेरी रिपोर्टें",
        communityMap: "समुदायिक मानचित्र",
        community: "समुदाय", 
        overview: "अवलोकन",
        manageIssues: "मुद्दों का प्रबंधन",
        departments: "विभाग",
        analytics: "विश्लेषण",
        mapView: "मानचित्र दृश्य",
        
        issueCategory: "मुद्दे की श्रेणी",
        title: "शीर्षक", 
        description: "विवरण",
        location: "स्थान",
        priorityLevel: "प्राथमिकता स्तर",
        photo: "फोटो (वैकल्पिक)",
        useMyLocation: "मेरा स्थान उपयोग करें",
        submitReport: "रिपोर्ट सबमिट करें",
        
        potholes: "गड्ढे और सड़क के मुद्दे",
        streetlights: "स्ट्रीटलाइट",
        garbage: "कचरा और अपशिष्ट",
        drainage: "जल निकासी के मुद्दे",
        traffic: "यातायात और सिग्नल", 
        vandalism: "बर्बरता",
        noise: "शोर की शिकायत",
        parks: "पार्क और मनोरंजन",
        
        low: "कम - कुछ सप्ताह प्रतीक्षा कर सकते हैं",
        medium: "मध्यम - जल्दी संबोधित किया जाना चाहिए",
        high: "उच्च - तत्काल ध्यान की आवश्यकता",
        urgent: "अत्यावश्यक - सुरक्षा खतरा",
        
        submitted: "सबमिट किया गया", 
        assigned: "असाइन किया गया",
        inProgress: "प्रगति में",
        resolved: "हल हो गया",
        
        category: "श्रेणी",
        priority: "प्राथमिकता",
        status: "स्थिति",
        date: "दिनांक", 
        assignedTo: "को सौंपा गया",
        upvotes: "अपवोट्स",
        noPhoto: "कोई फोटो नहीं",
        unassigned: "असाइन नहीं किया गया"
    }
};

    constructor() {
        this.currentRole = null;
        this.currentTab = null;
        this.issues = [];
        this.departments = [];
        this.analytics = {};
        this.userReports = [];
        this.currentLanguage = localStorage.getItem('civicconnect-language') || 'en';
        this.isTogglingLanguage = false;
        this.theme = 'light';
        this.accessToken = localStorage.getItem('civicconnect_token') || null;
        this.currentModalElements = null;
        this.statusChangeHandler = null;
        this.init();
            this.mapFilters = {
        category: '',
        status: '',
        priority: ''
    };
    this.heatmapEnabled = false;
    this.heatmapLayer = null;
    }
async init() {
  this.setupEventListeners();
  this.setupNavigation();
  this.setupTheme();
this.applyTranslations();


  const isAuthenticated = await this.checkAuthStatus();
  if (!isAuthenticated) {
    this.showLandingPage();
    return;
  }

  try {
    if (typeof this.loadDashboardOverview === 'function') {
      await this.loadDashboardOverview();
    } else {
      await Promise.all([
        this.loadIssuesFromAPI(),
        this.loadAnalytics()
      ]);
      this.updateOverviewStats();
      if (typeof this.renderAllCharts === 'function') await this.renderAllCharts();
    }
  } catch (err) {
    console.error('Dashboard init error (issues/analytics):', err);
    this.updateOverviewStats();
  }

  this.startRealTimeUpdates();

  document.getElementById('btnGenerateReport').addEventListener('click', async () => {
    try {
      if (typeof this.loadDashboardOverview === 'function') {
        await this.loadDashboardOverview();
      } else {
        await Promise.all([
          this.loadIssuesFromAPI(),
          this.loadAnalytics()
        ]);
        this.updateOverviewStats();
        if (typeof this.renderAllCharts === 'function') await this.renderAllCharts();
      }
    } catch (e) {
      console.error('Generate report failed:', e);
      this.updateOverviewStats();
    }
  });
}


async renderAllCharts() {
  await this.renderIssuesByCategoryChart();
  await this.renderIssuesByStatusChart();
  await this.renderIssuesByPriorityChart();
  await this.renderAverageResolutionTime();
  await this.renderIssuesOverTimeChart();
}

_renderIssueMarkers(map) {
const selectedCategory = (this.mapFilters.category || '').trim().toLowerCase();
const selectedStatus   = (this.mapFilters.status || '').trim().toLowerCase();
const selectedPriority = (this.mapFilters.priority || '').trim().toLowerCase();


    console.log('Rendering markers...');
    console.log('Issues to render:', this.issues.length);
    
    if (this._issueMarkersLayer) {
        this._issueMarkersLayer.clearLayers();
    } else {
        this._issueMarkersLayer = L.layerGroup().addTo(map);
    }
    if (this.heatmapLayer) {
        map.removeLayer(this.heatmapLayer);
        this.heatmapLayer = null;
    }

    let filteredIssues = this.issues;


 if (selectedCategory && selectedCategory !== 'all') {
  filteredIssues = filteredIssues.filter(issue =>
    (issue.category || '').trim().toLowerCase() === selectedCategory
  );
}

if (selectedStatus && selectedStatus !== 'all') {
  filteredIssues = filteredIssues.filter(issue =>
    (issue.status || '').trim().toLowerCase() === selectedStatus
  );
}

if (selectedPriority && selectedPriority !== 'all') {
  filteredIssues = filteredIssues.filter(issue =>
    (issue.priority || '').trim().toLowerCase() === selectedPriority
  );
}

    console.log('Filtered issues count:', filteredIssues.length);

    const markersArray = [];
    const heatmapData = [];

    filteredIssues.forEach(issue => {
        let coords = null;
        if (issue.coordinates && issue.coordinates.length === 2) {
            coords = issue.coordinates;
        } else if (issue.approxCoordinates && issue.approxCoordinates.length === 2) {
            coords = issue.approxCoordinates;
        }

        if (!coords) {
            console.log('No coordinates for issue:', issue.id);
            return;
        }

        const [lat, lng] = coords;
        console.log('Creating marker at:', lat, lng);
        
        const markerColor = this.getMarkerColorByStatus(issue.status);
        const markerIcon = this.createColoredMarkerIcon(markerColor);
        
        const marker = L.marker([lat, lng], { icon: markerIcon })
.bindPopup(`
  <div class="map-popup">
    <h4>${issue.title}</h4>
    <p><strong>Category:</strong> ${issue.category}</p>
    <p><strong>Location:</strong> ${issue.location}</p>
    <p><strong>Status:</strong> <span class="status status--${issue.status}">${this.formatStatus(issue.status)}</span></p>
    <p><strong>Priority:</strong> ${issue.priority}</p>
    <p><strong>Upvotes:</strong> ${Number.isFinite(issue.upvotes) ? issue.upvotes : 0}</p>  <!-- NEW -->
    <p>${issue.description}</p>
    ${this.getPopupImage(issue) || ''}
  </div>
`)
;

        this._issueMarkersLayer.addLayer(marker);
        markersArray.push(marker);

        
        const weight = this.getIssueWeight(issue);
        heatmapData.push([lat, lng, weight]);
    });

    console.log('Markers created:', markersArray.length);
    console.log('Heatmap data points:', heatmapData.length);

    if (this.heatmapEnabled && heatmapData.length > 0) {
        this.renderHeatmap(map, heatmapData);
    }

    if (markersArray.length > 0) {
        const group = L.featureGroup(markersArray);
        map.fitBounds(group.getBounds().pad(0.1));
    }

  
    this.updateFilteredIssueCount(filteredIssues.length);
}

getPopupImage(issue) {
    if (issue.status === 'resolved' && issue.resolutionPhotoPath) {
        return `
            <div style="text-align: center; margin-top: 8px;">
                <div style="background: #dcfce7; padding: 4px 8px; border-radius: 4px; margin-bottom: 8px;">
                    <span style="color: #16a34a; font-size: 12px; font-weight: bold;">✅ RESOLVED</span>
                </div>
                <img src="${this.getPhotoUrl(issue.resolutionPhotoPath)}" 
                     style="max-width: 100%; height: auto; max-height: 200px; border-radius: 4px; border: 2px solid #22c55e;" 
                     alt="Resolution photo" />
            </div>
        `;
    } else if (issue.photoPath) {
        return `
            <div style="text-align: center; margin-top: 8px;">
                <img src="${this.getPhotoUrl(issue.photoPath)}" 
                     style="max-width: 100%; height: auto; max-height: 200px; border-radius: 4px;" 
                     alt="Issue photo" />
            </div>
        `;
    }
    return '';
}


    getMarkerColorByStatus(status) {
        const colorMap = {
            'submitted': '#f57c00',     
            'assigned': '#00695c',     
            'in-progress': '#1976d2',    
            'resolved': '#2e7d32'       
        };
        return colorMap[status] || '#666666'; 
    }
createColoredMarkerIcon(color) {
    const svg = `
        <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
            <!-- Main pin shape -->
            <path d="M15 5 C22 5, 27 10, 27 17 C27 25, 15 35, 15 35 S3 25, 3 17 C3 10, 8 5, 15 5 Z" fill="${color}"/>
            <!-- Inner white circle -->
            <circle cx="15" cy="17" r="7" fill="white"/>
            <!-- Optional: Inner colored circle for better visibility -->
            <circle cx="15" cy="17" r="4" fill="${color}" opacity="0.3"/>
        </svg>
    `;

    return L.divIcon({
        className: 'simple-pin-marker',
        html: svg,
        iconSize: [30, 40],
        iconAnchor: [15, 35],
        popupAnchor: [0, -35]
    });
}



getIssueWeight(issue) {
    let weight = 1;
    
    const priorityWeights = {
        'low': 1,
        'medium': 2,
        'high': 3,
        'urgent': 4
    };
    weight *= priorityWeights[issue.priority] || 1;
    
    const statusWeights = {
        'submitted': 3,
        'assigned': 2,
        'in-progress': 1.5,
        'resolved': 0.5
    };
    weight *= statusWeights[issue.status] || 1;
    
    return weight;
}
renderHeatmap(map, heatmapData) {
    console.log('Rendering heatmap with data:', heatmapData);
    
    if (!window.L.heatLayer) {
        console.error('Leaflet.heat plugin not loaded. Make sure to include leaflet-heat.js');
        this.showNotification('Heatmap plugin not available', 'error');
        return;
    }

    try {
        this.heatmapLayer = L.heatLayer(heatmapData, {
            radius: 25,
            blur: 15,
            maxZoom: 17,
            max: 1.0,
            gradient: {
                0.0: '#313695',
                0.1: '#4575b4', 
                0.2: '#74add1',
                0.3: '#abd9e9',
                0.4: '#e0f3f8',
                0.5: '#ffffcc',
                0.6: '#fed976',
                0.7: '#fd8d3c',
                0.8: '#f03b20',
                1.0: '#bd0026'
            }
        }).addTo(map);
        
        console.log('Heatmap layer created successfully');
    } catch (error) {
        console.error('Error creating heatmap:', error);
        this.showNotification('Error creating heatmap', 'error');
    }
}

    loadSampleData() {
        this.issues = [
        {
            id: "test1",
            title: "Test Issue 1",
            location: "Location A",
            status: "submitted",       
            assignedTo: null,          
            category: "potholes",       
            priority: "medium",         
            description: "Test description for issue 1",
            submittedBy: "test@example.com",
            submittedDate: new Date().toISOString(),
            assignedDate: null,
            upvotes: 0,
            comments: 0,
            coordinates: [23.367, 85.317],
            photoPath: null,
            resolutionPhotoPath: null
        },
        {
            id: "test2",
            title: "Test Issue 2", 
            location: "Location B",
            status: "submitted",        // Changed from "resolved"
            assignedTo: null,           // Added explicitly
            category: "streetlights",   // Added category
            priority: "low",            // Added priority
            description: "Test description for issue 2",
            submittedBy: "test2@example.com",
            submittedDate: new Date().toISOString(),
            assignedDate: null,
            upvotes: 0,
            comments: 0,
            coordinates: [23.3247, 85.2425],
            photoPath: null,
            resolutionPhotoPath: null
        }
    ];
        this.generateAdditionalIssues();

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

        this.analytics = {
            totalIssues: 0,
            resolvedIssues: 0,
            avgResolutionTime: "",
            citizenSatisfaction: 0,
            monthlyTrends: [],
            categoryBreakdown: {}
        };

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
const languageToggleBtn = document.getElementById('languageToggle');
if (languageToggleBtn && !languageToggleBtn.hasListener) {
    languageToggleBtn.addEventListener('click', this.toggleLanguage.bind(this));
    languageToggleBtn.hasListener = true;
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
const logoutBtnCitizen = document.getElementById('logoutBtnCitizen');
const logoutBtnAdmin = document.getElementById('logoutBtnAdmin');

if (logoutBtnCitizen) {
  logoutBtnCitizen.addEventListener('click', () => this.logout());
}

if (logoutBtnAdmin) {
  logoutBtnAdmin.addEventListener('click', () => this.logout());
}


            if (e.target.classList.contains('tab-btn')) {
                this.switchTab(e.target.dataset.tab);
                return;
            }

            if (e.target.classList.contains('modal-close')) {
                this.closeModal();
                return;
            }

            if (e.target.closest('.report-item') || e.target.closest('.table-row')) {
                const issueElement = e.target.closest('.report-item, .table-row');
                const issueId = issueElement.dataset.issueId;
                if (issueId) {
                    this.showIssueModal(issueId);
                }
                return;
            }
        });
        

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

        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => this.filterUserReports(e.target.value));
        }

       const mapCategoryFilter = document.getElementById('mapCategoryFilter');
       if (mapCategoryFilter) {
       mapCategoryFilter.addEventListener('change', (e) => {
        this.filterMapByCategory(e.target.value);
       });
         }

const mapStatusFilter = document.getElementById('mapStatusFilter');
if (mapStatusFilter) {
    mapStatusFilter.addEventListener('change', (e) => {
        this.filterMapByStatus(e.target.value);
    });
}
const mapPriorityFilter = document.getElementById('mapPriorityFilter');
if (mapPriorityFilter) {
    mapPriorityFilter.addEventListener('change', (e) => {
        this.filterMapByPriority(e.target.value);
    });
}

const toggleHeatmap = document.getElementById('toggleHeatmap');
if (toggleHeatmap) {
    toggleHeatmap.addEventListener('click', () => {
        this.toggleHeatmap();
    });
}

const clearMapFilters = document.getElementById('clearMapFilters');
if (clearMapFilters) {
    clearMapFilters.addEventListener('click', () => {
        this.clearMapFilters();
    });
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
      const msg = errorData.message || errorData.error || 'Login failed. Please try again.';
      throw new Error(msg);
    }

    const data = await res.json();
    this.accessToken = data.accessToken;
    
    localStorage.setItem('civicconnect_token', this.accessToken);
    
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

    await this.loadIssuesFromAPI();

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
setupNavigation() {
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
calculateAnalytics() {
  if (!this.issues || this.issues.length === 0) {
    this.analytics = {
      totalIssues: 0,
      resolvedIssues: 0,
      avgResolutionTime: "N/A",
      averageResolution: { averageResolutionHours: 0 },
    };
    return;
  }

  this.analytics.totalIssues = this.issues.length;
  this.analytics.resolvedIssues = this.issues.filter(issue => issue.status === 'resolved').length;

  const resolvedWithTimes = this.issues.filter(issue => {
    const submitted = issue.submittedDate ? new Date(issue.submittedDate) : null;
    const resolvedTs = issue.resolvedAt || issue.closedAt || issue.updatedAt || null;
    const resolved = resolvedTs ? new Date(resolvedTs) : null;
    return submitted && resolved && resolved > submitted;
  });

  if (resolvedWithTimes.length > 0) {
    const totalMs = resolvedWithTimes.reduce((acc, issue) => {
      const submitted = new Date(issue.submittedDate);
      const resolvedTs = issue.resolvedAt || issue.closedAt || issue.updatedAt;
      const resolved = new Date(resolvedTs);
      return acc + (resolved - submitted);
    }, 0);

    const avgMs = totalMs / resolvedWithTimes.length;
    const avgHours = avgMs / (1000 * 60 * 60);

    this.analytics.avgResolutionTime = (avgHours / 24) >= 1 ? `${(avgHours/24).toFixed(1)} days` : `${avgHours.toFixed(1)} hours`;
    this.analytics.averageResolution = { averageResolutionHours: avgHours };
  } else {
    this.analytics.avgResolutionTime = "N/A";
    this.analytics.averageResolution = { averageResolutionHours: 0 };
  }

}

async checkAuthStatus() {
  if (!this.accessToken) return false;
  try {
    const response = await this.makeAuthenticatedRequest('http://localhost:3443/profile');
    if (response.ok) {
      const user = await response.json();
      this.currentRole = user.role;
      
      document.getElementById('landingPage')?.classList.add('hidden');
      
      const savedTab = localStorage.getItem('civicconnect_last_tab');
      const savedRole = localStorage.getItem('civicconnect_last_role');
      let initialTab = user.role === 'citizen' ? 'report' : 'overview';
      if (savedTab && savedRole === user.role) {
        initialTab = savedTab;
      }
      this.currentTab = initialTab;
      
      if (user.role === 'citizen') {
        document.getElementById('citizenInterface').classList.remove('hidden');
        document.getElementById('adminInterface').classList.add('hidden');
        this.loadCitizenTab(this.currentTab);
      } else if (user.role === 'admin') {
        document.getElementById('adminInterface').classList.remove('hidden');
        document.getElementById('citizenInterface').classList.add('hidden');
        this.loadAdminTab(this.currentTab);
      }
      
      document.getElementById('backToHome')?.classList.remove('hidden');
      document.body.classList.remove('modal-open');
      await this.loadIssuesFromAPI();
      return true;
    }
  } catch (error) {
    localStorage.removeItem('civicconnect_token');
    this.accessToken = null;
  }
  return false;
}


logout() {
  localStorage.removeItem('civicconnect_token');
  localStorage.removeItem('civicconnect_last_tab');
  localStorage.removeItem('civicconnect_last_role');
  this.accessToken = null;
  this.currentRole = null;
  this.currentTab = null;
  this.showLandingPage();
  window.history.replaceState({page: 'landing'}, 'CivicConnect', '/');
}


async refreshAccessToken() {
  try {
    const response = await fetch('http://localhost:3443/auth/refresh', {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      this.accessToken = data.accessToken;
      localStorage.setItem('civicconnect_token', this.accessToken);
      return true;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
  }
  
  localStorage.removeItem('civicconnect_token');
  this.accessToken = null;
  return false;
}

async makeAuthenticatedRequest(url, options = {}) {
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': `Bearer ${this.accessToken}`
  };
  options.credentials = 'include';

  let response = await fetch(url, options);
  
  if (response.status === 401) {
    const refreshed = await this.refreshAccessToken();
    if (refreshed) {
      options.headers['Authorization'] = `Bearer ${this.accessToken}`;
      response = await fetch(url, options);
    } else {
      this.showLandingPage();
      this.showNotification('Session expired. Please login again.', 'error');
    }
  }
  
  return response;
}
async authedFetch(url, options = {}) {
  const doFetch = async () =>
    fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${this.accessToken}`,
      },
      credentials: 'include',
    });

  let res = await doFetch();
  if (res.status === 401) {
    const refreshed = await this.refreshAccessToken?.();
    if (refreshed) {
      res = await doFetch();
    } else {
      this.showLandingPage?.();
      this.showNotification?.('Session expired. Please log in again.', 'error');
      throw new Error('Unauthorized');
    }
  }
  return res;
}


async loadIssuesFromAPI() {
  try {
    const response = await this.makeAuthenticatedRequest('http://localhost:3443/api/issues');

    if (response.ok) {
      const issues = await response.json();
  
this.issues = issues.map(issue => ({
  id: issue.id,
  title: issue.title,
  category: issue.category,
  description: issue.description,
  location: issue.location,
  priority: issue.priority,
  status: issue.status,
  submittedBy: issue.submittedBy,
  submittedDate: issue.createdAt,
  assignedTo: issue.assignedTo,
  assignedDate: issue.updatedAt,
  photoPath: issue.photoPath || null,
  resolutionPhotoPath: issue.resolutionPhotoPath || null,
  upvotes: issue.upvotes || 0,
  comments: issue.comments || 0,
  coordinates: issue.coordinates || [
    40.7128 + (Math.random() - 0.5) * 0.1,
    -74.0060 + (Math.random() - 0.5) * 0.1,
  ],
}));

      
      if (this.currentRole === 'citizen') {
        this.userReports = [...this.issues]; 
      }
      this.calculateAnalytics();
    }
  } catch (error) {
    console.error('Failed to load issues:', error);
    this.showNotification('Failed to load issues', 'error');
  }
}
getPhotoUrl(photoPath) {
  if (!photoPath) return null;
  const p = photoPath.replace(/\\/g, '/');        
  const normalized = p.startsWith('/') ? p : '/' + p; 
  return 'http://localhost:3443' + normalized;     
}

// --- ADD THESE HELPERS ---
ensureCanvasElement(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`Canvas "${id}" not found in DOM.`);
    return null;
  }
  // If parent or element has zero size, nudge a min-height so Chart.js can measure
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) {
    el.style.minHeight = el.style.minHeight || '260px';
    el.style.display = el.style.display || 'block';
  }
  return el;
}

safeCreateOrDestroyChart(key, canvasEl, config) {
  try {
    if (!canvasEl) return null;
    // destroy existing instance stored on `this._charts` keyed by name
    this._charts = this._charts || {};
    if (this._charts[key]) {
      try { this._charts[key].destroy(); } catch(e){ /* ignore */ }
      this._charts[key] = null;
    }
    // allow passing either canvas element or 2d context
    const ctx = (canvasEl.getContext ? canvasEl.getContext('2d') : canvasEl);
    this._charts[key] = new Chart(ctx, config);
    return this._charts[key];
  } catch (err) {
    console.error(`Failed to create chart ${key}:`, err);
    return null;
  }
}



updateAnalyticsUI() {
  const totalIssuesEl = document.getElementById('totalIssuesCount');
  if (totalIssuesEl) totalIssuesEl.textContent = this.analytics.totalIssues;

  const resolvedIssuesEl = document.getElementById('resolvedIssuesCount');
  if (resolvedIssuesEl) resolvedIssuesEl.textContent = this.analytics.resolvedIssues;

  const avgTimeEl = document.getElementById('avgResolutionTime');
  if (avgTimeEl) avgTimeEl.textContent = this.analytics.avgResolutionTime;

}
initializeCharts() {
  const ctx = document.getElementById('categoryChart').getContext('2d');
  this.categoryChart = new Chart(ctx, {
    type: 'bar',
    data: { labels: [], datasets: [{ label: 'Issues by Category', data: [], backgroundColor: [] }] },
    options: { /* chart options */ }
  });
}

updateCharts() {
  const categoryBreakdown = this.analytics.categoryBreakdown || {};
  const statusBreakdown = this.analytics.statusBreakdown || {};
  const priorityBreakdown = this.analytics.priorityBreakdown || {};
  const avgResolution = this.analytics.averageResolutionTime || 0;
  const issuesOverTime = this.analytics.issuesOverTime || [];

  const categoryLabels = Object.keys(categoryBreakdown);
  const categoryCounts = Object.values(categoryBreakdown);

  const ctxCategory = document.getElementById('issuesByCategoryChart').getContext('2d');
  if (this.categoryChart) this.categoryChart.destroy();
  this.categoryChart = new Chart(ctxCategory, {
    type: 'bar',
    data: {
      labels: categoryLabels,
      datasets: [{
        label: 'Issues by Category',
        data: categoryCounts,
        backgroundColor: 'rgba(33, 128, 141, 0.7)',
        borderColor: 'rgba(33, 128, 141, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      responsive: true,
      maintainAspectRatio: false
    }
  });

  const statusLabels = Object.keys(statusBreakdown);
  const statusCounts = Object.values(statusBreakdown);

  const ctxStatus = document.getElementById('issuesByStatusChart').getContext('2d');
  if (this.statusChart) this.statusChart.destroy();
  this.statusChart = new Chart(ctxStatus, {
    type: 'pie',
    data: {
      labels: statusLabels,
      datasets: [{
        data: statusCounts,
        backgroundColor: ['#f59e0b', '#06b6d4', '#3b82f6', '#10b981', '#6b7280']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  const priorityLabels = Object.keys(priorityBreakdown);
  const priorityCounts = Object.values(priorityBreakdown);

  const ctxPriority = document.getElementById('issuesByPriorityChart').getContext('2d');
  if (this.priorityChart) this.priorityChart.destroy();
  this.priorityChart = new Chart(ctxPriority, {
    type: 'bar',
    data: {
      labels: priorityLabels,
      datasets: [{
        label: 'Issues by Priority',
        data: priorityCounts,
        backgroundColor: 'rgba(234, 88, 12, 0.7)',
        borderColor: 'rgba(194, 65, 12, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      responsive: true,
      maintainAspectRatio: false
    }
  });

  const avgResolutionElement = document.getElementById('avgResolutionTime');
  avgResolutionElement.textContent =
    `Average resolution time: ${avgResolution.toFixed(2)} hours`;

  const timeLabels = issuesOverTime.map(item => item.year_month);
  const timeCounts = issuesOverTime.map(item => parseInt(item.count, 10));

  const ctxTime = document.getElementById('issuesOverTimeChart').getContext('2d');
  if (this.timeChart) this.timeChart.destroy();
  this.timeChart = new Chart(ctxTime, {
    type: 'line',
    data: {
      labels: timeLabels,
      datasets: [{
        label: 'Issues Reported',
        data: timeCounts,
        borderColor: 'rgba(37, 99, 235, 0.8)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
redrawAllCharts() {
  if (typeof Chart === 'undefined') return;
  document.querySelectorAll('canvas').forEach(c => {
    try {
      const inst = Chart.getChart(c) || (this._charts && Object.values(this._charts).find(ch => ch && ch.canvas && ch.canvas.id === c.id));
      if (inst) { inst.resize(); inst.update(); }
    } catch(e){ /* ignore */ }
  });
}

switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    this.currentTab = tabName;
if (tabName === 'analytics') {
  setTimeout(async () => {
    await this.loadAnalytics();

    const initIfReady = () => {
      const testCanvas = document.getElementById('issuesByCategoryChart') || document.getElementById('categoryChart');
      if (testCanvas && testCanvas.getBoundingClientRect().width > 0) {
        this.renderIssuesByCategoryChart();
        this.renderIssuesByStatusChart();
        this.renderIssuesByPriorityChart();
        this.renderIssuesOverTimeChart();
        this.renderAverageResolutionTime();
      } else {
        setTimeout(initIfReady, 150);
      }
    };
    initIfReady();
  }, 120);
}

    localStorage.setItem('civicconnect_last_tab', tabName);
  localStorage.setItem('civicconnect_last_role', this.currentRole);

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

   async loadAdminTab(tabName) {
        const tabElement = document.getElementById(`${tabName}Tab`);
        if (tabElement) {
            tabElement.classList.add('active');
        }

        switch (tabName) {
            case 'overview':
               await this.loadDashboardOverview();
                break;
            case 'manage':
               await this.loadIssueManagement();
                break;
            case 'departments':
               await this.loadDepartments();
                break;
            case 'analytics':
               await this.loadAnalytics();
                break;
            case 'admin-map':
              await  this.loadAdminMap();
                break;
        }
    }
async renderIssuesByCategoryChart() {
  const canvas = this.ensureCanvasElement('issuesByCategoryChart');
  if (!canvas) return;

  const data = this.analytics.byCategory || [];
  const labels = data.map(item => item.category || 'Unknown');
  const values = data.map(item => (item._count && item._count.category) ? item._count.category : (item.count || 0));

  return this.safeCreateOrDestroyChart('issuesByCategory', canvas, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      }]
    },
    options: { responsive: true, plugins: { legend: { position: 'top' } } }
  });
}

async renderIssuesByStatusChart() {
  const canvas = document.getElementById('issuesByStatusChart');
  if (!canvas) return;

  const data = this.analytics.byStatus || [];
  const labels = data.map(item => item.status);
  const values = data.map(item => item._count.status);

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Issues by Status',
        data: values,
        backgroundColor: '#36A2EB'
      }]
    },
    options: { responsive: true }
  });
}

async renderIssuesByPriorityChart() {
  const canvas = document.getElementById('issuesByPriorityChart');
  if (!canvas) return;

  const data = this.analytics.byPriority || [];
  const labels = data.map(item => item.priority);
  const values = data.map(item => item._count.priority);

  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ['#FFCE56', '#FF6384', '#4BC0C0']
      }]
    },
    options: { responsive: true }
  });
}

async renderIssuesOverTimeChart() {
  const canvas = document.getElementById('issuesOverTimeChart');
  if (!canvas) return;

  const data = this.analytics.overTime || [];
  const labels = data.map(item => item.year_month);
  const values = data.map(item => item.count);

  new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Issues Over Time',
        data: values,
        borderColor: '#4BC0C0',
        fill: false
      }]
    },
    options: { responsive: true }
  });
}

async renderAverageResolutionTime() {
  const element = document.getElementById('avgResolutionTime') || document.getElementById('averageResolutionTime') || document.querySelector('.average-resolution-time');
  if (!element) return;

  let avgHours = 0;
  if (this.analytics && this.analytics.averageResolution && typeof this.analytics.averageResolution.averageResolutionHours === 'number') {
    avgHours = this.analytics.averageResolution.averageResolutionHours;
  } else if (this.analytics && typeof this.analytics.avgResolutionTime === 'string') {
    const s = this.analytics.avgResolutionTime;
    const mDays = s.match(/([\d.]+)\s*days?/i);
    const mHours = s.match(/([\d.]+)\s*hours?/i);
    if (mDays) avgHours = parseFloat(mDays[1]) * 24;
    else if (mHours) avgHours = parseFloat(mHours[1]);
  }

  if (!isFinite(avgHours) || avgHours <= 0) {
    element.innerHTML = 'N/A';
    return;
  }

  if (avgHours >= 24) {
    element.innerHTML = `${(avgHours/24).toFixed(1)} days`;
  } else {
    element.innerHTML = `${Math.round(avgHours)} hours`;
  }
}


async handleIssueSubmission(e) {
  e.preventDefault();

  const titleEl = document.getElementById('issueTitle');
  const categoryEl = document.getElementById('issueCategory');
  const descriptionEl = document.getElementById('issueDescription');
  const locationEl = document.getElementById('issueLocation');
  const priorityEl = document.getElementById('issuePriority');
  const photoInput = document.getElementById('issuePhoto');

  if (!titleEl || !categoryEl || !descriptionEl || !locationEl || !priorityEl) {
    this.showNotification('Form elements not found', 'error');
    return;
  }

  let coordinates = null;
  let locValue = locationEl.value.trim();
  if (locValue.startsWith('"') && locValue.endsWith('"')) {
    locValue = locValue.slice(1, -1);
  }
  if (locValue.includes(',')) {
    const parts = locValue.split(',').map(s => parseFloat(s.trim()));
    if (parts.length === 2 && parts.every(n => !isNaN(n))) {
      coordinates = parts;
    }
  }

  const checkData = {
    category: categoryEl.value,
    title: titleEl.value,
    description: descriptionEl.value,
    coordinates,
  };

  try {
    const checkResp = await this.authedFetch(`${backendUrl}/api/issues/check-duplicates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkData),
    });

    if (checkResp.ok) {
      const { similarIssues } = await checkResp.json();
      if (Array.isArray(similarIssues) && similarIssues.length > 0) {
        this.showDuplicateModal(similarIssues, () => this.submitIssue());
        return;
      }
    } else {
      console.error('Duplicate check failed');
    }
  } catch (error) {
    console.error('Error checking duplicates:', error);
    // Proceed anyway if duplicate check fails
  }

  await this.submitIssue();
}

// Replace your submitIssue with this version
async submitIssue() {
  const titleEl = document.getElementById('issueTitle');
  const categoryEl = document.getElementById('issueCategory');
  const descriptionEl = document.getElementById('issueDescription');
  const locationEl = document.getElementById('issueLocation');
  const priorityEl = document.getElementById('issuePriority');
  const photoInput = document.getElementById('issuePhoto');

  let coordinates = null;
  let locValue = locationEl.value.trim();
  if (locValue.startsWith('"') && locValue.endsWith('"')) {
    locValue = locValue.slice(1, -1);
  }
  if (locValue.includes(',')) {
    const parts = locValue.split(',').map(s => parseFloat(s.trim()));
    if (parts.length === 2 && parts.every(n => !isNaN(n))) {
      coordinates = parts;
    }
  }

  const formData = new FormData();
  formData.append('title', titleEl.value);
  formData.append('category', categoryEl.value);
  formData.append('description', descriptionEl.value);
  formData.append('location', locValue);
  formData.append('priority', priorityEl.value);
  if (coordinates) formData.append('coordinates', JSON.stringify(coordinates));
  if (photoInput && photoInput.files.length > 0) formData.append('photo', photoInput.files);

  try {
    const response = await this.authedFetch(`${backendUrl}/api/issues`, {
      method: 'POST',
      body: formData, // do not set Content-Type; browser will set multipart/form-data boundary
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to submit');
    }

    const newIssue = await response.json();
    this.issues.unshift(newIssue);
    this.userReports.unshift(newIssue);
    this.showNotification('Issue reported successfully!', 'success');

    const form = document.getElementById('issueForm');
    if (form) form.reset();

    const photoPreview = document.getElementById('photoPreview');
    if (photoPreview) photoPreview.innerHTML = '';

    this.currentCoordinates = null;
    await this.loadIssuesFromAPI();
    if (this.currentRole === 'admin' && this.currentTab === 'admin-map') {
      this.loadAdminMap();
    }
  } catch (error) {
    this.showNotification(error.message, 'error');
  }
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
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toFixed(6);
      const lng = position.coords.longitude.toFixed(6);
      const locationInput = document.getElementById('issueLocation');
      if (locationInput) {
        locationInput.value = `${lat}, ${lng}`;  
      }
      this.showNotification(`Location detected: ${lat}, ${lng}`, 'info');  
    },
    (error) => {
      alert('Unable to retrieve your location. Please allow location access or type your location manually.');
      console.error('Geolocation error:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}
showDuplicateModal(similarIssues, proceedCallback) {
  const modal = document.createElement('div');
  modal.className = 'modal duplicate-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Similar Issues Found</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <p>We found ${similarIssues.length} similar issue(s) in your area. Would you like to upvote an existing issue instead?</p>
        <div class="similar-issues-list">
          ${similarIssues.map(issue => `
            <div class="similar-issue-item" data-issue-id="${issue.id}">
              <div class="issue-details">
                <h4>${issue.title}</h4>
                <p><strong>Location:</strong> ${issue.location}</p>
                <p><strong>Status:</strong> ${this.formatStatus(issue.status)}</p>
                <p><strong>Upvotes:</strong> ${issue.upvotes}</p>
                <p class="issue-description">${issue.description.substring(0, 100)}...</p>
              </div>
              <button class="btn btn--primary upvote-similar-btn" data-issue-id="${issue.id}">
                Upvote This Issue
              </button>
            </div>
          `).join('')}
        </div>
        <div class="modal-actions">
          <button class="btn btn--outline proceed-anyway-btn">Report New Issue Anyway</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  
  // Event listeners
  modal.querySelector('.modal-close').addEventListener('click', () => {
    this.closeDuplicateModal(modal);
  });
  
  modal.querySelector('.proceed-anyway-btn').addEventListener('click', () => {
    this.closeDuplicateModal(modal);
    proceedCallback();
  });
  
  modal.querySelectorAll('.upvote-similar-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const issueId = e.target.dataset.issueId;
      await this.upvoteIssue(issueId);
      this.closeDuplicateModal(modal);
      this.showNotification('Thank you for upvoting the existing issue!', 'success');
      // Clear and reset form
      document.getElementById('issueReportForm').reset();
    });
  });
}

closeDuplicateModal(modal) {
  modal.remove();
  document.body.classList.remove('modal-open');
}

async upvoteIssue(issueId) {
  try {
    const response = await this.makeAuthenticatedRequest(
      `${backendUrl}/api/issues/${issueId}/upvote`,
      { method: 'POST' }
    );
    
    if (response.ok) {
      await this.loadIssuesFromAPI(); // Refresh issues
      return true;
    } else {
      const error = await response.json();
      this.showNotification(error.error || 'Failed to upvote', 'error');
      return false;
    }
  } catch (error) {
    this.showNotification('Failed to upvote issue', 'error');
    return false;
  }
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
    setTimeout(() => {
        if (!this._adminMap) {
            this._adminMap = L.map('adminMapContainer').setView([23.35, 85.33], 12);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this._adminMap);
        }
        
        this._adminMap.invalidateSize();
        this._renderIssueMarkers(this._adminMap);
    }, 100);
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
        this.loadAnalytics();
        this.updateOverviewStats();
    }

async loadDashboardOverview() {
    await Promise.all([
        this.loadIssuesFromAPI(),
        this.loadAnalytics()
    ]);
    this.updateOverviewStats();
    setTimeout(() => this.loadDashboardCharts(), 100);
}


updateOverviewStats() {
    const totalIssuesEl = document.getElementById('totalIssuesMetric');
    const pendingIssuesEl = document.getElementById('pendingIssuesMetric');
    const avgResponseEl = document.getElementById('avgResponseMetric');
    const satisfactionEl = document.getElementById('satisfactionMetric');

    // Primary: sum counts from analytics.byCategory if present and valid
    let totalIssues = 0;
    if (this.analytics && Array.isArray(this.analytics.byCategory) && this.analytics.byCategory.length) {
        totalIssues = this.analytics.byCategory.reduce((sum, group) => {
            const count = (group && (group.count || group.total || (typeof group === 'number' ? group : 0))) || 0;
            return sum + (Number.isFinite(count) ? Number(count) : 0);
        }, 0);
    }

    // Fallback 1: analytics.totalIssues (set by calculateAnalytics)
    if ((!totalIssues || totalIssues === 0) && this.analytics && Number.isFinite(this.analytics.totalIssues)) {
        totalIssues = this.analytics.totalIssues;
    }

    // Fallback 2: direct count from loaded issues
    if ((!totalIssues || totalIssues === 0) && Array.isArray(this.issues)) {
        totalIssues = this.issues.length;
    }

    if (totalIssuesEl) {
        totalIssuesEl.textContent = totalIssues;
    }

    let pendingIssues = 0;
    if (this.analytics && Array.isArray(this.analytics.byStatus) && this.analytics.byStatus.length) {
        pendingIssues = this.analytics.byStatus.reduce((sum, group) => {
            const isResolved = (group && (group.status === 'resolved' || group._id === 'resolved')) || false;
            const count = (group && (group.count || group.total || (typeof group === 'number' ? group : 0))) || 0;
            return sum + (isResolved ? 0 : (Number.isFinite(count) ? Number(count) : 0));
        }, 0);
    } else if (Array.isArray(this.issues)) {
        pendingIssues = this.issues.filter(issue => (issue.status || '').toLowerCase() !== 'resolved').length;
    }

    if (pendingIssuesEl) {
        pendingIssuesEl.textContent = pendingIssues;
    }

    const avgHours =
        (this.analytics && (this.analytics.averageResolutionHours || (this.analytics.averageResolution && this.analytics.averageResolution.averageResolutionHours))) ||
        (this.analytics && this.analytics.avgResolutionTime) ||
        null;
    if (avgResponseEl) {
        avgResponseEl.textContent = avgHours ? `${Math.round(avgHours)} hours` : 'N/A';
    }

    if (satisfactionEl) {
        satisfactionEl.textContent = this.analytics && this.analytics.satisfactionScore ? `${this.analytics.satisfactionScore}%` : 'N/A';
    }
}



    loadDashboardCharts() {
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
    <div>Upvotes</div>    <!-- NEW -->
    <div>Photo</div>
  </div>
  ${filteredIssues.map(issue => {
    const photoUrl = this.getPhotoUrl(issue.photoPath);
    return `
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
        <div>${Number.isFinite(issue.upvotes) ? issue.upvotes : 0}</div> <!-- NEW -->
        <div>${photoUrl ? `<img src="${photoUrl}" alt="Issue Photo" style="max-width:100px; max-height:80px; border-radius:4px" />` : 'No Photo'}</div>
      </div>
    `;
  }).join('')}
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

async loadAnalytics() {
  try {
    const headers = { Authorization: `Bearer ${this.accessToken}` };

    const [byCategory, byStatus, byPriority, avgTime, overTime] = await Promise.all([
      fetch(`${backendUrl}/api/analytics/issues-by-category`, { headers }).then(res => res.json()),
      fetch(`${backendUrl}/api/analytics/issues-by-status`, { headers }).then(res => res.json()),
      fetch(`${backendUrl}/api/analytics/issues-by-priority`, { headers }).then(res => res.json()),
      fetch(`${backendUrl}/api/analytics/average-resolution-time`, { headers }).then(res => res.json()),
      fetch(`${backendUrl}/api/analytics/issues-over-time`, { headers }).then(res => res.json())
    ]);

    this.analytics = {
      byCategory,
      byStatus,
      byPriority,
      averageResolutionHours: avgTime.averageResolutionHours || null,
      overTime
    };
  } catch (e) {
    console.error('Failed to load analytics:', e);
    this.analytics = {};
  }
}


convertArrayToObject(arr, keyField, countField) {
  const obj = {};
  arr.forEach(item => {
    obj[item[keyField]] = item[countField][keyField] || 0;
  });
  return obj;
}



    loadDetailedCharts() {
  
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
  if (this.currentModalElements) this.closeModal();

  const issue = this.issues.find(i => i.id === issueId);
  if (!issue) {
    console.error('Issue not found:', issueId);
    return;
  }

  console.log('Current role:', this.currentRole);
  console.log('Issue found:', issue);

  const modal = document.getElementById('issueModal');
  const modalTitle = document.getElementById('modalIssueTitle');
  const modalInfo = document.getElementById('modalIssueInfo');
  const issuePhotoPreview = document.getElementById('issuePhotoPreview');
  const resolutionPhotoPreview = document.getElementById('resolutionPhotoPreview');
  const adminControls = document.getElementById('adminControls');
  const deptSelect = document.getElementById('departmentSelect');
  const statusSelect = document.getElementById('statusSelect');
  const recChip = document.getElementById('recommendedChip');
  const resolutionPhotoGroup = document.getElementById('resolutionPhotoGroup');
  const fileInput = document.getElementById('resolutionPhotoInput');

  if (!modal) {
    console.error('Modal element not found');
    return;
  }

  if (modalTitle) modalTitle.textContent = issue.title;

  if (modalInfo) {
    modalInfo.innerHTML = `
      <div class="issue-details-simple">
        <div class="detail-row"><span class="label">Category</span><span class="badge category ${issue.category}">${issue.category || 'NA'}</span></div>
        <div class="detail-row"><span class="label">Priority</span><span class="badge priority ${issue.priority?.toLowerCase()}">${issue.priority || 'NA'}</span></div>
        <div class="detail-row"><span class="label">Status</span><span class="badge status ${issue.status}">${this.formatStatus(issue.status)}</span></div>
        <div class="detail-row"><span class="label">Location</span><span class="value">${issue.location || 'NA'}</span></div>
        <div class="detail-row"><span class="label">Submitted</span><span class="value">${this.formatDate(issue.createdAt || issue.submittedDate)}</span></div>
        <div class="detail-row"><span class="label">Assigned To</span><span class="value">${issue.assignedTo || 'Not assigned'}</span></div>
        <div class="detail-row"><span class="label">Upvotes</span><span class="value">${Number.isFinite(issue.upvotes) ? issue.upvotes : 0}</span></div>
        <div class="detail-row description-row"><span class="label">Description</span><div class="description-box">${issue.description || 'NA'}</div></div>
      </div>
    `;
  }

  if (issuePhotoPreview) {
    issuePhotoPreview.innerHTML = issue.photoPath
      ? `<img src="${this.getPhotoUrl(issue.photoPath)}" alt="Issue photo" />`
      : '';
  }

  if (resolutionPhotoPreview) {
    if (issue.status === 'resolved' && issue.resolutionPhotoPath) {
      resolutionPhotoPreview.style.display = 'block';
      resolutionPhotoPreview.innerHTML = `<img src="${this.getPhotoUrl(issue.resolutionPhotoPath)}" alt="Resolution photo" />`;
    } else {
      resolutionPhotoPreview.style.display = 'none';
      resolutionPhotoPreview.innerHTML = '';
    }
  }

  if (this.currentRole === 'admin') {
    if (adminControls) adminControls.style.display = 'block';

    const recommended = this.getDepartmentForCategory(issue.category) || 'General Services';
    if (recChip) recChip.textContent = `Recommended: ${recommended}`;

    if (deptSelect) {
      if (!this.departments || this.departments.length === 0) {
        console.warn('No departments loaded, loading sample data');
        if (!this.departments || this.departments.length === 0) {
  console.warn('No departments loaded, loading sample departments');
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
}
      }
      const names = this.departments.map(d => d.name);
      const ordered = [recommended, ...names.filter(n => n !== recommended)];
      deptSelect.innerHTML = ordered.map(name => `<option value="${name}">${name}</option>`).join('');
      deptSelect.value = issue.assignedTo || recommended;
    }


    if (statusSelect) {
      statusSelect.value = issue.status || 'submitted';
    }

    this.currentModalElements = { statusSelect, resolutionPhotoGroup };

    if (statusSelect && !this.statusChangeHandler) {
      this.statusChangeHandler = this.togglePhotoInput.bind(this);
    }
    if (statusSelect) {
      statusSelect.addEventListener('change', this.statusChangeHandler);
      this.togglePhotoInput();
    }

    if (fileInput) fileInput.value = '';
    const saveAssignmentBtn = document.getElementById('saveAssignmentBtn');
    if (saveAssignmentBtn) {
      saveAssignmentBtn.onclick = async () => {
        const dept = deptSelect?.value;
        if (!dept) return;
        saveAssignmentBtn.disabled = true;
        saveAssignmentBtn.textContent = 'Saving...';
        try {
          const res = await this.makeAuthenticatedRequest(`${backendUrl}/api/issues/${issue.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ assignedTo: dept })
          });
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error || 'Failed to assign department');
          }
          this.showNotification(`Assigned to ${dept}`, 'success');
          await this.loadIssuesFromAPI();
        } catch (e) {
          this.showNotification(e.message || 'Assignment failed', 'error');
        } finally {
          saveAssignmentBtn.disabled = false;
          saveAssignmentBtn.textContent = 'Save Assignment';
        }
      };
    }

    const saveStatusBtn = document.getElementById('saveStatusBtn');
    if (saveStatusBtn) {
      saveStatusBtn.onclick = async () => {
        const newStatus = statusSelect?.value;
        const file = fileInput?.files?.[0];

        saveStatusBtn.disabled = true;
        saveStatusBtn.textContent = 'Updating...';

        try {
          let response;
          if (file || newStatus === 'resolved') {
            const fd = new FormData();
            if (newStatus) fd.append('status', newStatus);
            if (file) fd.append('resolutionPhoto', file);
            response = await fetch(`${backendUrl}/api/issues/${issue.id}`, {
              method: 'PATCH',
              headers: { Authorization: `Bearer ${this.accessToken}` },
              body: fd,
              credentials: 'include'
            });
          } else {
            response = await this.makeAuthenticatedRequest(`${backendUrl}/api/issues/${issue.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: newStatus })
            });
          }

          if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || 'Failed to update status');
          }

          this.showNotification('Status updated', 'success');
          await this.loadIssuesFromAPI();
          this.closeModal();
          this.showIssueModal(issueId);
        } catch (e) {
          this.showNotification(e.message || 'Update failed', 'error');
        } finally {
          saveStatusBtn.disabled = false;
          saveStatusBtn.textContent = 'Update Status';
        }
      };
    }
  } else {
    if (adminControls) adminControls.style.display = 'none';
  }

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

togglePhotoInput() {
  const els = this.currentModalElements;
  if (!els) return;

  const { resolutionPhotoGroup, statusSelect } = els;
  if (!resolutionPhotoGroup || !statusSelect) return;

  const shouldShow = statusSelect.value === 'resolved';
  resolutionPhotoGroup.style.display = shouldShow ? 'block' : 'none';
}

closeModal() {
  const modal = document.getElementById('issueModal');

  const els = this.currentModalElements;
  if (els?.statusSelect && this.statusChangeHandler) {
    els.statusSelect.removeEventListener('change', this.statusChangeHandler);
  }

  const saveAssignmentBtn = document.getElementById('saveAssignmentBtn');
  const saveStatusBtn = document.getElementById('saveStatusBtn');
  if (saveAssignmentBtn) saveAssignmentBtn.onclick = null;
  if (saveStatusBtn) saveStatusBtn.onclick = null;

  this.currentModalElements = null;

  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.querySelectorAll('.duplicate-modal').forEach(m => m.remove());
}

    filterUserReports(status) {
        this.loadUserReports(status);
    }
filterMapByCategory(category = '') {
    console.log('Filtering by category:', category);
    this.mapFilters.category = category;
    
    if (this._adminMap) {
        this._renderIssueMarkers(this._adminMap);
    }
    
    const filterText = category === 'all' || !category ? 'All Categories' : category;
    this.showNotification(`Filtered by category: ${filterText}`, 'info');
}

filterMapByPriority(priority = '') {
    this.mapFilters.priority = priority;
    
    if (this._adminMap) {
        this._renderIssueMarkers(this._adminMap);
    }
    
    const filterText = priority === 'all' || !priority ? 'All Priorities' : priority;
    this.showNotification(`Filtered by priority: ${filterText}`, 'info');
}
  filterMapByStatus(status = '') {
    this.mapFilters.status = status;
    
    if (this._adminMap) {
        this._renderIssueMarkers(this._adminMap);
    }
    
    const filterText = status === 'all' || !status ? 'All Statuses' : status;
    this.showNotification(`Filtered by status: ${filterText}`, 'info');
}
updateFilteredIssueCount(count) {
    const countEl = document.getElementById('filteredIssueCount');
    if (countEl) {
        countEl.textContent = `Showing ${count} issues`;
    }
}
clearMapFilters() {
    this.mapFilters = {
        category: '',
        status: '',
        priority: ''
    };
    
    const categoryFilter = document.getElementById('mapCategoryFilter');
    const statusFilter = document.getElementById('mapStatusFilter');
    const priorityFilter = document.getElementById('mapPriorityFilter');
    
    if (categoryFilter) categoryFilter.value = 'all';
    if (statusFilter) statusFilter.value = 'all';
    if (priorityFilter) priorityFilter.value = 'all';
    
    if (this._adminMap) {
        this._renderIssueMarkers(this._adminMap);
    }
    
    this.showNotification('All filters cleared', 'info');
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
    this.heatmapEnabled = !this.heatmapEnabled;
    
    const toggleBtn = document.getElementById('toggleHeatmap');
    if (toggleBtn) {
        toggleBtn.textContent = this.heatmapEnabled ? 'Hide Heatmap' : 'Show Heatmap';
        toggleBtn.classList.toggle('btn--primary', this.heatmapEnabled);
    }
    
    if (this._adminMap) {
        this._renderIssueMarkers(this._adminMap);
    }
    
    this.showNotification(
        this.heatmapEnabled ? 'Heatmap enabled' : 'Heatmap disabled', 
        'info'
    );
}
toggleLanguage() {
    if (this.isTogglingLanguage) return;
    this.isTogglingLanguage = true;

    this.currentLanguage = this.currentLanguage === 'en' ? 'hi' : 'en';
    localStorage.setItem('civicconnect-language', this.currentLanguage);

    const langBtn = document.getElementById('languageToggle');
    if (langBtn) {
        langBtn.textContent = this.currentLanguage.toUpperCase();
    }

    this.applyTranslations();

    this.showNotification(`Language switched to ${this.currentLanguage === 'en' ? 'English' : 'Hindi'}`, 'info');

    setTimeout(() => {
        this.isTogglingLanguage = false;
    }, 300);
}


applyTranslations() {
    const t = this.translations[this.currentLanguage]; 
    
    const siteTitle = document.querySelector('.logo h1');
    if (siteTitle) siteTitle.textContent = t.siteTitle;
    
    const tagline = document.querySelector('.tagline');
    if (tagline) tagline.textContent = t.tagline;
    
    const backToHome = document.getElementById('backToHome');
    if (backToHome) backToHome.textContent = t.backToHome;
    
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) heroTitle.textContent = t.heroTitle;
    
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
    
    const citizenRole = document.querySelector('.role-card h3');
    if (citizenRole) citizenRole.textContent = t.citizenRole;
    
    const citizenRoleDesc = document.querySelector('.role-card p');
    if (citizenRoleDesc) citizenRoleDesc.textContent = t.citizenRoleDesc;
    
    const adminRole = document.querySelector('#adminRole h3');
    if (adminRole) adminRole.textContent = t.adminRole;
    
    const adminRoleDesc = document.querySelector('#adminRole p');
    if (adminRoleDesc) adminRoleDesc.textContent = t.adminRoleDesc;
    
    const loginBtns = document.querySelectorAll('button');
    loginBtns.forEach(btn => {
        if (btn.textContent.includes('Login') || btn.textContent.includes('लॉगिन')) {
            btn.textContent = t.login;
        } else if (btn.textContent.includes('Sign Up') || btn.textContent.includes('साइन अप')) {
            btn.textContent = t.signUp;
        } else if (btn.textContent.includes('Access Dashboard') || btn.textContent.includes('डैशबोर्ड एक्सेस')) {
            btn.textContent = t.accessDashboard;
        }
    });
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        const tabName = btn.getAttribute('data-tab');
        switch(tabName) {
            case 'report':
                btn.textContent = t.reportIssue;
                break;
            case 'track':
                btn.textContent = t.myReports;
                break;
            case 'map':
                btn.textContent = t.communityMap;
                break;
            case 'engage':
                btn.textContent = t.community;
                break;
            case 'overview':
                btn.textContent = t.overview;
                break;
            case 'manage':
                btn.textContent = t.manageIssues;
                break;
            case 'departments':
                btn.textContent = t.departments;
                break;
            case 'analytics':
                btn.textContent = t.analytics;
                break;
            case 'admin-map':
                btn.textContent = t.mapView;
                break;
        }
    });
    
    const labels = document.querySelectorAll('.form-label');
    labels.forEach(label => {
        const labelFor = label.getAttribute('for');
        switch(labelFor) {
            case 'issueCategory':
                label.textContent = t.issueCategory;
                break;
            case 'issueTitle':
                label.textContent = t.title;
                break;
            case 'issueDescription':
                label.textContent = t.description;
                break;
            case 'issueLocation':
                label.textContent = t.location;
                break;
            case 'issuePriority':
                label.textContent = t.priorityLevel;
                break;
        }
    });
    const categorySelect = document.getElementById('issueCategory');
    if (categorySelect) {
        const options = categorySelect.querySelectorAll('option');
        options.forEach(option => {
            switch(option.value) {
                case 'potholes':
                    option.textContent = t.potholes;
                    break;
                case 'streetlights':
                    option.textContent = t.streetlights;
                    break;
                case 'garbage':
                    option.textContent = t.garbage;
                    break;
                case 'drainage':
                    option.textContent = t.drainage;
                    break;
                case 'traffic':
                    option.textContent = t.traffic;
                    break;
                case 'vandalism':
                    option.textContent = t.vandalism;
                    break;
                case 'noise':
                    option.textContent = t.noise;
                    break;
                case 'parks':
                    option.textContent = t.parks;
                    break;
            }
        });
    }
    
    const prioritySelect = document.getElementById('issuePriority');
    if (prioritySelect) {
        const options = prioritySelect.querySelectorAll('option');
        options.forEach(option => {
            switch(option.value) {
                case 'low':
                    option.textContent = t.low;
                    break;
                case 'medium':
                    option.textContent = t.medium;
                    break;
                case 'high':
                    option.textContent = t.high;
                    break;
                case 'urgent':
                    option.textContent = t.urgent;
                    break;
            }
        });
    }
    
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn && submitBtn.textContent.includes('Submit Report')) {
        submitBtn.textContent = t.submitReport;
    }
    
      const gpsBtn = document.getElementById('useGPSLocation');
    if (gpsBtn) gpsBtn.textContent = t.useMyLocation;
}



setupTheme() {
  const saved = localStorage.getItem('civicconnect:theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  this.setTheme(initial);
}

toggleTheme() {
  const newTheme = this.theme === 'light' ? 'dark' : 'light';
  this.setTheme(newTheme);
}

setTheme(theme) {
  this.theme = theme;
  document.documentElement.setAttribute('data-color-scheme', theme);
  localStorage.setItem('civicconnect:theme', theme); 

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.textContent = theme === 'light' ? 'Dark' : 'Light';
  }
}


startRealTimeUpdates() {
    console.log('Real-time updates disabled');
    return; 
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
    if (!dateString) return 'Not available';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not available';
    
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing CivicConnect app');
    window.civicApp = new SkunkWorks();
});
