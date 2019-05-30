const express = require('express')
const config = require('dotenv').config()
const debug = require('debug')('http')
const cookieParser = require('cookie-parser')
const {MongoClient} = require('mongodb')

// Constants
const PORT = 3000
const HOST = '0.0.0.0'
const {MONGODB_URL: mongoUrl} = config.parsed
const mongoClient = new MongoClient(mongoUrl, {useNewUrlParser: true})

// App
const app = express()
let collection = null

mongoClient.connect((err, client) => {
  if (err) debug('connect error', err)
  collection = client.db('jwt').collection('users')
})

app.use(cookieParser())

app.use((req, res, next) => {
  req.db = collection
  next()
})

app.use('/api', require('./routes/api'))
app.all('*', require('./routes/not-found'))

app.listen(PORT, HOST)
debug(`Running on http://${HOST}:${PORT}`)
