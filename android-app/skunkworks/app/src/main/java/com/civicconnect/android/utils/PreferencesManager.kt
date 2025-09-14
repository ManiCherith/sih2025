package com.civicconnect.android.utils

import android.content.Context
import android.content.SharedPreferences

class PreferencesManager(context: Context) {

    private val sharedPreferences: SharedPreferences = 
        context.getSharedPreferences(Constants.PREF_NAME, Context.MODE_PRIVATE)

    fun saveAuthToken(token: String) {
        sharedPreferences.edit()
            .putString(Constants.KEY_AUTH_TOKEN, token)
            .putBoolean(Constants.KEY_IS_LOGGED_IN, true)
            .apply()
    }

    fun getAuthToken(): String? {
        return sharedPreferences.getString(Constants.KEY_AUTH_TOKEN, null)
    }

    fun saveUserRole(role: String) {
        sharedPreferences.edit()
            .putString(Constants.KEY_USER_ROLE, role)
            .apply()
    }

    fun getUserRole(): String? {
        return sharedPreferences.getString(Constants.KEY_USER_ROLE, null)
    }

    fun saveUserEmail(email: String) {
        sharedPreferences.edit()
            .putString(Constants.KEY_USER_EMAIL, email)
            .apply()
    }

    fun getUserEmail(): String? {
        return sharedPreferences.getString(Constants.KEY_USER_EMAIL, null)
    }

    fun isLoggedIn(): Boolean {
        return sharedPreferences.getBoolean(Constants.KEY_IS_LOGGED_IN, false) &&
                getAuthToken() != null
    }

    fun clearUserData() {
        sharedPreferences.edit()
            .remove(Constants.KEY_AUTH_TOKEN)
            .remove(Constants.KEY_USER_ROLE)
            .remove(Constants.KEY_USER_EMAIL)
            .putBoolean(Constants.KEY_IS_LOGGED_IN, false)
            .apply()
    }
}
