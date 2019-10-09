const express = require('express')
const router = express.Router()
const Customer = require('../models/agent')


//Creating One
router.post('/', async (req, res) => {
    const customer = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const newCustomer = await customer.save()
        res.status(201).json(newCustomer)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

module.exports = router