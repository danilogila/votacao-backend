const User = require('../models/User')

class UserController{
    async store(req, res){
        const { email } = req.body

        if (await User.findOne({ email })) {
            return res.status(400).json({error: 'User already exists'})
        }

        const user = await User.create(req.body)

        return res.json(user)
    }

    async index(req, res){
        try {
            const users = await User.find({})
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({"error": "Failed to connect to server"})
        }
    }
}

module.exports = new UserController()