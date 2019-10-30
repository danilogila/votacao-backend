const mongoose =  require('mongoose')

const PollSchema = new mongoose.Schema({
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
    choices: [
        {
            value: {
                type: String,
                required: true
            },
            votes: {
                type: Number,
                default: 0
            }
        }
    ]
})

module.exports = mongoose.model('Poll', PollSchema)
