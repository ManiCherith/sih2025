package com.civicconnect.android.models

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("id") val id: String,
    @SerializedName("email") val email: String,
    @SerializedName("role") val role: String,
    @SerializedName("createdAt") val createdAt: String? = null
)

data class AuthResponse(
    @SerializedName("accessToken") val accessToken: String,
    @SerializedName("role") val role: String
)

data class RefreshTokenResponse(
    @SerializedName("accessToken") val accessToken: String
)

data class LoginRequest(
    @SerializedName("email") val email: String,
    @SerializedName("password") val password: String,
    @SerializedName("role") val role: String = "citizen"
)

data class SignupRequest(
    @SerializedName("email") val email: String,
    @SerializedName("password") val password: String
)

data class Issue(
    @SerializedName("id") val id: String,
    @SerializedName("title") val title: String,
    @SerializedName("category") val category: String,
    @SerializedName("description") val description: String,
    @SerializedName("location") val location: String,
    @SerializedName("priority") val priority: String,
    @SerializedName("status") val status: String = "submitted",
    @SerializedName("coordinates") val coordinates: List<Double>? = null,
    @SerializedName("photoPath") val photoPath: String? = null,
    @SerializedName("resolutionPhotoPath") val resolutionPhotoPath: String? = null,
    @SerializedName("userId") val userId: String,
    @SerializedName("submittedBy") val submittedBy: String,
    @SerializedName("assignedTo") val assignedTo: String? = null,
    @SerializedName("upvotes") val upvotes: Int = 0,
    @SerializedName("createdAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String? = null,
    @SerializedName("resolvedAt") val resolvedAt: String? = null,
    @SerializedName("user") val user: User? = null
)

data class CreateIssueRequest(
    @SerializedName("title") val title: String,
    @SerializedName("category") val category: String,
    @SerializedName("description") val description: String,
    @SerializedName("location") val location: String,
    @SerializedName("priority") val priority: String,
    @SerializedName("coordinates") val coordinates: List<Double>? = null
)

data class UpdateIssueRequest(
    @SerializedName("status") val status: String? = null,
    @SerializedName("assignedTo") val assignedTo: String? = null,
    @SerializedName("upvotes") val upvotes: Int? = null
)

enum class IssueCategory(val value: String, val displayName: String) {
    POTHOLES("potholes", "Potholes"),
    STREETLIGHTS("streetlights", "Street Lights"),
    GARBAGE("garbage", "Garbage"),
    DRAINAGE("drainage", "Drainage"),
    TRAFFIC("traffic", "Traffic"),
    VANDALISM("vandalism", "Vandalism"),
    NOISE("noise", "Noise"),
    PARKS("parks", "Parks");

    companion object {
        fun fromValue(value: String): IssueCategory? = values().find { it.value == value }
        fun getAllDisplayNames(): Array<String> = values().map { it.displayName }.toTypedArray()
        fun getAllValues(): Array<String> = values().map { it.value }.toTypedArray()
    }
}

enum class IssuePriority(val value: String, val displayName: String) {
    LOW("low", "Low"),
    MEDIUM("medium", "Medium"), 
    HIGH("high", "High"),
    URGENT("urgent", "Urgent");

    companion object {
        fun fromValue(value: String): IssuePriority? = values().find { it.value == value }
        fun getAllDisplayNames(): Array<String> = values().map { it.displayName }.toTypedArray()
        fun getAllValues(): Array<String> = values().map { it.value }.toTypedArray()
    }
}

enum class IssueStatus(val value: String, val displayName: String) {
    SUBMITTED("submitted", "Submitted"),
    ASSIGNED("assigned", "Assigned"),
    IN_PROGRESS("in-progress", "In Progress"),
    RESOLVED("resolved", "Resolved");

    companion object {
        fun fromValue(value: String): IssueStatus? = values().find { it.value == value }
        fun getAllDisplayNames(): Array<String> = values().map { it.displayName }.toTypedArray()
        fun getAllValues(): Array<String> = values().map { it.value }.toTypedArray()
    }
}
