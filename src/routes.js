const express = require('express')
const routes = express.Router()
const controllers = require('./app/controllers/')

// URL pra Votaçao Atual, podendo votar em uma opção
routes.post('/polls/:pollId/vote/:optionId', controllers.VoteController.vote)

// Dados de uma votacao
routes.get('/polls/:pollId', controllers.PollController.show)

// Quantidade de votos de uma votação
routes.get('/polls/:pollId/total', controllers.VoteController.total)

// Total de votos por candidator
routes.get('/polls/:pollId/candidate/:optionId/total', controllers.VoteController.totalCandidate)

// Criar uma votação
routes.post('/polls/new', controllers.PollController.store)

// Atualizar uma votação
routes.put('/polls/:pollId', controllers.PollController.update)

// Deletar uma votação
routes.delete('/polls/:pollId', controllers.PollController.delete)

// Buscar tempo restante da votação
routes.get('/polls/:pollId/time', controllers.PollController.findRemainTime)

// Listar Votações
routes.get('/polls', controllers.PollController.index)

// Listar quantidade de votações por hora
routes.get('/polls/:pollId/votes/hour', controllers.VoteController.totalHour)

module.exports = routes