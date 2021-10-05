const express = require('express');
const router = express.Router();
const loginController = require('./../controllers/login')

router.get('/', function (req, res) {
    const date = new Date()
    res.send(`Endava Workshop Node ${date.getFullYear()}`);

})

// Login user and get auth token for auth middleware
router.post('/login', loginController.loginUser)


module.exports = router;