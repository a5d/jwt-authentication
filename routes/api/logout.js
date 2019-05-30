const {Router} = require('express')

const router = Router()

router.use((req, res) => {
  res.cookie('jwt', -1, {expires: new Date(Date.now() - 900000), path: '/'})
  res.json({msg: 'Logout'})
})

module.exports = router
