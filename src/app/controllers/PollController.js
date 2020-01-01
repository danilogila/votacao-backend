const Poll = require('../models/Poll')
const redis = require('redis')
const redisClient = redis.createClient()
const moment = require('moment')
moment.suppressDeprecationWarnings = true;


class PollController {

    async store(req, res){
        const { title } = req.body
        if(!title){
            return res.status(400).json({ error: 'You should send poll with credentials'})
        }

        if (await Poll.findOne({ title })) {
            return res.status(400).json({ error: 'Poll already exists'})
        }

        const poll = await Poll.create(req.body)

        return res.status(201).json(poll)
    }

    async index(req, res){
        redisClient.get('indexPoll', async (err, cache) => {
            if (cache) {
                return res.status(200).send(JSON.parse(cache))
            }
            let polls

            try {
                polls = await Poll.find({})
            } catch (error) {
                res.status(500).json(error)
            }
            redisClient.set('indexPoll', JSON.stringify(polls))
            redisClient.expire('indexPoll', 10)
            return res.status(200).json(polls)

        })
    }

    async show(req, res){
        const { pollId } = req.params

        redisClient.get('showPoll', async (err, cache) => {
            if (cache) {
                return res.status(200).send(JSON.parse(cache))
            }
            let poll

            try {
                poll = await Poll.findById({ _id: pollId })
            } catch (error) {
                res.status(500).json(error)
            }

            redisClient.set('showPoll', JSON.stringify(poll))
            redisClient.expire('showPoll', 10)
            return res.status(200).json(poll)

        })
    }

    async update(req, res){
        const { pollId } = req.params

        try {
            const poll = await Poll.findByIdAndUpdate(pollId, req.body, {
                new: true
            })

            return res.json(poll)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async option(req, res){
        const { pollId, optionId} = req.params
        try {
            let poll = await Poll.findOne({_id: pollId});
            let option = poll.choices.id(optionId)
            res.status(200).json(option)
        } catch (error) {
            res.status(500).send()
        }
    }

    async partial(req, res){
        const { pollId } = req.params

        try {
            let poll = await Poll.findOne({ _id: pollId })
            let partial = poll.choices
            res.status(200).json(partial)
        } catch (error) {
            res.status(500).send({})
        }
    }

    async delete(req, res){
        const { pollId } = req.params

        try {
            await Poll.findByIdAndDelete({ _id: pollId})
            res.status(204).send("Votação Deletada")
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async findRemainTime(req, res){
        const { pollId } = req.params

        try {
            const { closeAt } = await Poll.findOne({ _id: pollId})
            const currentDate = moment().format('YYYY/MM/DD HH:MM:SS')
            const diffTime = moment.duration(moment(closeAt).diff(currentDate))

            res.status(200).json({ remainTime: diffTime.asMilliseconds()})
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = new PollController()