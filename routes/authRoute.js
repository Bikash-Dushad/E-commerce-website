const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const adminMiddleware = require('../middleware/adminMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

// router.get('/signuppage', authController.signupPage)
router.post('/register', authController.register)
// router.get('/loginpage', authController.loginPage)
router.post('/login', authController.login)

router.get('/testAdmin',authMiddleware, adminMiddleware, authController.idadmin);
module.exports = router;