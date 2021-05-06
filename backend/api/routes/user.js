const express = require('express')
const { checkUser, addUser } = require('../services/database')

const userRouter = express.Router()

userRouter.post('/:username', async (req, res) => {
  const { username } = req.params
  const { key } = req.body
  const userExists = await checkUser(username)
  if (userExists === false && key === process.env.createKey) {
    await addUser(username)
    res.send('gud username')
  } else {
    res.send('gud')
  }
})

module.exports = userRouter
