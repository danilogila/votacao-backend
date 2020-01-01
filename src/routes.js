const express = require('express')
const routes = express.Router()
const controllers = require('./app/controllers/')

// URL pra Votaçao Atual, podendo votar em uma opção
routes.post('/polls/:pollId/vote/:optionId', controllers.VoteController.vote)

// Votacao inteira
routes.get('/polls/:pollId', controllers.PollController.show)

// Votação no Geral
routes.get('/polls/:pollId/total', controllers.VoteController.total)

// Total por participante V2
routes.get('/polls/:pollId/option/:optionId/total', controllers.VoteController.totalCanditate)

// // Total por participante
// routes.get('/polls/:pollId/option/:optionId', controllers.PollController.option)

// // Total geral (Somente as opçoes e seus votos)
// routes.get('/polls/:pollId/partial', controllers.PollController.partial)

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


module.exports = routes