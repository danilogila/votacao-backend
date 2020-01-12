const Vote = require('../models/Vote')
const axios = require('axios')

class VoteController{
    async vote(req, res){
        const { pollId, optionId } = req.params
        const captchaSecretKey = "6LefSckUAAAAANAZOZK_64wcKId-NF-7OF9cCMBN"
        let response = null

        if (!req.body.captcha){
            return res.status(400).json({ success: false, msg: "Resolva o Captcha primeiro"})
        }

        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=
        ${captchaSecretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`

        try {
            response = await axios.post(verifyUrl)
        } catch (error) {
            return res.status(400).json({ success: false, msg: error})
        }
        
        if(response.data.success){
            try {
                await Vote.create({ pollId, optionId })
                return res.status(201).json({ success: true, msg: "Voto realizado com sucesso!" })
            } catch (error) {
                return res.status(500).json({ success: false, msg: error})
            }
        }else{
            return res.status(400).json({ success: false, msg: "Erro ao processar o captcha"})
        }
    }

    async total(req, res){
        const { pollId } = req.params
        
        try {
            const votes = await Vote.find({ pollId })
            res.status(200).json({ success: true, votes: votes.length })
        } catch (error) {
            res.status(500).json({ success: false, msg: error})
        }
    }

    async totalCandidate(req, res){
        const { pollId, optionId } = req.params
        
        try {
            const votes = await Vote.find({ pollId, optionId })
            res.status(200).json({ success: true, votes: votes.length })
        } catch (error) {
            res.status(500).json({ success: false, msg: error})
        }
    }
    
    async totalHour(req, res){
        const { pollId } = req.params

        try {
            const votes = await Vote.find({ pollId })
            const votesPerHour = {}

            if (!votes){ 
                return res.status(200).json({ success: true, total: 0})
            }

            let votedDates = [... new Set(votes.map((vote) => {
                return vote.votedDate
            }))]

            initializeVoteDates(votedDates, votesPerHour)
            
            for(let date of votedDates) {
                let voteFiltered = (votes.filter((vote) => {
                    return vote.votedDate === date
                }))
                
                incrementVotesPerHour(voteFiltered, date, votesPerHour)
            }

            return res.status(200).json({ success: true, total: votesPerHour})
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, msg: error })
        }
    }
}

const initializeVoteDates = (votedDates, votesPerHour) => {
    for(const key of votedDates){
        votesPerHour[key]= {}
    }

    for(let date of votedDates){
        let hours = []

        for(let x = 0; x < 24; x++ ){
            hours.push(`${x}`)
        }
        let hoursObject = hours.reduce((key,value) => (key[value] = 0, key), {})
        
        votesPerHour[date] = hoursObject
    }
}

const incrementVotesPerHour = (voteFiltered, date, votesPerHour) => {
    for(let vote of voteFiltered){
        let { votedHour } = vote
        votesPerHour[date][votedHour] += 1
    }
}

module.exports = new VoteController()