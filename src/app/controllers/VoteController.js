const Vote = require('../models/Vote')

class VoteController{
    async vote(req, res){
        const { pollId, optionId } = req.params
        await Vote.create({ pollId, optionId })
        // Devolver percentual de votos no geral
        try {
            await Vote.create({ pollId, optionId })
            res.status(200).json({ msg: "Voto realizado com sucesso!" })
        } catch (error) {
            res.status(500).json({ msg: error})
        }
    }

    async total(req, res){
        const { pollId } = req.params
        
        try {
            const votes = await Vote.find({ pollId })
            const total = votes.length
            res.status(200).json({ votes: total })
        } catch (error) {
            res.status(500).json({ msg: error})
        }
    }

    async totalHour(req, res){
        const { pollId } = req.params
        try {
            const votes = await Vote.find({ pollId })
            
            res.send("ok")
        } catch (error) {
            
        }
    }
}

module.exports = new VoteController()