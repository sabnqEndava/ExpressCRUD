const express = require('express');
const router = express.Router();
const userController = require('./../controllers/users')
const { verifyAuth } = require('./../middlewares/auth')
// Users 
router.get('/user', userController.searchAllUsers)

router.get('/user/:id', userController.searchUniqueUser)

router.post('/user', userController.createUser)

router.put('/user/:id', userController.updateUser)

router.delete('/user/:id', userController.deleteUser)

// Protected route < user login to get the token and pass into headers request as auth>
router.post('/user/activate/:id', verifyAuth ,userController.activateUser)

module.exports = router;