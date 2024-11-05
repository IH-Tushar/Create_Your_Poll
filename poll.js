const{ schema, model , Schema } = require('mongoose')

const pollschema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
description:{
    type:String,
    required:true,
    trim:true
},
totalVote: {
    type: Number,
    default: 0
},
    options:{
        type:[{
            name:String,
            vote:Number
        }]
    }
});

const poll = model('poll', pollschema)

module.exports = poll;
