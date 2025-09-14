package com.civicconnect.android.utils

object Constants {
    const val BASE_URL = "http://10.0.2.2:3443/"


    // Shared Preferences Keys
    const val PREF_NAME = "civic_connect_prefs"
    const val KEY_AUTH_TOKEN = "auth_token"
    const val KEY_USER_ROLE = "user_role"
    const val KEY_USER_EMAIL = "user_email"
    const val KEY_IS_LOGGED_IN = "is_logged_in"

    // Intent Keys
    const val EXTRA_ISSUE_ID = "issue_id"
    const val EXTRA_LATITUDE = "latitude"
    const val EXTRA_LONGITUDE = "longitude"

    // Request Codes
    const val REQUEST_LOCATION_PERMISSION = 1000
    const val REQUEST_CAMERA_PERMISSION = 1001
    const val REQUEST_STORAGE_PERMISSION = 1002
    const val REQUEST_IMAGE_CAPTURE = 1003
    const val REQUEST_IMAGE_PICK = 1004
    const val REQUEST_LOCATION_PICKER = 1005

    // File Provider Authority
    const val FILE_PROVIDER_AUTHORITY = "com.civicconnect.android.provider"

    // Network Settings
    const val NETWORK_TIMEOUT = 30L
    const val MAX_IMAGE_SIZE_MB = 5
    const val IMAGE_QUALITY = 80
}
