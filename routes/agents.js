const express = require('express')
const router = express.Router()
const listing = require('../models/agent')


//Creating One
router.post('/', async (req, res) => {
    const agent = new agent({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const newAgent = await agent.save()
        res.status(201).json(newAgent)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

module.exports = router