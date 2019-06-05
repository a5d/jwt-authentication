const {
  MONGODB_URL: mongoUrl,
  PRIVATE_KEY: privateKey
} = require('dotenv').config().parsed

module.exports = {mongoUrl, privateKey}