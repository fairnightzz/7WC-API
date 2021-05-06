const KEY = process.env.KEY

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-access-token')
    if (token !== KEY) {
      return res.status(401).json({
        message: 'Auth failed'
      })
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    })
  }
  next()
}
