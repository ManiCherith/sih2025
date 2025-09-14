package com.civicconnect.android.network

import com.civicconnect.android.models.*
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.*

interface ApiService {

    @POST("auth/signup")
    suspend fun signup(@Body request: SignupRequest): Response<User>

    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>

    @POST("auth/refresh")
    suspend fun refreshToken(): Response<RefreshTokenResponse>

    @POST("auth/logout")
    suspend fun logout(): Response<Unit>

    @GET("profile")
    suspend fun getProfile(): Response<User>

    @GET("api/issues")
    suspend fun getIssues(): Response<List<Issue>>

    @GET("api/issues/{id}")
    suspend fun getIssue(@Path("id") issueId: String): Response<Issue>

    @Multipart
    @POST("api/issues")
    suspend fun createIssue(
        @Part("title") title: RequestBody,
        @Part("category") category: RequestBody,
        @Part("description") description: RequestBody,
        @Part("location") location: RequestBody,
        @Part("priority") priority: RequestBody,
        @Part("coordinates") coordinates: RequestBody,
        @Part photo: MultipartBody.Part?
    ): Response<Issue>

    @PATCH("api/issues/{id}")
    suspend fun updateIssue(
        @Path("id") issueId: String,
        @Body request: UpdateIssueRequest
    ): Response<Issue>
}
