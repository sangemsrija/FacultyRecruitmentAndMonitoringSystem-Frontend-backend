// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'your_secret_key_here');
        req.user = decoded.user; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;
