const store = require('../store/mysql')


class UsersServices {
  constructor() {
    this.table = 'users'
  }

  async getUserById({ userId }) {
    const userById = await store.get(this.table, userId)
    return userById
  }

  async updateUser(id, data) {
    const userId = id
    const userData = data

    const userToUpdate = await store.update(this.table, userId, userData)
    return userToUpdate
  }

  async deleteUser(id) {
    const userId = id

    const userToDelete = await store.deleteRow(this.table, userId)
    return userToDelete
  }

}


module.exports = UsersServices