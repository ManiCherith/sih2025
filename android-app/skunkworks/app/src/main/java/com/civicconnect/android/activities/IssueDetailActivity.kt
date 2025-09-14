package com.civicconnect.android.activities

import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.civicconnect.android.R
import com.civicconnect.android.databinding.ActivityIssueDetailBinding
import com.civicconnect.android.models.Issue
import com.civicconnect.android.models.IssueCategory
import com.civicconnect.android.models.IssuePriority
import com.civicconnect.android.models.IssueStatus
import com.civicconnect.android.utils.Constants
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class IssueDetailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityIssueDetailBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityIssueDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupToolbar()

        // Get issue from intent (in real app, you'd fetch from API)
        val issueId = intent.getStringExtra(Constants.EXTRA_ISSUE_ID)
        // For demo, create a sample issue
        setupSampleIssue()
    }

    private fun setupToolbar() {
        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Issue Details"
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            android.R.id.home -> {
                finish()
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun setupSampleIssue() {
        // Sample issue data
        binding.tvTitle.text = "Broken Street Light"
        binding.tvDescription.text = "The street light at the corner of Main St and Oak Ave has been broken for over a week. This creates safety concerns for pedestrians walking at night."
        binding.tvLocation.text = "Main St & Oak Ave, Downtown"
        binding.tvCategory.text = IssueCategory.STREETLIGHTS.displayName
        binding.tvPriority.text = IssuePriority.HIGH.displayName
        binding.tvStatus.text = IssueStatus.SUBMITTED.displayName
        binding.tvSubmittedBy.text = "john.doe@email.com"
        binding.tvSubmittedOn.text = "Sep 14, 2025"
        binding.tvCoordinates.text = "40.7128, -74.0060"

        // Set colors based on status and priority
        setStatusColor(IssueStatus.SUBMITTED)
        setPriorityColor(IssuePriority.HIGH)
        setCategoryColor(IssueCategory.STREETLIGHTS)
    }

    private fun setStatusColor(status: IssueStatus) {
        val colorRes = when (status) {
            IssueStatus.SUBMITTED -> R.color.status_submitted
            IssueStatus.ASSIGNED -> R.color.status_assigned
            IssueStatus.IN_PROGRESS -> R.color.status_in_progress
            IssueStatus.RESOLVED -> R.color.status_resolved
        }
        binding.tvStatus.setTextColor(getColor(colorRes))
    }

    private fun setPriorityColor(priority: IssuePriority) {
        val colorRes = when (priority) {
            IssuePriority.LOW -> R.color.priority_low
            IssuePriority.MEDIUM -> R.color.priority_medium
            IssuePriority.HIGH -> R.color.priority_high
            IssuePriority.URGENT -> R.color.priority_urgent
        }
        binding.tvPriority.setTextColor(getColor(colorRes))
    }

    private fun setCategoryColor(category: IssueCategory) {
        val colorRes = when (category) {
            IssueCategory.POTHOLES -> R.color.category_potholes
            IssueCategory.STREETLIGHTS -> R.color.category_streetlights
            IssueCategory.GARBAGE -> R.color.category_garbage
            IssueCategory.DRAINAGE -> R.color.category_drainage
            IssueCategory.TRAFFIC -> R.color.category_traffic
            IssueCategory.VANDALISM -> R.color.category_vandalism
            IssueCategory.NOISE -> R.color.category_noise
            IssueCategory.PARKS -> R.color.category_parks
        }
        binding.tvCategory.setTextColor(getColor(colorRes))
    }
}
