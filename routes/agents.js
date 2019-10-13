const express = require('express')
const router = express.Router()
const Agent = require('../models/agent')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkAdmin = require('../middleware/check-admin');

//Creating One
router.post('/', async (req, res) => {

    Agent.find({email: req.body.email})
        .exec()
        .then(agent => {
            if (agent.length >= 1) {
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
            }
        });
})

//authentication
router.post('/authentication', (req, res) => {
    Agent.find({ email: req.body.email })
        .exec()
        .then(agent => {
            if (agent.length < 1) {
                return res.status(401).json({
                    message: "authentication Failed"
                });
            } else {
                bcrypt.compare(req.body.password, agent[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "authentication Failed"
                        });
                    } else if (result) {
                        const token = jwt.sign(
                            {
                                email: agent[0].email,
                                id: agent[0]._id,
                                agent: agent[0].agent
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
router.delete('/:id', checkAdmin, getAgent, async (req, res) => {
    try {
        await res.agent.remove()
        res.json({ message: 'Deleted Agent'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Getting All
router.get('/', checkAdmin, async (req, res) => {
    try {
        const agents = await Agent.find()
        res.json(agents)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

async function getAgent(req, res, next) {
    let agent
    try {
        agent = await Agent.findById(req.params.id)
        if (agent == null) {
            return res.status(404).json({ message: 'Cannot find agent' })
        }
    } catch (error) {
        console.log("Error finding agent")
        return res.status(500).json({ message: error.message })
    }
    res.agent = agent
    next()
}

module.exports = router