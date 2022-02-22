const express = require('express')
const login = require('./controllers/login')
const { signup } = require('./controllers/signup')
const verifyEmail = require('./controllers/verifyEmail')
const router = express.Router()

router.post('/signup', signup)
router.post('/verify-email', verifyEmail)
router.post('/login', login)

module.exports = router