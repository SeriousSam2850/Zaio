const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

//Get users token info
router.get('/', checkAuth, async (req, res) => {
    res.status(201).json(req.userData);
});

module.exports = router;