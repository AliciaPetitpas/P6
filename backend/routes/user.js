//imp express & router
const express = require('express');
const router = express.Router();

//on récupère les controllers et les middlewares
const userCtrl = require('../controllers/user');
const limitMax = require('../middleware/limit');
const checkPassword = require('../middleware/checkPassword');
const checkEmail = require('../middleware/checkEmail');

//On indique les API & middlewares nécessaires selon les controllers
router.post('/signup', checkPassword, checkEmail, userCtrl.signup);
router.post('/login', limitMax.limiter, userCtrl.login);

module.exports = router;