const store = require('../store/mysql')


class UsersServices {
  constructor() {
    this.table = 'users'
  }

  async getUserById({ userId }) {
    const userById = await store.get(this.table, userId)
    return userById
  }

  async updateUser() {
  }

  async deleteUser() {
  }

}


module.exports = UsersServices