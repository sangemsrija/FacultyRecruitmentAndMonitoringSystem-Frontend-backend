
const express = require('express');
//const Faculty = require('../models/Faculty'); 
const Apply = require('../models/ApplySchema');

const router = express.Router();

// Define route to get newly joined faculty members in the current month and year
router.get('/newfaculty', async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1
        
        // Find faculty members who joined in the current month and year
        const newlyJoinedFaculty = await Apply.find({
            hiringDate: {
                $gte: new Date(`${currentYear}-${currentMonth}-01`), // Start of the current month
                $lt: new Date(`${currentYear}-${currentMonth + 1}-01`) // Start of the next month
            },
            status: { $ne: 'retired' } // Exclude retired faculty
        });
        
        // Extracting required fields
        const facultyDetails = newlyJoinedFaculty.map(faculty => ({
            name: faculty.name,
            qualification: faculty.qualification,
            experience: faculty.experience,
            postAvailable: faculty.postAvailable,
            email: faculty.email
        }));

        res.json(facultyDetails);
    } catch (error) {
        console.error('Error fetching newly joined faculty:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
