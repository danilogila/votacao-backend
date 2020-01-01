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
        unique: true,
        lowercase: true
    },
    open: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
    },
    closeAt: {
        type: String,
    },
    remainTime:{
        type: String
    },
    choices: [ChoiceSchema]
})

PollSchema.pre('save', function(next) {
    const currentDate = moment().format('YYYY/MM/DD HH:MM:SS')
    this.createdAt = currentDate

    const closeDate = moment(currentDate).add(1, "days")
    this.closeAt = closeDate.format('YYYY/MM/DD HH:MM:SS')

    next()
})

module.exports = mongoose.model('Poll', PollSchema)
