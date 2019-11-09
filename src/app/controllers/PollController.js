const Poll = require('../models/Poll')
const redis = require('redis')
const redisClient = redis.createClient()

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

        return res.json(poll)
    }

    async index(req, res){
        try {
            polls = await Poll.find({})
            return res.status(200).json(polls)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async show(req, res){
        const { pollId } = req.params

        redisClient.get('getPoll', async (err, reply) => {
            if (reply) {
                console.log("Redis Cache!")
                return res.status(200).send(JSON.parse(reply))
            }
            console.log("Mongo Data!")
            let poll

            try {
                poll = await Poll.findById({ _id: pollId })
            } catch (error) {
                res.status(500).json(error)
            }

            redisClient.set('getPoll', JSON.stringify(poll))
            redisClient.expire('getPoll', 10)
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

    async delete(req, res){
        const { pollId } = req.params
        try {
            const poll = await Poll.findOneAndDelete({ _id: pollId })
            return res.status(200).json(poll)
        } catch (error) {
            return res.status(500).json(error)
        }

    }

    async vote(req, res){
        const { pollId, optionId } = req.params

        try {
            await Poll.update({_id: pollId, 
                'choices._id': optionId}, {
                    $inc:{'choices.$.votes':1}
                })

            return res.status(200).json({"msg": "Voto realizado com sucesso"})

        } catch (error) {
            res.status(500).json({"msg": "Erro ao realizar a voto"})
        }

    }
}

module.exports = new PollController()