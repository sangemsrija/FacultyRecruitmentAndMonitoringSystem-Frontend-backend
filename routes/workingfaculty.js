const express = require('express');
const Application = require('../models/ApplicationSchema');
const router = express.Router();

// Define route to get working faculty
router.get('/workingfaculty', async (req, res) => {
    try {
        // Selecting fields to include in the response
        const workingfaculty = await Application.find({ status: "hired" }).select('name qualification experience email postAvailable');
        res.json(workingfaculty); // <-- Corrected line
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  router.put('/retire/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const retirementDate = new Date(); // Get the current date when updating status to "retired"
  
      // Update the status to "retired" and set the retirement date
      const updatedApplicant = await Application.findByIdAndUpdate(
        id,
        { status: "retired", retirementDate }, // Setting the status and retirement date
        { new: true } // Return the updated document
      );
  
      res.json(updatedApplicant); // Return the updated applicant information
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
