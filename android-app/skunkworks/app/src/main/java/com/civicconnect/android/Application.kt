package com.civicconnect.android

import android.app.Application
import com.civicconnect.android.network.NetworkManager

class Application : Application() {
    override fun onCreate() {
        super.onCreate()
        NetworkManager.initialize(this)
    }
}
