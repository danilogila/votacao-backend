const Poll = require('../models/Poll')

class PollController {

    async store(req, res){
        const { title } = req.body

        if (await Poll.findOne({ title })) {
            return res.status(400).json({ error: 'Poll already exists'})
        }

        const poll = await Poll.create(req.body)

        return res.json(poll)
    }

    async index(req, res){
        const polls = await Poll.find({})

        try {
            res.json(polls)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async show(req, res){
        const title = req.params.id

        console.log(title)

        const poll = await Poll.findById({ title })

        return res.json(poll)
    }

    async update(req, res){
        const { id } = req.params

        const poll = await Poll.findByIdAndUpdate(id, req.body, {
            new: true
        })

        return res.json(poll)
    }

    async delete(req, res){
        const { id } = req.params

        try {
            const poll = Poll.findOneAndDelete({ id })
            res.status(200).json(poll)
        } catch (error) {
            res.status(500).json(error)
        }

    }
}

module.exports = new PollController()