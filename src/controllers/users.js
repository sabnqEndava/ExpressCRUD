const joi = require('joi')

const Users = require('./../models/users')

const createUserModel = joi.object({
    email: joi.string().required(),
    password: joi.string().required().min(6),
    name: joi.string().required(),
    usernmae: joi.string().optional().allow(''),
    age: joi.number().optional().allow(''),
})

const updateUserModel = joi.object({
    email: joi.string().optional(),
    password: joi.string().optional().min(6),
    name: joi.string().optional(),
    usernmae: joi.string().optional().allow(''),
    age: joi.number().optional().allow(''),
})

/**
 * Search all active users
 *
 * @param {Object} req Http request object
 * @param {Object} res Http response object
 * @returns {Object} Arrray of active users 
 */
const searchAllUsers = (req, res) => {
    try {
        Users.find({ active: true }, (err, users) => {
            if (err) {
                return res.status(400).json({
                    status: 400,
                    response: '',
                    message: err
                })
            }
            if(users.length === 0) {
                return res.status(404).json({
                    status: 404,
                    response: [],
                    message: 'Users not found'
                })
            }
            return res.status(200).json({
                status: 200,
                response: users,
                message: 'Success'
            })
        })

    } catch (error) {
        return res.status(400).json({
            status: 400,
            response: '',
            message: error
        })
    }
}

/**
 * Search a user
 *
 * @param {Object} req Http request object
 * @param {Object} res Http response object
 * @returns {Object} Search user 
 */
const searchUniqueUser = (req, res) => {
    const id = req.params.id
    if(!id) {
        return res.status(422).json({
            status: 422,
            response: '',
            message: 'empty entity'
        })
    }
    try {
        Users.find({ _id: id }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    status: 400,
                    response: '',
                    message: err
                })
            }
            if(user.length === 0) {
                return res.status(404).json({
                    status: 404,
                    response: [],
                    message: 'User not found'
                })
            }
            return res.status(200).json({
                status: 200,
                response: user[0],
                message: 'Success '
            })
        })

    } catch (error) {
        return res.status(400).json({
            status: 400,
            response: '',
            message: error
        })
    }
}

/**
 * Create an user
 *
 * @param {Object} req Http request object
 * @param {Object} res Http response object
 * @returns {Object} New user object 
 */
 const createUser = (req, res) => {
    const newUser = req.body
    const { error } = createUserModel.validate(newUser)
    if(error) {
        res.status(422).json({
            status: 422,
            response: '',
            message: error,
        })
    } 
    try {
        const userDB = new Users(newUser)
        userDB.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    status: 400,
                    response: '',
                    message: err
                })
            }
            return res.status(200).json({
                status: 200,
                response: user,
                message: 'Success'
            })
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            response: '',
            message: error
        })
    }
}

/**
 * Update an user
 *
 * @param {Object} req Http request object
 * @param {Object} res Http response object
 * @returns {Object} Updated user object 
 */
 const updateUser = (req, res) => {
    const id = req.params.id
    if(!id) {
        return res.status(422).json({
            status: 422,
            response: '',
            message: 'empty entity'
        })
    }
    const updateUser = req.body
    const { error } = updateUserModel.validate(updateUser)
    if(error) {
        return res.status(422).json({
            status: 422,
            response: '',
            message: error,
        })
    } 
    try {
        Users.findOneAndUpdate({ _id: id }, updateUser, { new: true },(err, user) => {
            if (err) {
                return res.status(400).json({
                    status: 400,
                    response: '',
                    message: err
                })
            }
            if(!user) {
                return res.status(404).json({
                    status: 404,
                    response: {},
                    message: 'User not found'
                })
            }
            
            return res.status(200).json({
                status: 200,
                response: user,
                message: 'User updated'
            })
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            response: '',
            message: error
        })
    }
}

/**
 * Inactive an user
 *
 * @param {Object} req Http request object
 * @param {Object} res Http response object
 * @returns {Object} Inactive user - empty objecte
 */
 const deleteUser = (req, res) => {
    const id = req.params.id
    if(!id) {
        return res.status(422).json({
            status: 422,
            response: '',
            message: 'empty entity'
        })
    }
    try {
        Users.findOneAndUpdate({ _id: id }, { active: false }, { new: true },(err, user) => {
            if (err) {
                return res.status(400).json({
                    status: 400,
                    response: '',
                    message: err
                })
            }
            if(!user) {
                return res.status(404).json({
                    status: 404,
                    response: {},
                    message: 'User not found'
                })
            }
            
            return res.status(200).json({
                status: 200,
                response: {},
                message: 'User deleted'
            })
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            response: '',
            message: error
        })
    }
}

/**
 * Activate an user
 *
 * @param {Object} req Http request object
 * @param {Object} res Http response object
 * @returns {Object} Active user
 */
 const activateUser = (req, res) => {
    const id = req.params.id
    if(!id) {
        return res.status(422).json({
            status: 422,
            response: '',
            message: 'empty entity'
        })
    }
    try {
        Users.findOneAndUpdate({ _id: id }, { active: true }, { new: true },(err, user) => {
            if (err) {
                return res.status(400).json({
                    status: 400,
                    response: '',
                    message: err
                })
            }
            if(!user) {
                return res.status(404).json({
                    status: 404,
                    response: {},
                    message: 'User not found'
                })
            }
            
            return res.status(200).json({
                status: 200,
                response: {},
                message: 'User activated'
            })
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            response: '',
            message: error
        })
    }
}

module.exports = { searchAllUsers, searchUniqueUser, createUser, updateUser, deleteUser, activateUser }