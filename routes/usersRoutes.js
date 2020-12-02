const express = require('express')
const bodyParser = require('body-parser').json()

const UsersServices = require('../services/usersServices')
const { Authentication }= require('../middleware/index')

function usersAPI(app) {
  const router = express.Router()
  app.use('/api/users', router)

  const usersServices = new UsersServices()
  const authentication = new Authentication()

  // GET User for ID
  router.get('/:userId', authentication.verifyToken, async function(req, res, next) {
    const { userId } = await req.params
    const userList = await usersServices.getUserById({ userId })

    res.send({
      status: 200,
      data: userList,
      message: "User by id listed"
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