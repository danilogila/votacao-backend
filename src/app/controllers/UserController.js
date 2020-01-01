const User = require('../models/User')
const AuthService = require('../services/auth')
const isAuth = require('../middlewares/auth')
const attachCurrentUser = require('../middlewares/attachUser')

class UserController{
    async store(req, res){
        const { email } = req.body

        if (await User.findOne({ email })) {
            return res.status(400).json({error: 'User already exists'})
        }

        const user = await User.create(req.body)

        return res.status(201).json(user)
    }

    async index(req, res){
        try {
            const users = await User.find({})
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({"error": "Failed to connect to server"})
        }
    }

    async login(req, res) {
        const email = req.body.user.email;
        const password = req.body.user.password;
        try {
            const authServiceInstance = new AuthService();
            const { user, token } = await authServiceInstance.Login(email, password);
          return res.status(200).json({ user, token }).end();
        } catch(e) {
          return res.json(e).status(500).end();
        }
    }

    async signup(req, res) {
        try {
          const { name, email, password } = req.body.user;
          const authServiceInstance = new AuthService();
          const { user, token } = await authServiceInstance.SignUp(email, password, name);
          return res.json({ user, token }).status(200).end();
        } catch (e) {
          return res.json(e).status(500).end();
        }
      }
}

module.exports = new UserController()