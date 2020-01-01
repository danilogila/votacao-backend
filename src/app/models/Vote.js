const mongoose =  require('mongoose')
const moment = require('moment')
const { Schema } = mongoose

const voteSchema = new Schema({
    pollId: {
        type: String
    },
    optionId:{
        type: String
    },
    votedDate: {
        type: String
    },
    votedHour: {
        type: String
    }
})

voteSchema.pre('save', function(next) {
    const currentDate = moment().format('YYYY/MM/DD')
    const currentHour = moment().format('HH')

    this.votedDate = currentDate
    this.votedHour = currentHour
    next()
})

module.exports = mongoose.model('Vote', voteSchema)