const express = require('express');
const bcrypt = require('bcrypt');
const AdminCredentials = require('../models/AdminSchema'); // Import the Mongoose model
const router = express.Router(); 

// Define POST route for user login
router.post('/post', async (req, res) => {
    try {
        const { userId, password } = req.body;

        // Find admin credentials
        const admin = await AdminCredentials.findOne({ userId });
        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // User authenticated, return success message or token
        res.json({ message: 'Login successful', user: { userId: admin.userId, password: admin.password } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
});

module.exports = router;
