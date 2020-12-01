const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const moment = require('moment')

const conf = require('../config')
const store = require('../store/mysql')


class UsersServices {
  constructor() {
    this.table = 'users'
  }

  async getUserById({ userId }) {
    const userById = await store.get(this.table, userId)
    return userById
  }

  async createUser(data) {
    data.password = bcrypt.hashSync(data.password, 12)
    const passwordEncript = data.password
    const user = {
      id: data.id,
      name: data.name,
      username: data.username,
      password: passwordEncript
    }

    if (!data.id) {
      data.id = nanoid()
    }

    if (data.name || data.username || data.password) {
      await store.create(this.table, user)
      return user

    } else {
      return 'Information is missing'
    }

  }

  async createToken(user) {
    let pyload = {
      userId: user.id,
      createdAt: moment().unix(),
      expiresAt: moment().add(1, 'day').unix()
    }

    return jwt.encode(pyload, conf.jwt.secret)
  }

  async loginUser(username, password) {
    const user = await store.query(this.table, { username: username });
    const equals = bcrypt.compareSync(password, user.password)

    if (!equals === true) {
      const message = 'Invalid information'
      return message

    } else {
      const token = this.createToken(user)
      return token
    }

  }

  async updateUser() {
  }

  async deleteUser() {
  }

}


module.exports = UsersServices