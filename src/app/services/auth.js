const argon2 = require('argon2')
const crypto = require('crypto')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const credentials = require('../../config/auth')

class AuthService{
    async SignUp(email, password, name){
        const salt = crypto.randomBytes(32);
        const passwordHashed = await argon2.hash(password, { salt });

        const UserData = await User.create({
            password: passwordHashed,
            email,
            salt: salt.toString('hex'),
            name
        })

        return {
            user: {
                email: UserData.email,
                name: UserData.name
            }
        }
    }

    generateToken(user){
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
        }

        return jwt.sign({payload, }, credentials.secret, { expiresIn: credentials.ttl })
    }

    async Login(email, password){
        const userData = await User.findOne({ email });
        if(!userData){
            throw new Error('User not Found')
        }
        const isValidPassword = await argon2.verify(userData.password, password)
        
        if(!isValidPassword){
            throw new Error("Incorrect Password")
        }
        console.log("AHhdshdhs")
        return {
            user: {
                email: userData.email,
                name: userData.name
            },
            token: this.generateToken(userData)
        }
    }
}

module.exports = AuthService