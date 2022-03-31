//imp express & router
const express = require('express');
const router = express.Router();

//On récuère les middleware et le controllers des sauces
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const SauceCtrl = require('../controllers/sauce');

//On indique les API & middlewares nécessaires selon les controllers
router.post('/', auth, multer, SauceCtrl.createSauce);
router.put('/:id', auth, multer, SauceCtrl.modifySauce);
router.delete('/:id', auth, SauceCtrl.deleteSauce);
router.get('/:id', auth, SauceCtrl.getOneSauce);
router.get('/', auth, SauceCtrl.getAllSauces);
router.post('/:id/like', auth, SauceCtrl.rateSauce);

module.exports = router;