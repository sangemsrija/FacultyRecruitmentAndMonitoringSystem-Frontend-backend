// login.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Recruiter=require('../models/RecruitersignupSchema');
//const app=express();
const router = express.Router(); 
// Define POST route for user login
router.post('/recruiterlogin', async (req, res) => {
    try {
      const { institutename, password } = req.body;
  
      // Check if user exists
      const user = await Recruiter.findOne({ institutename });
      if (!user) {
        return res.status(404).json({ message: 'recruiter not found' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
       // User authenticated, generate token
       const token = jwt.sign(
        { id: user._id, institutename: user.institutename },
        'sshhh',
        { expiresIn: '7d' }
    );
   //console.log('Generated Token:', token);
    // Clear password before sending user object
    user.password = undefined;

    // Set cookie options
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Expires in 3 days
        httpOnly: true
    };

    // Set token in cookie and send response
    res.status(200).cookie('token', token, options).json({
        success: true,
        user // Sending user object instead of token if needed
    });



      // User authenticated, return success message or token
    //  res.json({ message: 'Login successful', user: { institutename: user.institutename, password: user.password } });
    } catch (error) {
      console.error('Error logging in recruiter:', error);
      res.status(500).json({ message: 'Error logging in recruiter' });
    }
  });



module.exports = router;
