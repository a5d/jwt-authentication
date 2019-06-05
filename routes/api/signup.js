const delayAction = () => {
  console.log('Delay start')
  const now = new Date().getTime();
  while(new Date().getTime() < now + 60000){ /* do nothing */ }
  console.log('Delay end')
}

const router = (req, res) => {
  const user = req.body

  try {
    req.db.find({email: user.email}).limit(1).toArray(async (err1, users) => {

      setTimeout(delayAction, 1000)

      if (err1) {
        res.status(400).json({error: err1})
      } else if (users.length > 0) {
        res.status(400).json({error: 'Email already use'})
      } else {
        req.db.insertOne(user, (err2) => {
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
}

module.exports = router
