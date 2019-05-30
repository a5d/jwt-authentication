const {Router} = require('express')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const signupRoute = require('./api/signup')
const loginRoute = require('./api/login')
const docsRoute = require('./api/docs')
const logoutRoute = require('./api/logout')
const profileRoute = require('./api/profile')

const router = Router()

router.use('/docs', docsRoute)
router.post('/signup', jsonParser, signupRoute)
router.post('/login', jsonParser, loginRoute)
router.post('/logout', logoutRoute)
router.get('/profile', profileRoute)

module.exports = router