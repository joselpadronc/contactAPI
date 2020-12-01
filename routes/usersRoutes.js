const express = require('express')
const bodyParser = require('body-parser').json()

const UsersServices = require('../services/usersServices')

function usersAPI(app) {
  const router = express.Router()
  app.use('/api/users', router)

  const usersServices = new UsersServices()

  // GET User for ID
  router.get('/:userId', async function(req, res, next) {
    const { userId } = await req.params
    const userList = await usersServices.getUserById({ userId })
    res.send({
      status: 200,
      data: userList,
      message: "User by id listed"
    })
  })

  // Sign UP User
  router.post('/signup', bodyParser, async function(req, res, next) {
    const { body: user  } = await req
    const newUser = await usersServices.createUser(user)
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

    const userLogin = await usersServices.loginUser(username, password)
    res.send({
      status: 200,
      data: userLogin,
      message: "Login correct"
    })

  })

  // PUT User for ID
  router.put('/:contactId', bodyParser, async function(req, res, next) {
    // 
  })

  // DELETE User for ID
  router.delete('/:contactId', async function(req, res, next) {
    // 
  })

}


module.exports = {
  usersAPI,
}