'use strict'

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const MongoClient = require('mongodb').MongoClient

// Constants
const PORT = 3000
const HOST = '0.0.0.0'
const privateKey = 'shhhhh'

const mongoClient = new MongoClient('mongodb://mongodb:27017/', {useNewUrlParser: true})

const swaggerDocument = require('./swagger.json');

mongoClient.connect(function (err, client) {
  if (err) return console.log(err)
  console.log('Connected')
  app.locals.collection = client.db('jwt').collection('users')
})

// App
const app = express()
const jsonParser = bodyParser.json()
app.use(cookieParser())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => { 
  res.send('Test\n');
});

app.post('/api/signup', jsonParser, (req, res) => {
  const collection = req.app.locals.collection
  const user = req.body

  collection.find({email: user.email}).limit(1).toArray(function (err, users) {
    if (users.length > 0) {
      res.end(JSON.stringify({error: 'Email already use'}))
    } else {
      collection.insertOne(user, function (err, result) {
        if (err) {
          res.end(JSON.stringify({error: 'Insert Error'}))
        } else {
          res.end(JSON.stringify({msg: 'Registered'}))
        }
      })
    }
  })
})

app.post('/api/login', jsonParser, (req, res) => {
  const collection = req.app.locals.collection
  collection.find(req.body).limit(1).toArray(function (err, users) {
    if (users.length > 0) {
      console.log('user', users[0])
      const token = jwt.sign(users[0], privateKey)
      res.cookie('jwt', token, {expires: new Date(Date.now() + 900000), path: '/'})
      res.end(JSON.stringify({msg: 'Logged'}))
    } else {
      res.end(JSON.stringify({error: 'Not found'}))
    }
  })
})

app.post('/api/logout', (req, res) => {
  res.cookie('jwt', -1, {expires: new Date(Date.now() - 900000), path: '/'})
  res.end(JSON.stringify({msg: 'Logout'}))
})

app.get('/api/profile', (req, res) => {
  const collection = req.app.locals.collection

  try {
    const token = req.cookies.jwt
    const user = jwt.verify(token, privateKey)

    collection.find({email: user.email, password: user.password}).limit(1).toArray(function (err, users) {
      if (users.length > 0) {
        const userData = users[0]
        res.end(JSON.stringify({profile: JSON.stringify({id: userData._id, email: userData.email})}))
      } else {
        res.end(JSON.stringify({error: 'Error'}))
      }
    })
  } catch (err) {
    res.end(JSON.stringify({error: err}))
  }
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
