const jwt = require('jsonwebtoken')
const { seed } = require('./../config')

const verifyAuth = (req, res, next) => {
    const token = req.headers.auth
    console.log(token);
    if(!token) {
        return res.status(401).json({
            status: 401,
            response: '',
            message: 'missing auth token'
        })
    }
    try {
        jwt.verify(token, seed)
        return next()
      } catch(err) {
        return res.status(401).json({
            status: 401,
            response: '',
            message: err.message
        })
      }
}

module.exports = { 
    verifyAuth
}