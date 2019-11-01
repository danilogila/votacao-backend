const mongoose =  require('mongoose')
const { Schema } = mongoose

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
        type: Date,
        default: Date.now
    },
    choices: [ChoiceSchema]
})

module.exports = mongoose.model('Poll', PollSchema)
