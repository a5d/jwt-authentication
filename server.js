const express = require('express')
const swaggerUi = require('swagger-ui-express')
const jwt = require('jsonwebtoken')
const config = require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const MongoClient = require('mongodb').MongoClient

const signupRouter = require('./routes/signup')

// Constants
const PORT = 3000
const HOST = '0.0.0.0'
const privateKey = config.parsed.PRIVATE_KEY

const mongoClient = new MongoClient(config.parsed.MONGODB_URL, {useNewUrlParser: true})

const swaggerDocument = require('./swagger.json')

// App
const app = express()
let collection = null

mongoClient.connect((err, client) => {
  if (err) return console.log(err)
  collection = client.db('jwt').collection('users')
})

const jsonParser = bodyParser.json()
app.use(cookieParser())

app.use((req, res, next) => {
  req.db = collection
  return next()
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.post('/api/signup', jsonParser, signupRouter)

app.post('/api/login', jsonParser, (req, res) => {
  collection.find(req.body).limit(1).toArray((err, users) => {
    if (users.length > 0) {
      const token = jwt.sign(users[0], privateKey)
      return res
        .cookie('jwt', token, {expires: new Date(Date.now() + 900000), path: '/'})
        .json({msg: 'Logged'})
    }

    return res.status(404).json({error: 'Not found'})
  })
})

app.post('/api/logout', (req, res) => {
  res.cookie('jwt', -1, {expires: new Date(Date.now() - 900000), path: '/'})
  res.json({msg: 'Logout'})
})

app.get('/api/profile', (req, res) => {
  try {
    const token = req.cookies.jwt
    const user = jwt.verify(token, privateKey)

    collection.find({email: user.email, password: user.password}).limit(1).toArray(function (err, users) {
      if (users.length > 0) {
        const userData = users[0]
        res.json({profile: {id: userData._id, email: userData.email}})
      } else {
        res.status(404).json({error: 'Error'})
      }
    })
  } catch (err) {
    res.status(404).json({error: err.message})
  }
})

app.all('*', (req, res) => {
  return res.send(404).send('not found')
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
