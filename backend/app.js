const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./config')
const port = process.env.PORT || 5000 

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const corsOptions = {
    origin: [
        "http://localhost:3000",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
};

app.use(morgan('dev'))

app.set('jwt-secret', config.secret)

app.get('/', (req, res) => {
    res.send('Home Page')
})


app.use('/api',cors(corsOptions), require('./routes/api'))

app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})


mongoose.connect(config.mongodbUri)

const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
    require("./lib/agenda.js");
})