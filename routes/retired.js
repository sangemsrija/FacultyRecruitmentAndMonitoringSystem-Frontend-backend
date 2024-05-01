const express = require('express');
const router = express.Router();
const Application = require('../models/ApplicationSchema'); // Assuming ApplicationSchema is correct
const Apply = require('../models/ApplySchema'); // Assuming ApplySchema is correct

// Helper function to calculate age from DOB
{/*function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob); // Corrected to use 'dob' parameter
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--; // Adjust the age if the birthday hasn't occurred this year
  }

  return age;
} */}


router.get('/retired', async (req, res) => {
  try {
    // Find all hired faculty
    
    const hiredFaculty = await Application.find({ status: 'retired' }).select('name qualification experience email postAvailable');

    res.json(hiredFaculty); 
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
