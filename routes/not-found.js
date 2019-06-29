const {Router} = require('express')

const router = Router()

router.use((req, res) => {
  res.status(404).send('not found')
})

module.exports = router
