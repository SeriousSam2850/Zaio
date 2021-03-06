const express = require('express');
const router = express.Router();
const Property = require('../models/property');
const Customer = require('../models/customer');
const checkAuth = require('../middleware/check-auth');
const checkOwner = require('../middleware/check-owner');

//Gettings All
router.get('/', checkAuth, async (req, res) => {
    try {
        const properties = await Property.find()
        res.json(properties)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Gettings All
router.post('/get', checkAuth, async (req, res) => {
    try {
        const properties = await Property.find()
        res.json(properties)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Gettings All of an agent
router.get('/agent/:email', checkAuth, async (req, res) => {
    try {
        const properties = await Property.find({
            agentEmail: req.params.email
        });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Gettings All of an agent
router.post('/get/agent/:email', checkAuth, async (req, res) => {
    try {
        const properties = await Property.find({
            agentEmail: req.params.email
        });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Getting One
router.get('/:id', checkAuth, getProperty, async (req, res) => {
    if (!req.userData.agent) {//avals to false for agent true for customer
        const customer = await Customer.find({ email: req.userData.email });
        if (customer[0] != null) {
            let d = new Date();
            let days = d.getDay();
            let hours = d.getHours() + days * 24;
            let mins = d.getMinutes() + hours * 60;
            if (customer[0].count == 4) {
                if ((mins - customer[0].lastViewed) > 60) {
                    customer[0].count = 1;
                    customer[0].lastViewed = mins;
                    await customer[0].save();
                } else {
                    return res.status(401).json({ message: "Sorry no more views, wait a while" });
                };
            } else {
                customer[0].count = customer[0].count + 1;
                customer[0].lastViewed = mins;
                const upDatedCustomer = await customer[0].save();
                console.log(upDatedCustomer);
            };
        } else {
            return res.status(404).json({ message: "Cannot find customer" });
        }
    }
    res.json(res.property);
})

//Getting One
router.post('/get/:id', checkAuth, getProperty, async (req, res) => {
    if (!req.userData.agent) {//avals to false for agent true for customer
        const customer = await Customer.find({ email: req.userData.email });
        if (customer[0] != null) {
            let d = new Date();
            let days = d.getDay();
            let hours = d.getHours() + days * 24;
            let mins = d.getMinutes() + hours * 60;
            if (customer[0].count == 4) {
                if ((mins - customer[0].lastViewed) > 60) {
                    customer[0].count = 1;
                    customer[0].lastViewed = mins;
                    await customer[0].save();
                } else {
                    return res.status(401).json({ message: "Sorry no more views, wait a while" });
                };
            } else {
                customer[0].count = customer[0].count + 1;
                customer[0].lastViewed = mins;
                const upDatedCustomer = await customer[0].save();
                console.log(upDatedCustomer);
            };
        } else {
            return res.status(404).json({ message: "Cannot find customer" });
        }
    }
    res.json(res.property);
})

//Creating One
router.post('/', checkAuth, async (req, res) => {
    if (req.userData.agent) { //True or false value if agent or not
        const property = new Property({
            name: req.body.name,
            location: req.body.location,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            geo: req.body.geo,
            agentEmail: req.userData.email
        });
    
        try {
            const newProperty = await property.save();
            res.status(201).json(newProperty);
        } catch (error) {
            res.status(400).json({ message: error.message});
        };
    } else {
        return res.status(401).json({ message: "You're Not an agent" });
    }; 
});

//Updating One
router.patch('/:id', checkAuth, getProperty, checkOwner, async (req, res) => {
    if (req.body.name != null) {
        res.property.name = req.body.name;
    };
    if (req.body.location != null) {
        res.property.location = req.body.location;
    };
    if (req.body.imageUrl != null) {
        res.property.imageUrl = req.body.imageUrl;
    };
    if (req.body.price != null) {
        res.property.price = req.body.price;
    };
    if (req.body.geo != null) {
        res.property.geo = req.body.geo;
    };
    
    try {
        const updatedProperty = await res.property.save();
        res.status(201).json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message});
    };
})

//Deleting One
router.delete('/:id', checkAuth, getProperty, checkOwner, async (req, res) => {
    try {
        await res.property.remove();
        res.json({ message: 'Deleted Property'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});


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