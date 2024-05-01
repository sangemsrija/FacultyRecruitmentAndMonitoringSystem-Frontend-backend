const express = require('express');
const Jobs = require('../models/JobsavailSchema');
const router = express.Router();
const Application = require('../models/ApplicationSchema');

// Function to safely create a valid date and check for errors
const safeDate = (dateValue) => {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date value');
    }
    return date;
};

// Define fetch route
router.get('/jobs', async (req, res) => {
    try {
        const currentDate = new Date();

        const allJobs = await Jobs.find({}, 'institute postAvailable qualification experience postedDate'); // Fetching only necessary fields

        // Calculate date 10 days after postingDate for each job
        const jobsWithEndDate = allJobs.map(async (job) => {
            const postingDate = safeDate(job.postedDate); // Validate the posted date
            const endDate = new Date(postingDate.getTime() + 10 * 24 * 60 * 60 * 1000); // Adding 10 days (in milliseconds)

            // Check if the end date has passed
            if (endDate < currentDate) {
                // Delete the job from the database
                await Jobs.findByIdAndDelete(job._id);
                return null; // Returning null to exclude this job from the response
            } else {
                return {
                    institute: job.institute,
                    postAvailable: job.postAvailable,
                    qualification: job.qualification,
                    experience: job.experience,
                    endDate: endDate.toISOString().slice(0, 10) // Format endDate as 'YYYY-MM-DD'
                };
            }
        });

        // Filter out null values (jobs that were deleted)
        const validJobsWithEndDate = (await Promise.all(jobsWithEndDate)).filter((job) => job !== null);

        res.json(validJobsWithEndDate);
    } catch (error) {
        console.error('Error in /jobs route:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/jobs-retired', async (req, res) => {
    try {
        const currentDate = new Date();
        const jobsRetired = await Application.find({ status: 'retired'}, 'postAvailable institute qualification experience retirementDate');

        const jobsWithEndDate = jobsRetired.map(async (job) => {
            const retiredDate = safeDate(job.retirementDate); // Validate the retirement date
            const endDate = new Date(retiredDate.getTime() + 10 * 24 * 60 * 60 * 1000); // Adding 10 days

            if (endDate < currentDate) {
                // Delete the job from the database
                await Application.findByIdAndDelete(job._id);

                return null; // Exclude from the response
            } else {
                return {
                    institute: job.institute,
                    postAvailable: job.postAvailable,
                    qualification: job.qualification,
                    experience: job.experience,
                    endDate: endDate.toISOString().slice(0, 10) // Format endDate as 'YYYY-MM-DD'
                };
            }
        });

        const validJobsWithEndDate = (await Promise.all(jobsWithEndDate)).filter((job) => job !== null);
        res.json(validJobsWithEndDate);
    } catch (error) {
        console.error('Error in /jobs-retired route:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
