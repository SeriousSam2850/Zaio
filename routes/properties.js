const express = require('express');
const router = express.Router();
const Property = require('../models/property');
const Customer = require('../models/customer');
const checkAuth = require('../middleware/check-auth');

//Gettings All
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find()
        res.json(properties)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Gettings All
router.get('/agent/:id', async (req, res) => {
    try {
        const properties = await Property.find({ agentID: id })
        res.json(properties)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Getting One
router.get('/:id', checkAuth, getProperty, async (req, res) => {
    //const customer = Customer.findById(req.userData.id);
    //console.log(customer);
    res.json(res.property);
})

//Creating One
router.post('/', checkAuth, async (req, res) => {
    const property = new Property({
        name: req.body.name,
        location: req.body.location,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        geo: req.body.geo,
        agentID: req.userData._id
    })

    try {
        const newProperty = await property.save()
        res.status(201).json(newProperty)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

//Updating One
router.patch('/:id', checkAuth, getProperty, async (req, res) => {
    if (req.body.name != null) {
        res.property.name = req.body.name
    }
    if (req.body.location != null) {
        res.property.location = req.body.location
    }
    if (req.body.imageUrl != null) {
        res.property.imageUrl = req.body.imageUrl
    }
    if (req.body.price != null) {
        res.property.price = req.body.price
    }

    try {
        const updatedProperty = await res.property.save()
        res.status(201).json(updatedProperty)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

//Deleting One
router.delete('/:id', checkAuth, getProperty, async (req, res) => {
    try {
        await res.property.remove()
        res.json({ message: 'Deleted Property'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


async function getProperty(req, res, next) {
    let property
    try {
        property = await Property.findById(req.params.id)
        if (property == null) {
            return res.status(404).json({ message: 'Cannot find property' })
        }
    } catch (error) {
        console.log("Error finding property")
        return res.status(500).json({ message: error.message })
    }
    res.property = property
    next()
}

module.exports = router