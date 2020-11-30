const { nanoid } = require('nanoid');

const store = require('../store/mysql')

class ContactsServices {
  constructor() {
    this.table = 'contacts'
  }

  async getContactsList() {
    const contactsList = await store.list(this.table)
    return contactsList || []
  }

  async getContactById({ contactId }) {
    const contactById = await store.get(this.table, contactId)
    return contactById
  }

  async createContact(contact) {
    const contactData = {
      id: contact.id,
      name: contact.name,
      country: contact.country,
      phone_number: contact.phoneNumber
    }

    if (!contact.id) {
      contact.id = nanoid()
    }

    const newContact = await store.create(this.table, contactData)
    return newContact
  }

  async updateContact(id, data) {
    const contactId = id
    const changeData = data

    const changeContactData = await store.update(this.table, contactId, changeData)
    return changeContactData
  }

  async deleteContact({ contactId }) {
    const contactById = await store.deleteRow(this.table, contactId)
    return contactById
  }

}


module.exports = ContactsServices