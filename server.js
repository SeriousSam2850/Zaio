require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

// Routers
const propertiesRouter = require('./routes/properties.js' )
const customersRouter = require('./routes/customers.js' )
const agentsRouter = require('./routes/agents.js' )

// Using the routers for specified paths
app.use('/properties', propertiesRouter)
app.use('/customers', customersRouter)
app.use('/agents', agentsRouter)

app.listen(3000, () => console.log('Server Started'))