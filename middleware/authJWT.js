const jwt = require('jsonwebtoken')

const conf = require('../config')
const store = require('../store/mysql')

class Authentication {
  constructor() {
    this.table = 'users'
  }

  async verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(403).json({message: 'token not sent'})

      } else {
        const decoded = jwt.verify(token, conf.jwt.secret)

        const user = await store.query('users', { id: decoded.userId })

        if (!user) return res.status(404).json({message: 'User not found'})

        next() 

      }
    } catch(err) {
      res.status(403).json({message: 'Unauthorized'})
    }

  }

}

module.exports = {
  Authentication
}