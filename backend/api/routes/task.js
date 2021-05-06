const express = require('express')
const checkAuth = require('../middleware/auth')
const { getTasks, checkUser, postTask, deleteTask } = require('../services/database')

const taskRouter = express.Router()

taskRouter.get('/get/:username', checkAuth, async (req, res) => {
  const { username } = req.params
  const userExists = await checkUser(username)
  if (userExists === false) {
    res.send('Incorrect username')
  } else {
    const result = await getTasks(username)
    res.send(result)
  }
})

taskRouter.post('/post/:username', checkAuth, async (req, res) => {
  const { username } = req.params
  const { contents } = req.body
  const userExists = await checkUser(username)
  if (userExists === false || contents === "") {
    res.send('Incorrect username or empty field')
  } else {
    await postTask(username, contents)
    res.send('Request received, updated.')
  }
})

taskRouter.delete('/delete/:username', checkAuth, async (req, res) => {
  const { username } = req.params
  const { id } = req.body
  const userExists = await checkUser(username)
  if (userExists === false) {
    res.send('Incorrect username')
  } else {
    await deleteTask(username, id)
    res.send("sucessfully deleted")
  }
})

module.exports = taskRouter
