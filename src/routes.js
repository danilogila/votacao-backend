const express = require('express')
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers/')


routes.get('/polls', controllers.PollController.index)
routes.get('/polls/:pollId', controllers.PollController.show)
routes.post('/polls/new', controllers.PollController.store)
routes.put('/polls/:pollId', controllers.PollController.update)
routes.delete('/polls/:id', controllers.PollController.delete)
routes.post('/polls/:pollId/vote/:optionId', controllers.PollController.vote)

routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)

routes.use(authMiddleware)
routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }))

module.exports = routes