const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

function authentication(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // FIX: Only proceed if header EXISTS and starts with "Bearer "
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token invalid or expired' });
            }

            try {
                const user = await User.findById(decoded.id).select('-password -refreshToken').exec();
                
                if (user) {
                    req.user = user.toObject({ getters: true });
                    next();
                } else {
                    return res.status(401).json({ message: 'User not found' });
                }
            } catch (error) {
                return res.status(500).json({ error: 'Server Error' });
            }
        });
    } else {
        // If no header is sent, return 401 (Unauthorized) instead of crashing
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
}

module.exports = { authentication };