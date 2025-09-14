# CivicConnect Android App

A comprehensive Android application for the CivicConnect platform that allows citizens to report civic issues, track their progress, and view them on an interactive map.

## 🚀 Quick Setup

### Prerequisites
1. **Android Studio** (Meerkat or newer)
2. **JDK 17** or newer
3. **Google Maps API Key**
4. **CivicConnect Backend** running on localhost:3443

### Installation Steps

1. **Extract & Open**
   ```bash
   # Extract the project
   unzip CivicConnect-Android.zip
   cd CivicConnect-Android

   # Open in Android Studio
   ```

2. **Configure Google Maps**
   ```bash
   # Rename the template file
   mv local.properties.template local.properties

   # Edit local.properties and add your API key:
   MAPS_API_KEY=AIzaSyAe41n-Ok0AMdaJJOz_QpLwterN3D0Q85c
   ```

3. **Sync & Run**
   - Android Studio will prompt to sync Gradle - click "Sync Now"
   - Connect device or start emulator
   - Click Run button

## 🛠️ Technical Details

### Compatible Versions
- **Android Gradle Plugin**: 8.11.1
- **Kotlin**: 2.1.20  
- **Gradle**: 8.13
- **Compile SDK**: 35 (Android 15)
- **Target SDK**: 34 (Android 14)
- **Min SDK**: 24 (Android 7.0)

### Features
- ✅ JWT Authentication (Login/Signup)
- ✅ Issue Reporting with Photos
- ✅ Google Maps Integration
- ✅ Issue Tracking & Status Updates
- ✅ Material Design 3 UI
- ✅ Offline Data Caching
- ✅ Real-time Updates

### Backend Integration
- Base URL: `http://localhost:3443`
- All citizen endpoints supported
- Multipart photo uploads
- JWT token management

## 🔧 Troubleshooting

### Common Issues

1. **Gradle Sync Fails**
   ```bash
   ./gradlew clean
   ./gradlew build
   ```

2. **Maps Not Loading**
   - Check Google Maps API key in `local.properties`
   - Enable Maps SDK in Google Cloud Console

3. **Backend Connection**
   - Ensure backend is running on port 3443
   - For device testing, use your computer's IP instead of localhost

### Project Structure
```
CivicConnect/
├── app/
│   ├── src/main/
│   │   ├── java/com/civicconnect/android/
│   │   │   ├── activities/          # UI Activities
│   │   │   ├── fragments/           # UI Fragments  
│   │   │   ├── models/              # Data Models
│   │   │   ├── network/             # API Layer
│   │   │   ├── viewmodels/          # MVVM ViewModels
│   │   │   └── utils/               # Utilities
│   │   ├── res/                     # Resources (layouts, colors, etc.)
│   │   └── AndroidManifest.xml      # App Configuration
│   └── build.gradle.kts             # App Dependencies
├── build.gradle.kts                 # Project Configuration
├── settings.gradle.kts              # Module Configuration
└── gradle.properties               # Gradle Settings
```

This project is production-ready and follows Android best practices with proper MVVM architecture, material design, and seamless backend integration.
