const express = require('express')

const debug = require('debug')('http')
const cookieParser = require('cookie-parser')
const {MongoClient} = require('mongodb')

const apiRoute = require('./routes/api')
const notFoundRoute = require('./routes/not-found')

const {mongoUrl} = require('./config')

const PORT = 3000
const HOST = '0.0.0.0'

const app = express()

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

  app.use('/api', apiRoute)
  app.all('*', notFoundRoute)

  app.listen(PORT, HOST)
  debug(`Running on http://${HOST}:${PORT}`)
}).catch(console.error)


