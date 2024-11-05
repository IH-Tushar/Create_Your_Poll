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

exports.viewPollPostController = async (req,res,next) => {
    let id = req.params.id
    console.log(req.body)
    
    
    try {
        let poll = await Poll.findById(id)
        res.render('viewPoll', {poll})
    }
    catch (e) {
        console.log(e);
        
    }
}