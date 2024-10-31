exports.createPollGetcontroller = (req,res,next) => {
    res.render('create');
}

exports.createPollPostcontroller = (req,res,next) => {
    console.log(req.body)
    res.render('create');
}