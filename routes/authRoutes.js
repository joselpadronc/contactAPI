const express = require('express')
const bodyParser = require('body-parser').json()

const AuthServices = require('../services/authServices')

function authAPI(app) {
  const router = express.Router()
  app.use('/api/auth', router)

  const authServices = new AuthServices()

  // Sign UP User
  router.post('/signup', bodyParser, async function(req, res, next) {
    const { body: user  } = await req
    const newUser = await authServices.createUser(user)
    res.send({
      status: 201,
      data: newUser,
      message: "User created"
    })
  })

  // Login User
  router.post('/login', bodyParser, async function(req, res, next) {
    const username = req.body.username
    const password = req.body.password

    const userLogin = await authServices.loginUser(username, password)
    res.send({
      status: 200,
      data: userLogin,
      message: "Login correct"
    })

  })

}


module.exports = {
  authAPI,
}