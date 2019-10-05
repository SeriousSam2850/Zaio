const express = require('express')
const router = express.Router()
const listing = require('../models/listing')

//Gettings All
router.get('/', async (req, res) => {
    try {
        const listings = await listing.find()
        res.json(listings)
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
    const property = new listing({
        name: req.body.name,
        location: req.body.location,
        price: req.body.price
    })

    try {
        const newProperty = await property.save()
        res.status(201).json(newProperty)
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