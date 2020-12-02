const express = require('express')
const bodyParser = require('body-parser').json()

const ContactsServices = require('../services/contactsServices')
const { Authentication } = require('../middleware/index')

function contactsAPI(app) {
  const router = express.Router()
  app.use('/api/contacts', router)

  const contactsServices = new ContactsServices()
  const authentication = new Authentication()

  // GET Contacts List
  router.get('/', authentication.verifyToken, async function(req, res, next) {
    const contactsList = await contactsServices.getContactsList()
    res.send({
      status: 200,
      data: contactsList,
      message: "Contacts listed"
    })
  })

  // GET Contact for ID
  router.get('/:contactId', authentication.verifyToken, async function(req, res, next) {
    const { contactId } = await req.params
    const contactsList = await contactsServices.getContactById({ contactId })
    res.send({
      status: 200,
      data: contactsList,
      message: "Contact by id listed"
    })
  })

  // POST Contact
  router.post('/', bodyParser, authentication.verifyToken, async function(req, res, next) {
    const { body: contact } = await req
    const newContact = await contactsServices.createContact(contact)
    res.send({
      status: 201,
      data: newContact,
      message: "Contact created"
    })
  })

  // PUT Contact for ID
  router.put('/:contactId', bodyParser, authentication.verifyToken, async function(req, res, next) {
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
  router.delete('/:contactId', authentication.verifyToken, async function(req, res, next) {
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