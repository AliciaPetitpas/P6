//on récupère le modèle du password
const passwordSchema = require('../models/password');

//on vérifie que le mot de passe respecte le schéma
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(400).json({ message: 'Password needs at least 8 characters, no space and minimum 2 digits.' });
    } else {
        next();
    }
};