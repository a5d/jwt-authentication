const {Router} = require('express')
const jwt = require('jsonwebtoken')
const config = require('dotenv').config()

const {PRIVATE_KEY: privateKey} = config.parsed
const router = Router()

router.use(async (req, res) => {
  try {
    const {jwt: token} = req.cookies
    const user = jwt.verify(token, privateKey)

    await req.db.find({email: user.email, password: user.password}).limit(1).toArray((err, users) => {
      if (users.length > 0) {
        const {_id, email} = users[0]
        res.json({profile: {id: _id, email}})
      } else {
        res.status(400).json({error: 'Error'})
      }
    })
  } catch (err) {
    res.status(400).json({error: err.message})
  }
})

module.exports = router
