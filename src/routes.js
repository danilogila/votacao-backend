const express = require('express')
const routes = express.Router()
const controllers = require('./app/controllers/')

// Listar Votações
routes.get('/polls', controllers.PollController.index)

// Votar em uma opção
routes.post('/polls/:pollId/vote/:optionId', controllers.VoteController.vote)

// Mostrar votacao
routes.get('/polls/:pollId', controllers.PollController.show)

// Mostrar total de votos de uma votação
routes.get('/polls/:pollId/total', controllers.VoteController.total)

// Mostrar total de votos de um candidato 
routes.get('/polls/:pollId/candidate/:optionId/total', controllers.VoteController.totalCandidate)

// Criar uma votação
routes.post('/polls/new', controllers.PollController.store)

// Atualizar uma votação
routes.put('/polls/:pollId', controllers.PollController.update)

// Deletar uma votação
routes.delete('/polls/:pollId', controllers.PollController.delete)

// Buscar tempo restante da votação
routes.get('/polls/:pollId/time', controllers.PollController.findRemainTime)

// Listar quantidade de votações por hora
routes.get('/polls/:pollId/votes/hour', controllers.VoteController.totalHour)

module.exports = routes