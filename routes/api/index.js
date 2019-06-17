const {Router} = require('express')
const jsonParser = require('body-parser').json()

const router = Router()

router.use('/docs', require('./docs'))
router.post('/signup', jsonParser, require('./signup'))
router.post('/login', jsonParser, require('./login'))
router.post('/logout', require('./logout'))
router.get('/profile', require('./profile'))
router.get('/check', require('./check'))

module.exports = router