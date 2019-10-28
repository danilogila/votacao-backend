const Poll = require('../models/Poll')

class PollController {
    async store(req, res){
        const { email } = req.body

        if (await Poll.findOne({ email })) {
            return res.status(400).json({ error: 'Poll already exists'})
        }

        const poll = await Poll.create(req.body)

        return res.json(poll)
    }
}

module.exports = new PollController()