const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAdmin = require('../middleware/check-admin');

//Creating One
router.post('/', async (req, res) => {

    Customer.find({email: req.body.email})
        .exec()
        .then(customer => {
            if (customer.length >= 1) {
                return res.status(409).json({
                    message: "Mail exsits"
                });
            } else {
            //Hashing password
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const customer = new Customer({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            password: hash
                        });
                        customer
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({ message: "Customer created" })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                });
            }
        });
})

//Authentaction
router.post('/authentication', (req, res) => {
    Customer.find({ email: req.body.email })
        .exec()
        .then(customer => {
            if (customer.length < 1) {
                return res.status(401).json({
                    message: "authentication Failed"
                });
            } else {
                bcrypt.compare(req.body.password, customer[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "authentication Failed"
                        });
                    } else if (result) {
                        const token = jwt.sign(
                            {
                                email: customer[0].email,
                                firstname: customer[0].firstname,
                                lastname: customer[0].lastname,
                                id: customer[0]._id,
                                agent: customer[0].agent
                            }, 
                            process.env.JWT_KEY, 
                            {
                                expiresIn: "2h"
                            }
                        );
                        return res.status(200).json({
                            message: "authentication successful",
                            token: token
                        });
                    } else {
                        return res.status(401).json({
                            message: "authentication Failed"
                        });
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Deleting One
router.delete('/:id', checkAdmin, getCustomer, async (req, res) => {
    try {
        await res.customer.remove()
        res.json({ message: 'Deleted Customer'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Getting All
router.get('/', checkAdmin, async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

async function getCustomer(req, res, next) {
    let customer
    try {
        customer = await Customer.findById(req.params.id)
        if (customer == null) {
            return res.status(404).json({ message: 'Cannot find customer' })
        }
    } catch (error) {
        console.log("Error finding customer")
        return res.status(500).json({ message: error.message })
    }
    res.customer = customer
    next()
}

module.exports = router