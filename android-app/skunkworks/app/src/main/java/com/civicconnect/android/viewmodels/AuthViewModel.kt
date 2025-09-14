package com.civicconnect.android.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.civicconnect.android.models.AuthResponse
import com.civicconnect.android.models.LoginRequest
import com.civicconnect.android.models.SignupRequest
import com.civicconnect.android.models.User
import com.civicconnect.android.network.NetworkManager
import kotlinx.coroutines.launch

class AuthViewModel : ViewModel() {

    private val apiService = NetworkManager.apiService

    private val _authResult = MutableLiveData<Result<AuthResponse>>()
    val authResult: LiveData<Result<AuthResponse>> = _authResult

    private val _signupResult = MutableLiveData<Result<User>>()
    val signupResult: LiveData<Result<User>> = _signupResult

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    fun login(loginRequest: LoginRequest) {
        viewModelScope.launch {
            try {
                _isLoading.value = true
                val response = apiService.login(loginRequest)

                if (response.isSuccessful) {
                    response.body()?.let { authResponse ->
                        _authResult.value = Result.success(authResponse)
                    } ?: run {
                        _authResult.value = Result.failure(Exception("Empty response body"))
                    }
                } else {
                    val errorMessage = when (response.code()) {
                        401 -> "Invalid credentials"
                        403 -> "Access denied"
                        404 -> "User not found"
                        500 -> "Server error. Please try again later."
                        else -> "Login failed: ${response.message()}"
                    }
                    _authResult.value = Result.failure(Exception(errorMessage))
                }
            } catch (e: Exception) {
                _authResult.value = Result.failure(e)
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun signup(signupRequest: SignupRequest) {
        viewModelScope.launch {
            try {
                _isLoading.value = true
                val response = apiService.signup(signupRequest)

                if (response.isSuccessful) {
                    response.body()?.let { user ->
                        _signupResult.value = Result.success(user)
                        login(LoginRequest(signupRequest.email, signupRequest.password))
                    } ?: run {
                        _signupResult.value = Result.failure(Exception("Empty response body"))
                    }
                } else {
                    val errorMessage = when (response.code()) {
                        409 -> "Email already registered"
                        400 -> "Invalid input data"
                        500 -> "Server error. Please try again later."
                        else -> "Signup failed: ${response.message()}"
                    }
                    _signupResult.value = Result.failure(Exception(errorMessage))
                }
            } catch (e: Exception) {
                _signupResult.value = Result.failure(e)
            } finally {
                _isLoading.value = false
            }
        }
    }
}
