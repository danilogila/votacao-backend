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
        const { pollId } = req.params
        console.log(req.params)
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

        // const poll = await Poll.findById({ _id: pollId })
        // poll.submitVote()
        // for (let index = 0; index < poll["choices"].length; index++) {
        //     console.log(index)
            
        // }
        // const { choices } = poll
        // console.log(choices)
        // await Poll.findByIdAndUpdate(pollId, update, {
        //     new: true
        // })

        // Poll.findOneAndUpdate({ _id: pollId }, { $inc: {'post.like': 1 } }, {new: true },function(err, response) {
        //     if (err) {
        //     callback(err);
        //    } else {
        //     callback(response);
        //    }

        camps.findOneAndUpdate(
            {name: "John"}, 
            {$inc: {"campaigns.7.campaign_id": 1}}, 
            {upsert: true},
            function(err, camp) {
                if(err) return "oi"
            });
        console.log(`${pollId}: PollId, ${optionId}: OptionId`)
        res.status(200).json({"msg": "Vote route"})
    }
}

module.exports = new PollController()