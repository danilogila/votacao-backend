const Vote = require('../models/Vote')
const moment = require('moment')
const axios = require('axios')

class VoteController{
    async vote(req, res){
        const { pollId, optionId } = req.params
        const captchaSecretKey = "6LefSckUAAAAANAZOZK_64wcKId-NF-7OF9cCMBN"
        let response = undefined

        if (!req.body.captcha){
            return res.status(400).json({ success: false, msg: "Resolva o Captcha primeiro"})
        }

        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=
        ${captchaSecretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`

        try {
            response = await axios.post(verifyUrl)
        } catch (error) {
            return error
        }
        
        if(response.data.success === true){
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
            res.status(200).json({ success: true, votes: votes })
        } catch (error) {
            res.status(500).json({ success: false, msg: error})
        }
    }

    async totalCanditate(req, res){
        const { pollId, optionId } = req.params

        try {
            const votes = await Vote.find({ pollId, optionId })
            const total = votes.length
            res.status(200).json({ success: true, votes: total })
        } catch (error) {
            res.status(500).json({ success: false, msg: error})
        }
    }

    async totalHour(req, res){
        const { pollId } = req.params
        const currentDate = moment().format('YYYY/MM/DD')
        const currentHour = moment().format('HH')

        try {
            const votes = await Vote.find({
                pollId, 
                votedDate: currentDate,
                votedHour: currentHour
            })

            res.status(200).json({ success: true, total: votes.length })
        } catch (error) {
            res.status(500).json({ success: false, msg: error })
        }
    }
}

module.exports = new VoteController()