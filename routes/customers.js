const express = require('express')
const router = express.Router()
const listing = require('../models/customer')

//Gettings All
router.get('/', async (req, res) => {
    try {
        const customers = await customer.find()
        res.json(customers)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Getting One
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

//Creating One
router.post('/', async (req, res) => {
    const customer = new customer({

    })

    try {
        const newCustomer = await customer.save()
        res.status(201).json(newCustomer)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

//Updating One
router.patch('/:id', (req, res) => {
    
})

//Deleting One
router.delete('/:id', (req, res) => {
    
})

module.exports = router