const jwt = require('jsonwebtoken')
const config = require('dotenv').config()

const {PRIVATE_KEY: privateKey} = config.parsed

const router = async (req, res) => {
  await req.db.find(req.body).limit(1).toArray((err, users) => {
    if (users.length > 0) {
      const token = jwt.sign(users[0], privateKey)
      res
        .cookie('jwt', token, {expires: new Date(Date.now() + 900000), path: '/'})
        .json({msg: 'Logged'})
      return
    }

    res.status(400).json({error: 'Not found 1'})
  })
}

module.exports = router
