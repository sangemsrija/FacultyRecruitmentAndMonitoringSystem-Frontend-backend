const express = require('express');
const Application = require('../models/ApplicationSchema');
const router = express.Router();

// Define fetch all applications route
// Define fetch all applications route
router.get('/application', async (req, res) => {
    try {
      // Fetch only applicants with status other than 'hired'
      const allApplications = await Application.find({ status: { $ne: 'hired' } });
      res.json(allApplications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Define route to hire an applicant
router.put('/hire/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { hiringDate } = req.body;
  
      // Update the status and hiringDate of the applicant
      const updatedApplicant = await Application.findByIdAndUpdate(id, { status: "hired", hiringDate }, { new: true });
  
      res.json(updatedApplicant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });




  

  {/*router.put('/retired/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Updating user with ID:', id); // Debugging information

    const user = await Application.find({ status: { $eq: 'hired' } });
    if (!user) {
      console.log('User not found'); // Log when user isn't found
      return res.status(404).json({ error: 'User not found' });
    }

    const dob = user.dob;
    const age = calculateAge(dob); // Calculate age
    console.log('Calculated age:', age);

    if (age > 50) {
      const updatedApplication = await Application.findByIdAndUpdate(
        id,
        { status: 'retired' },
        { new: true }
      );

      console.log('Updated application:', updatedApplication); // Log the updated application
      return res.json(updatedApplication);
    } else {
      console.log('User not eligible for retirement'); // Log if age condition not met
      return res.status(400).json({ error: 'User is not eligible for retirement (age must be greater than 50)' });
    }
  } catch (error) {
    console.error('Error updating user:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

*/}
module.exports = router;
