const mongoose =  require('mongoose')
const { Schema } = mongoose
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
    options: [
        {   
            optionId: {
                type: mongoose.Schema.ObjectId, 
                auto: true 
            },
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

// PollSchema.methods = {
//     vote(pollId, optionId){
//         // return bcrypt.compare(password, this.password)
//         console.log(`PollId: ${pollId} OptionId: ${optionId}`)
//         console.log(this)
//     }
// }

PollSchema.methods.submitVote = function(pollId, optionId) {
    var increment = {
        $inc: {
            'choices.$.votes': 1
        }
    };
    var query = {
        '_id': pollId,
        'choices._id': optionId,
    };
    console.log("ahhhhh")
    let teste = this.model('Poll').update(query, increment);
    console.log(teste)
    return this.model('Poll').update(query, increment);
};

module.exports = mongoose.model('Poll', PollSchema)
