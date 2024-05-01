const express = require('express');
const router = express.Router();
const Post = require('../models/PostSchema');
const Application = require('../models/ApplicationSchema');

// Fetch all available job posts
router.get('/notify', async (req, res) => {
    try {
        // Define a valid condition for available job posts
        const jobNotify = await Post.find({postAvailable: true}); // Update with correct condition
        res.status(200).json(jobNotify);
    } catch (error) {
        console.error('Error fetching job notifications:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Fetch hired applications
  router.get('/notify-hired', async (req, res) => {

    try {
        const notifyHired = await Application.find({ status: 'hired' }); // Correct condition
        res.status(200).json(notifyHired);
    } catch (error) {
        console.error('Error fetching hired notifications:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});   

// Fetch retired applications
router.get('/notify-retired', async (req, res) => {
    try {
        const notifyRetired = await Application.find({ status: 'retired' }); // Correct condition
        res.status(200).json(notifyRetired);
    } catch (error) {
        console.error('Error fetching retired notifications:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
