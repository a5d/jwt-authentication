const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')
const {privateKey} = require('../../config')

const router = (req, res) => {
  const {email, password} = req.body

  bcrypt.hash(password, 'test', null, (err, hash) => {
    if (err) {
      res.status(400).json({error: err})
      return
    }

    req.db.find({email, password: hash}).limit(1).toArray((err, users) => {
      if (err) {
        res.status(400).json({error: err})
        return
      }

      if (users.length > 0) {
        const token = jwt.sign(users[0], privateKey)
        res
          .cookie('jwt', token, {expires: new Date(Date.now() + 12900000), path: '/'})
          .json({msg: 'Logged'})
      } else {
        res.status(400).json({error: 'Not found user with this email'})
      }
    })
  })
}

module.exports = router
