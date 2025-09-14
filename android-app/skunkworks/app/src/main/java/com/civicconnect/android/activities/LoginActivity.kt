package com.civicconnect.android.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.civicconnect.android.databinding.ActivityLoginBinding
import com.civicconnect.android.models.LoginRequest
import com.civicconnect.android.models.SignupRequest
import com.civicconnect.android.utils.PreferencesManager
import com.civicconnect.android.viewmodels.AuthViewModel
import com.google.android.material.tabs.TabLayout

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var authViewModel: AuthViewModel
    private lateinit var preferencesManager: PreferencesManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        preferencesManager = PreferencesManager(this)
        authViewModel = ViewModelProvider(this)[AuthViewModel::class.java]

        setupViews()
        setupObservers()

        if (preferencesManager.isLoggedIn()) {
            navigateToMain()
        }
    }

    private fun setupViews() {
        binding.tabLayout.addTab(binding.tabLayout.newTab().setText("Login"))
        binding.tabLayout.addTab(binding.tabLayout.newTab().setText("Sign Up"))

        binding.tabLayout.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab?) {
                when (tab?.position) {
                    0 -> showLoginForm()
                    1 -> showSignupForm()
                }
            }
            override fun onTabUnselected(tab: TabLayout.Tab?) {}
            override fun onTabReselected(tab: TabLayout.Tab?) {}
        })

        binding.btnLogin.setOnClickListener { performLogin() }
        binding.btnSignup.setOnClickListener { performSignup() }

        showLoginForm()
    }

    private fun setupObservers() {
        authViewModel.authResult.observe(this) { result ->
            result.fold(
                onSuccess = { response ->
                    hideLoading()
                    preferencesManager.saveAuthToken(response.accessToken)
                    preferencesManager.saveUserRole(response.role)
                    navigateToMain()
                },
                onFailure = { error ->
                    hideLoading()
                    Toast.makeText(this, error.message ?: "Authentication failed", Toast.LENGTH_LONG).show()
                }
            )
        }

        authViewModel.isLoading.observe(this) { isLoading ->
            if (isLoading) showLoading() else hideLoading()
        }
    }

    private fun showLoginForm() {
        binding.loginForm.visibility = View.VISIBLE
        binding.signupForm.visibility = View.GONE
        binding.btnLogin.visibility = View.VISIBLE
        binding.btnSignup.visibility = View.GONE
    }

    private fun showSignupForm() {
        binding.loginForm.visibility = View.GONE
        binding.signupForm.visibility = View.VISIBLE
        binding.btnLogin.visibility = View.GONE
        binding.btnSignup.visibility = View.VISIBLE
    }

    private fun performLogin() {
        val email = binding.etLoginEmail.text.toString().trim()
        val password = binding.etLoginPassword.text.toString().trim()

        if (validateLoginInput(email, password)) {
            val loginRequest = LoginRequest(email, password, "citizen")
            authViewModel.login(loginRequest)
        }
    }

    private fun performSignup() {
        val email = binding.etSignupEmail.text.toString().trim()
        val password = binding.etSignupPassword.text.toString().trim()
        val confirmPassword = binding.etSignupConfirmPassword.text.toString().trim()

        if (validateSignupInput(email, password, confirmPassword)) {
            val signupRequest = SignupRequest(email, password)
            authViewModel.signup(signupRequest)
        }
    }

    private fun validateLoginInput(email: String, password: String): Boolean {
        return when {
            email.isEmpty() -> {
                binding.etLoginEmail.error = "Email is required"
                false
            }
            !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches() -> {
                binding.etLoginEmail.error = "Please enter a valid email"
                false
            }
            password.isEmpty() -> {
                binding.etLoginPassword.error = "Password is required"
                false
            }
            password.length < 12 -> {
                binding.etLoginPassword.error = "Password must be at least 12 characters"
                false
            }
            else -> true
        }
    }

    private fun validateSignupInput(email: String, password: String, confirmPassword: String): Boolean {
        return when {
            email.isEmpty() -> {
                binding.etSignupEmail.error = "Email is required"
                false
            }
            !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches() -> {
                binding.etSignupEmail.error = "Please enter a valid email"
                false
            }
            email.length > 254 -> {
                binding.etSignupEmail.error = "Email too long (max 254 characters)"
                false
            }
            password.isEmpty() -> {
                binding.etSignupPassword.error = "Password is required"
                false
            }
            password.length < 12 -> {
                binding.etSignupPassword.error = "Password must be at least 12 characters"
                false
            }
            password.length > 200 -> {
                binding.etSignupPassword.error = "Password too long (max 200 characters)"
                false
            }
            password != confirmPassword -> {
                binding.etSignupConfirmPassword.error = "Passwords do not match"
                false
            }
            else -> true
        }
    }

    private fun showLoading() {
        binding.progressBar.visibility = View.VISIBLE
        binding.btnLogin.isEnabled = false
        binding.btnSignup.isEnabled = false
    }

    private fun hideLoading() {
        binding.progressBar.visibility = View.GONE
        binding.btnLogin.isEnabled = true
        binding.btnSignup.isEnabled = true
    }

    private fun navigateToMain() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
