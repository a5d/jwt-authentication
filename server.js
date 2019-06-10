const express = require('express')
var cors = require('cors')
const debug = require('debug')('http')
const cookieParser = require('cookie-parser')
const {MongoClient} = require('mongodb')

const {mongoUrl} = require('./config')

// Constants
const PORT = 3000
const HOST = '0.0.0.0'

// App
const app = express()
app.use(cors({
  origin: 'http://127.0.0.1:8080',
  credentials: true,
}))

let collection = null

MongoClient.connect(mongoUrl, {
  useNewUrlParser: true,
  reconnectTries: 60,
  // wait 1 second before retrying
  reconnectInterval: 1000
}, (err, client) => {
  if (err) {
    debug('connect error', err)
    return
  }

  collection = client.db('jwt').collection('users')
  app.use(cookieParser())

  app.use((req, res, next) => {
    req.db = collection
    next()
  })

  app.use('/api', require('./routes/api'))
  app.all('*', require('./routes/not-found'))

  app.listen(PORT, HOST)
  debug(`Running on http://${HOST}:${PORT}`)
})


