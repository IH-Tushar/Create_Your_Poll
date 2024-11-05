const Poll = require('./poll')

exports.createPollGetcontroller = (req,res,next) => {
    res.render('create');
}

exports.createPollPostcontroller = async (req,res,next) => {
    console.log(req.body);
    
    let { title,description,options } = req.body

    options = options.map( opt => {
        return {
            name: opt,
            vote: 0
        }
    })
        console.log(options);
        
    let poll = new Poll(
        {
           title,
           description,
           options
        }
    )    
    try {
        await poll.save()
        res.redirect('/polls')
    } catch (e) {
        console.log(e);
        
    }

}

exports.getAllPolls = async (req,res,next) => {
    try {
        const polls = await Poll.find()
        res.render('polls', {polls})
    } catch (e) {
        console.log(e);
        
    }
}
exports.viewPollGetController = async (req,res,next) => {
    let id = req.params.id
    try {
        let poll = await Poll.findById(id)
        res.render('viewPoll', {poll})
    }   
    catch (e) {
        console.log(e);    
    }
}

// exports.viewPollPostController = async (req,res,next) => {
//     let id = req.params.id
//     let optionId = req.body.option
    
    
//     try {
//         let poll = await Poll.findById(id)
//         let options = [...poll.options]

//         let index = options.findIndex(opt => opt.id == optionId)
//         options[index].vote = options[index].vote + 1

//         let totalVote = poll.totalVote + 1
        
//         await poll.findOneAndUpdate(
//             {_id: poll._id},
//             {$set: {options, totalVote}}
//         )
        
//         res.redirect('/polls/' + id)
//     }
//     catch (e) {
//         console.log(e);
        
//     }
// }

exports.viewPollPostController = async (req, res, next) => {
    let id = req.params.id;
    let optionId = req.body.option;
    
    try {
        // Find the poll document by ID
        let poll = await Poll.findById(id);
        
        if (!poll) {
            return res.status(404).send("Poll not found");
        }
        
        // Update the vote count for the selected option
        const optionIndex = poll.options.findIndex(opt => opt._id.toString() === optionId);
        if (optionIndex === -1) {
            return res.status(404).send("Option not found");
        }
        
        poll.options[optionIndex].vote += 1;
        poll.totalVote += 1;

        // Use Poll model to update the document
        await Poll.findOneAndUpdate(
            { _id: id },
            { $set: { options: poll.options, totalVote: poll.totalVote } }
        );
        
        res.redirect(`/polls/${id}`);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error");
    }
};
