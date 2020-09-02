const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/',(req,res) => {
    res.send('hello from home ')
})

const uri = process.env.DB_URI
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
const connection = mongoose.connection
connection.once('open', ()=> {
    console.log('MongoDB connection established')
})

app.use('/exercises', exercisesRouter)
app.use('/users',usersRouter)

app.listen(port, () => {
    console.log(`Express server running on port: ${port}`)
})