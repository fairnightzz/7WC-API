'use strict'

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

const taskRoutes = require('./api/routes/task')
const userRoutes = require('./api/routes/user')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/task', taskRoutes)
app.use('/user', userRoutes)

module.exports = app
