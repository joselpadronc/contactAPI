const express = require('express')
const bodyParser = require('body-parser').json()

const ContactsServices = require('../services/contactsServices')

function contactsAPI(app) {
  const router = express.Router()
  app.use('/api/contacts', router)

  const contactsServices = new ContactsServices()

  // GET Contacts List
  router.get('/', async function(req, res, next) {
    const contactsList = await contactsServices.getContactsList()
    res.send({
      status: 200,
      data: contactsList,
      message: "Contacts listed"
    })
  })

  // GET Contact for ID
  router.get('/:contactId', async function(req, res, next) {
    const { contactId } = await req.params
    const contactsList = await contactsServices.getContactById({ contactId })
    res.send({
      status: 200,
      data: contactsList,
      message: "Contact by id listed"
    })
  })

  // POST Contact
  router.post('/', bodyParser, async function(req, res, next) {
    const { body: contact } = await req
    const newContact = await contactsServices.createContact(contact)
    res.send({
      status: 201,
      data: newContact,
      message: "Contact created"
    })
  })

  // PUT Contact for ID
  router.put('/:contactId', bodyParser, async function(req, res, next) {
    const { contactId } = await req.params
    const { body: data } = await req
    const changeContactData = await contactsServices.updateContact(contactId, data)
    res.send({
      status: 200,
      data: changeContactData,
      message: "Contact updated"
    })
  })

  // DELETE Contact for ID
  router.delete('/:contactId', async function(req, res, next) {
    const { contactId } = await req.params
    const contactsList = await contactsServices.deleteContact({ contactId })
    res.send({
      status: 200,
      data: contactsList,
      message: "Contact deleted"
    })
  })

}


module.exports = {
  contactsAPI,
}