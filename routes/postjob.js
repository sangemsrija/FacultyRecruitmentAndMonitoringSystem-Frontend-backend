const express = require('express');
const Post = require('../models/PostSchema');

const router = express.Router();

// define post route
router.post('/postjob', async (req, res) => {
    try {
        const { institute, postAvailable, qualification, experience, postingDate } = req.body;

        // check if post already available
        let existingPost = await Post.findOne({ postAvailable });
        if (existingPost) {
            return res.status(400).json({ success: false, message: 'post already exists' });
        }
        // create new post
        const newPost = new Post({
            institute,
            postAvailable,
            qualification,
            experience,
            postedDate: Date.now() // Assuming you want to store the posting date
        });
        // saving to db
        await newPost.save();
        res.status(201).json({ success: true, message: 'successfully posted job' });
    } catch (error) {
        console.error('error occurred', error);
        res.status(500).json({ success: false, message: 'error' });
    }
});

// GET route to retrieve the posted date of a job
/*router.get('/posted-date/:id', async (req, res) => {
    try {
        const job = await Post.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        const postedDate = job.postedDate;
        res.json({ success: true, postedDate });
        console.log(postedDate);
    } catch (error) {
        console.error('Error fetching posted date:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});   */


module.exports = router;
