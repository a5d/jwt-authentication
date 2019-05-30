const {Router} = require('express')

const router = Router()

router.use(async (req, res) => {
  const user = req.body

  try {
    await req.db.find({email: user.email}).limit(1).toArray(async (err1, users) => {
      if (err1) {
        res.status(400).json({error: err1})
      } else if (users.length > 0) {
        res.status(400).json({error: 'Email already use'})
      } else {
        await req.db.insertOne(user, (err2) => {
          if (err2) {
            res.status(400).json({error: 'Insert Error'})
          } else {
            res.json({msg: 'Registered'})
          }
        })
      }
    })
  } catch (err) {
    res.status(400).json({error: err.message})
  }
})

module.exports = router
