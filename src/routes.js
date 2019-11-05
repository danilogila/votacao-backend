const express = require('express')
const routes = express.Router()

const authMiddleware = require('./app/middlewares/')
const isAuth = require('./app/middlewares/auth')
const attachUser = require('./app/middlewares/attachUser')
const controllers = require('./app/controllers/')


routes.get('/polls', controllers.PollController.index)
routes.get('/polls/:pollId', controllers.PollController.show)
routes.post('/polls/new', controllers.PollController.store)
routes.put('/polls/:pollId', controllers.PollController.update)
routes.delete('/polls/:pollId', controllers.PollController.delete)
routes.post('/polls/:pollId/vote/:optionId', controllers.PollController.vote)
// routes.post('/polls/filter', controllers.PollController.filter)

routes.get('/users', controllers.UserController.index)
routes.post('/users', controllers.UserController.store)

routes.post('/users/signup', controllers.UserController.signup)
routes.post('/users/login', controllers.UserController.login)
// routes.post('/sessions', controllers.SessionController.store)

// routes.use(authMiddleware)
routes.get('/teste', isAuth, attachUser, (req, res) => {
    console.log(req)

})

// routes.get('/item', authMiddleware.isAuth, authMiddleware.attachUser, (req, res) => res.send('Hello World'))
module.exports = routes