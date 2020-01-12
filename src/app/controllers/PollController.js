const Poll = require('../models/Poll')
const redis = require('redis')
const redisClient = redis.createClient()


class PollController {

    async store(req, res){
        const { title } = req.body

        if(!title){
            return res.status(400).json({ success: false, error: 'You should send poll with credentials'})
        }

        try {
            const poll = await Poll.create(req.body)
            return res.status(201).json(poll)
        } catch (error) {
            return res.status(400).json({ success: false, msg: error})
        }
    }

    async index(req, res){
        redisClient.get('indexPoll', async (err, pollsCache) => {
            if (pollsCache) {
                return res.status(200).send(JSON.parse(pollsCache))
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

            return res.status(200).json(poll)

        } catch (error) {
            return res.status(500).json(error)
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
            const poll = await Poll.findOne({ _id: pollId})
            const now = new Date()
            const remainTime = poll.closeAt - now
            res.status(200).json({ remainTime: remainTime})
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = new PollController()