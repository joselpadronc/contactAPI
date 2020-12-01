const express = require('express')
const bodyParser = require('body-parser')

const conf = require('./config')
const { contactsAPI } = require('./routes/contactsRoutes')
const { usersAPI } = require('./routes/usersRoutes')

const app = express()

// ROUTES
contactsAPI(app)
usersAPI(app)

// BODY PARSER
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// ROUTES


// LISTENING API ON PORT 3000
app.listen(conf.api.port, function() {
  console.log(`LISTENING API ON http://localhost:${conf.api.port}/`)
})