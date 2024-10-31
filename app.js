const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const pollController = require('./pollController');

const app = express()

app.set('view engine', 'ejs');

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res)=> {
    res.render('home');
})

app.get('/create', pollController.createPollGetcontroller);
app.post('/create', pollController.createPollPostcontroller);

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then( () => {
        app.listen(4545, () => {
            console.log('listening on port 4545')
        })
    })
    .catch((err) => {
        console.log(err)
    })