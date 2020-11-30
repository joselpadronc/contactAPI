const express = require('express')
const bodyParser = require('body-parser')

const { contactsAPI } = require('./routes/contactsRoutes')

const app = express()

// ROUTES
contactsAPI(app)

// BODY PARSER
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// ROUTES


// LISTENING API ON PORT 3000
app.listen(3000, function() {
  console.log('LISTENING API ON http://localhost:3000/')
})