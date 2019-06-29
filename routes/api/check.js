const jwt = require('jsonwebtoken')
const config = require('dotenv').config()

const {PRIVATE_KEY: privateKey} = config.parsed


const router = (req, res) => {
  try {
    const {jwt: token} = req.cookies
    const user = jwt.verify(token, privateKey)

    req.db.find({email: user.email, password: user.password}).limit(1).toArray((err, users) => {
      if (users.length > 0) {
        res.json({auth: true})
      } else {
        res.status(400).json({error: 'Error'})
      }
    })
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

module.exports = router
