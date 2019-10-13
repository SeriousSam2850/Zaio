const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData = decoded;
        if (req.userData.email != process.env.ADMIN_EMAIL) {
            return res.status(401).json({ message: "You\'re not the admin" });
        } else {
            next();
        };
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};