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