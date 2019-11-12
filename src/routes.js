const express = require('express')
const routes = express.Router()
const controllers = require('./app/controllers/')

// URL pra Votaçao Atual, podendo votar em uma opção
routes.post('/polls/:pollId/vote/:optionId', controllers.VoteController.vote)

// Votação no Geral
routes.get('/polls/:pollId', controllers.VoteController.total)

// Votação por hora
routes.get('/polls/:pollId/hour', controllers.VoteController.totalHour)

// Total por participante
routes.get('/polls/:pollId/option/:optionId', controllers.PollController.option)

// Total geral (Somente as opçoes e seus votos)
routes.get('/polls/:pollId/partial', controllers.PollController.partial)

// Criar uma votação
routes.post('/polls/new', controllers.PollController.store)

// Atualizar uma votação
routes.put('/polls/:pollId', controllers.PollController.update)

// Deletar uma votação
routes.delete('/polls/:pollId', controllers.PollController.delete)

// Listar Votações
routes.get('/polls', controllers.PollController.index)

module.exports = routes