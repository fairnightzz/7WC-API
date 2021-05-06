const { db } = require('../../database/pgAdaptor')

// Returns true or false based on whether user is in database
const checkUser = async (username) => {
  const query = `SELECT EXISTS(SELECT username from users where username=$1)`
  const values = [username]
  return db.one(query, values)
    .then(res => res.exists)
    .catch(err => console.log(err))
}

const getTasks = async (username) => {
  const query = `SELECT t.taskid, t.contents FROM users u JOIN tasks t ON u.id = t.userid WHERE u.username = $1 ORDER BY t.taskid`
  const values = [username]
  return db.manyOrNone(query, values)
    .then(res => res)
    .catch(err => console.log(err))
}

const getID = async (username) => {
  const query = `SELECT id FROM users WHERE username = $1`
  const values = [username]
  return db.one(query, values)
    .then(res => res.id)
    .catch(err => console.log(err))
}

const postTask = async (username, contents) => {
  const query = `INSERT INTO tasks (contents, userid) VALUES($1,$2)`
  const id = await getID(username)
  const values = [contents, id]

  await db.none(query, values)
    .then(res => res)
    .catch(err => console.log(err))
}

const addUser = async (username) => {
  const query = `INSERT INTO users (username) VALUES ($1)`
  const values = [username]

  await db.none(query, values)
    .then(res => res)
    .catch(err => console.log(err))
}

const deleteTask = async (username, id) => {
  const userid = await getID(username)
  const query = `DELETE FROM tasks WHERE taskid=$1 and userid=$2`
  const values = [id, userid]

  await db.none(query, values)
    .then(res => res)
    .catch(err => console.log(err))
}

exports.getTasks = getTasks
exports.checkUser = checkUser
exports.postTask = postTask
exports.addUser = addUser
exports.deleteTask = deleteTask
