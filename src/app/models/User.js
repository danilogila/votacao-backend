const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    salt: {
      type: String,
      default: "123456",
    },
    role: {
      type: String,
      default: 'user', // Possible values: user | admin 
    }

})

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.password, 10000, 512, 'sha512').toString('hex');
  };
  
  UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
  };
  
  UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      email: this.email,
      id: this._id,
      exp: authConfig.ttl,
    }, authConfig.secret);
  }
  
  UserSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      email: this.email,
      token: this.generateJWT(),
    };
  };

// UserSchema.pre('save', async function (next){
//     if(!this.isModified('password')){
//         return next()
//     }

//     this.password = await bcrypt.hash(this.password, 8)
// })

// UserSchema.methods = {
//     compareHash(password){
//         return bcrypt.compare(password, this.password)
//     }
// }

// UserSchema.statics = {
//     generateToken({ id }){
//         return jwt.sign({ id }, authConfig.secret, {
//             expiresIn: authConfig.ttl
//         })
//     }
// }

// UserSchema.methods.generateJWT = function() {
//     const today = new Date();
//     const expirationDate = new Date(today);
//     expirationDate.setDate(today.getDate() + 60);
  
//     return jwt.sign({
//       email: this.email,
//       id: this._id,
//       exp: parseInt(expirationDate.getTime() / 1000, 10),
//     }, 'secret');
//   }

// UsersSchema.methods.toAuthJSON = function() {
//     return {
//       _id: this._id,
//       email: this.email,
//       token: this.generateJWT(),
//     };
//   };

module.exports = mongoose.model('User', UserSchema)