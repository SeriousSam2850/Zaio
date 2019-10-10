const express = require('express')
const router = express.Router()
const Agent = require('../models/agent')
const bcrypt = require('bcrypt')

//Creating One
router.post('/', async (req, res) => {

    //Hashing password
    bcrypt.hash(req.body.email, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const agent = new Agent({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            });
            agent
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({ message: "User created" })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                })
        }
    });
})

module.exports = router