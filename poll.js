const{ schema, model } = require('mongoose')

const pollschema = new schema({
    title:{
        type:String,
        require:true,
        trim:true
    },
description:{
    title:String,
    require:true,
    trim:true
},
totalVote: Number,
    Option:{
        type:[{
            name:String,
            vote:Number
        }]
    }
});

const poll = model('poll', pollschema)

module.exports = poll;