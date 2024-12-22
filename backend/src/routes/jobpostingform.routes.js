import express from 'express';
import JobPosting from '../models/jobpostingform.model.js';
import Application from '../models/application.model.js';

const router = express.Router();

// Create or save draft job posting
router.post('/create', async (req, res) => {
  try {
    console.log('Received job data:', req.body);
    const isDraft = req.body.isDraft === true;

    // Only validate required fields if not a draft
    if (!isDraft) {
      const requiredFields = ['title', 'description', 'positionType', 'location', 'remotePolicy'];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({
            success: false,
            message: `Missing required field: ${field}`
          });
        }
      }
    }

    const jobData = {
      ...req.body,
      isDraft,
      status: isDraft ? 'draft' : 'published'
    };

    console.log('Creating job with data:', jobData);

    const jobPosting = new JobPosting(jobData);
    const savedJob = await jobPosting.save();

    console.log('Job saved successfully:', savedJob);
    
    res.status(201).json({
      success: true,
      message: isDraft ? 'Job saved as draft' : 'Job published successfully',
      data: savedJob
    });
  } catch (error) {
    console.error('Error saving job:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to save job posting',
      error: error.message
    });
  }
});

// Get all job postings (with optional status filter)
router.get('/all', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const jobPostings = await JobPosting.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: jobPostings
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job postings',
      error: error.message
    });
  }
});

// Get drafts
router.get('/drafts', async (req, res) => {
  try {
    const drafts = await JobPosting.find({ 
      status: 'draft',
      // Add company filter here when you have authentication
    }).sort({ updatedAt: -1 });

    res.json({
      success: true,
      data: drafts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch drafts',
      error: error.message
    });
  }
});

// Delete draft
router.delete('/drafts/:id', async (req, res) => {
  try {
    const draft = await JobPosting.findOneAndDelete({
      _id: req.params.id,
      status: 'draft'
    });

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: 'Draft not found'
      });
    }

    res.json({
      success: true,
      message: 'Draft deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete draft',
      error: error.message
    });
  }
});

// Publish draft
router.put('/drafts/:id/publish', async (req, res) => {
  try {
    const draft = await JobPosting.findOne({
      _id: req.params.id,
      status: 'draft'
    });

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: 'Draft not found'
      });
    }

    draft.status = 'published';
    draft.isDraft = false;
    await draft.save();

    res.json({
      success: true,
      message: 'Job published successfully',
      data: draft
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to publish draft',
      error: error.message
    });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job details',
      error: error.message
    });
  }
});

// Apply to job
router.post('/:id/apply', async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Create application with more details
    const application = new Application({
      jobId: job._id,
      userId: req.body.userId,
      jobDetails: {
        title: job.title,
        description: job.description,
        company: job.companyDetails?.companyName,
        location: job.location,
        positionType: job.positionType,
        remotePolicy: job.remotePolicy,
        salary: job.salary
      },
      companyDetails: {
        companyName: job.companyDetails?.companyName,
        companySize: job.companyDetails?.companySize,
        industry: job.companyDetails?.industry,
        companyDescription: job.companyDetails?.description,
        requirements: {
          relocation: job.requirements?.relocation,
          relocationAssistance: job.requirements?.relocationAssistance
        }
      }
    });

    await application.save();

    res.json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
});

// Get user's applications
router.get('/applications/user/:userId', async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId })
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Get all jobs for this company
    const jobs = await JobPosting.find({ /* Add company filter here */ });
    
    // Get all applications
    const applications = await Application.find({
      jobId: { $in: jobs.map(job => job._id) }
    });

    // Calculate statistics
    const stats = {
      totalApplicants: applications.length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      interviews: applications.filter(app => app.status === 'interview').length,
      profileViews: jobs.reduce((sum, job) => sum + (job.profileViews || 0), 0),
      jobViews: jobs.reduce((sum, job) => sum + (job.jobViews || 0), 0),
      matches: applications.filter(app => app.status === 'matched').length,
      // Add trends by comparing with previous period
      trends: {
        applicants: calculateTrend(applications, 'created'),
        shortlisted: calculateTrend(applications.filter(app => app.status === 'shortlisted'), 'statusUpdated'),
        interviews: calculateTrend(applications.filter(app => app.status === 'interview'), 'statusUpdated')
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
});

// Helper function to calculate trends
const calculateTrend = (data, dateField) => {
  const now = new Date();
  const twoWeeksAgo = new Date(now - 14 * 24 * 60 * 60 * 1000);
  const fourWeeksAgo = new Date(now - 28 * 24 * 60 * 60 * 1000);

  const recentCount = data.filter(item => 
    new Date(item[dateField]) >= twoWeeksAgo
  ).length;

  const previousCount = data.filter(item => 
    new Date(item[dateField]) >= fourWeeksAgo && 
    new Date(item[dateField]) < twoWeeksAgo
  ).length;

  if (previousCount === 0) return '+100%';
  const percentageChange = ((recentCount - previousCount) / previousCount) * 100;
  return `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(0)}%`;
};

export default router;
