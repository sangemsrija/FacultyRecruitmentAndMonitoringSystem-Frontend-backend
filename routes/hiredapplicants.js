const express = require('express');
const Application = require('../models/ApplicationSchema');
const router = express.Router();

// Define route to get hired applicants
router.get('/hiredapplicants', async (req, res) => {
    try {
        // Selecting fields to include in the response
        const hiredApplicants = await Application.find({ status: "hired" }).select('name qualification experience email postAvailable hiringDate resume');

        // Format hiringDate to yyyy-mm-dd
        const formattedApplicants = hiredApplicants.map(applicant => ({
            ...applicant._doc,
            hiringDate: applicant.hiringDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
        }));

        res.json(formattedApplicants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
