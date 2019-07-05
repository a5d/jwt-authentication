const {
  MONGODB_URL: mongoUrl,
  PRIVATE_KEY: privateKey,
  SERVER_HOST: serverHost
} = require('dotenv').config().parsed

module.exports = {mongoUrl, privateKey, serverHost}