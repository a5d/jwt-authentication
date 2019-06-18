const bcrypt = require('bcrypt-nodejs');

const router = (req, res) => {
  const {email, password} = req.body

  try {
    req.db.find({email}).limit(1).toArray(async (err1, users) => {
      if (err1) {
        res.status(400).json({error: err1})
      } else if (users.length > 0) {
        res.status(400).json({error: 'Email already use'})
      } else {
        bcrypt.hash(password, 10, null,  (err, hash) => {
          req.db.insertOne({email, password: hash}, (err2) => {
            if (err2) {
              res.status(400).json({error: 'Insert Error'})
            } else {
              res.json({msg: 'Registered'})
            }
          })
        });
      }
    })

  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

module.exports = router
