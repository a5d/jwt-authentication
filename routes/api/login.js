const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')
const {privateKey} = require('../../config')

const router = (req, res) => {
  const {email, password} = req.body

  bcrypt.hash(password, 10, null, (err, hash) => {
    req.db.find({email, password: hash}).limit(1).toArray((err, users) => {
      if (users.length > 0) {
        const token = jwt.sign(users[0], privateKey)
        res
          .cookie('jwt', token, {expires: new Date(Date.now() + 12900000), path: '/'})
          .json({msg: 'Logged'})
        return
      }

      res.status(400).json({error: 'Not found 1'})
    })
  })
}

module.exports = router
