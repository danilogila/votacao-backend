const Poll = require('../models/Poll')

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
        const polls = await Poll.find({})

        try {
            res.json(polls)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async show(req, res){
        const { pollId } = req.params
        
        try {
            const poll = await Poll.findById({ _id: pollId })
            res.status(200).json(poll)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async update(req, res){
        const id = req.params.pollId

        try {
            const poll = await Poll.findByIdAndUpdate(id, req.body, {
                new: true
            })

            return res.json(poll)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    async delete(req, res){
        const _id = req.params.pollId

        try {
            const poll = Poll.findOneAndDelete({ _id })
            res.status(200).json(poll)
        } catch (error) {
            res.status(500).json(error)
        }

    }

    async vote(req, res){
        const { pollId, optionId } = req.params

        console.log(`PollId: ${pollId}, OptionId: ${optionId} `)

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