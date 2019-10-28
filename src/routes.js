const express = require('express')
const routes = express.Router()

const PollController = require('./app/controllers/PollController')

routes.post('/polls', PollController.store)

module.exports = routes