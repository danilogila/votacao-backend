const mongoose =  require('mongoose')
const { Schema } = mongoose
const moment = require('moment')

const ChoiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String
    }
})

const PollSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    open: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
    closeAt: {
        type: Date,
    },
    remainTime:{
        type: String
    },
    choices: [ChoiceSchema]
})

PollSchema.pre('save', function(next) {
    let ms = new Date().getTime() + 86400000;
    this.createdAt = new Date()
    this.closeAt = new Date(ms);
    next()
})

module.exports = mongoose.model('Poll', PollSchema)
