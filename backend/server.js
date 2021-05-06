const http = require('http')
require('dotenv').config()

const app = require('./app')

const port = process.env.PORT

const server = http.createServer(app)

server.listen(port)
