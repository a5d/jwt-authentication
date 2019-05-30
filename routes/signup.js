const {Router} = require('express')

const router = Router()

router.use((req, res, next) => {
  const user = req.body
  console.log('user', user)
  try {
    req.db.find({email: user.email}).limit(1).toArray((err1, users) => {
      console.log('users', users)

      if (err1) res.sendStatus(404).json({error: err1})

      if (users.length > 0) {
        console.log('Test', 'Send')
        res.status(404).json({error: 'Email already use'})
      }

      req.db.insertOne(user, (err2) => {
        if (err2) {
          res.sendStatus(404).json({error: 'Insert Error'})
        }

        res.json({msg: 'Registered'})
      })

      next()
    })
  } catch (err) {
    res.status(404).json({error: err.message})
  }

  next()
})

module.exports = router
