const joi = require('joi')
const Users = require('./../models/users')
const { seed } = require('./../config')
const jwt = require('jsonwebtoken')

const LoginController = {}

const LoginModel = joi.object({
    email: joi.string().required(),
    password: joi.string().required().min(6)
})

/**
 * Update an user
 *
 * @param {Object} req Http request object
 * @param {Object} res Http response object
 * @returns {Object} User logged in
 */

LoginController.loginUser = (req, res) => {
    const loginUser = req.body
    try {
        const { error } = LoginModel.validate(loginUser)
        if(error) {
            res.status(422).json({
                status: 422,
                response: '',
                message: error,
            })
        }
        Users.find({ email: loginUser.email, password: loginUser.password, active: true }, (err, user) => {
            if(err) {
                return res.status(400).json({
                    status: 400,
                    response: '',
                    message: err
                })
            }
            if(user.length === 0) {
                return res.status(404).json({
                    status: 404,
                    response: '',
                    message: 'invalid credentials'
                })
            }
            const date = new Date()
            const auth = jwt.sign({ timestapm: date.getTime() }, seed )       
            return res.status(200).json({
                status: 200,
                response: {
                    user: user[0],
                    auth
                },
                message: 'logged in',
            })
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            response: '',
            message: error,
        })
    }
}

module.exports = LoginController