package com.civicconnect.android.activities

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.civicconnect.android.R
import com.civicconnect.android.databinding.ActivityMainBinding
import com.civicconnect.android.fragments.IssueListFragment
import com.civicconnect.android.fragments.MapFragment
import com.civicconnect.android.fragments.ReportIssueFragment
import com.civicconnect.android.utils.PreferencesManager
import com.google.android.material.dialog.MaterialAlertDialogBuilder

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var preferencesManager: PreferencesManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        preferencesManager = PreferencesManager(this)

        // Check if user is logged in
        if (!preferencesManager.isLoggedIn()) {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
            return
        }

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupBottomNavigation()

        // Load initial fragment
        if (savedInstanceState == null) {
            loadFragment(IssueListFragment())
        }
    }

    private fun setupBottomNavigation() {
        binding.bottomNavigation.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_issues -> {
                    loadFragment(IssueListFragment())
                    true
                }
                R.id.nav_map -> {
                    loadFragment(MapFragment())
                    true
                }
                R.id.nav_report -> {
                    loadFragment(ReportIssueFragment())
                    true
                }
                R.id.nav_profile -> {
                    showProfileOptions()
                    true
                }
                else -> false
            }
        }
    }

    private fun loadFragment(fragment: Fragment) {
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
    }

    private fun showProfileOptions() {
        MaterialAlertDialogBuilder(this)
            .setTitle("Profile Options")
            .setItems(arrayOf("Logout")) { _, which ->
                when (which) {
                    0 -> logout()
                }
            }
            .show()
    }

    private fun logout() {
        preferencesManager.clearUserData()
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }
}
