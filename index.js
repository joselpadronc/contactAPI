const express = require('express')
const bodyParser = require('body-parser')

const conf = require('./config')
const { authAPI } = require('./routes/authRoutes')
const { usersAPI } = require('./routes/usersRoutes')
const { contactsAPI } = require('./routes/contactsRoutes')

const app = express()


// BODY PARSER
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// ROUTES
authAPI(app)
usersAPI(app)
contactsAPI(app)


// LISTENING API ON PORT 3000
app.listen(conf.api.port, function() {
  console.log(`LISTENING API ON http://localhost:${conf.api.port}/`)
})