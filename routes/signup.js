const {Router} = require('express')

const router = Router()

router.use((req, res, next) => {
  const user = req.body

  try {
    req.db.find({email: user.email}).limit(1).toArray((err1, users) => {
      if (err1) return res.status(404).json({error: err1})

      if (users.length > 0) {
        return res.status(404).json({error: 'Email already use'})
      }

      req.db.insertOne(user, (err2) => {
        if (err2) {
          return res.status(404).json({error: 'Insert Error'})
        }

        return res.json({msg: 'Registered'})
      })

      return res.status(404).json({error: 'Insert Error'})
    })
  } catch (err) {
    return res.status(404).json({error: err.message})
  }

  return next()
})

module.exports = router
