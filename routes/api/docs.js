const {Router} = require('express')
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('../../swagger.json')

const router = Router()

router.use(swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = router
