const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersignupSchema');
// const { generateToken } = require('../middleware/authMiddleware'); // If not used elsewhere, you can remove this import

const router = express.Router();
router.use(cookieParser());

router.post('/userlogin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // User authenticated, generate token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            'sshhh',
            { expiresIn: '2h' }
        );
       // console.log('Generated Token:', token);
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

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
});

module.exports = router;
