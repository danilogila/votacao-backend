const mongoose =  require('mongoose')
const { Schema } = mongoose

const voteSchema = new Schema({
    pollId: {
        type: String
    },
    optionId:{
        type: String
    },
    votedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Vote', voteSchema)