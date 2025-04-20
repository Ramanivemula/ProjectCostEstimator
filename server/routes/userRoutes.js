const express = require('express');
const router = express.Router();
const { RegisterUser, LoginUser } = require('../controllers/userController');

router.post('/register',RegisterUser);
router.post('/login',LoginUser);

module.exports = router;