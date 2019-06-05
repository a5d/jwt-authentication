const router = async (req, res) => {
  const user = req.body

  try {
    console.log('before await')
    await req.db.find({email: user.email}).limit(1).toArray(async (err1, users) => {
      console.log('in await')

      const now = new Date().getTime();
      while(new Date().getTime() < now + 60000){ /* do nothing */ }

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

    console.log('after await')
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

module.exports = router
