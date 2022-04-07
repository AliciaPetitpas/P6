//on récupère le model
const User = require('../models/user');

//Bcrypt et Jsonwebtoken pour sécuriser les utilisateurs
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: rateLimit } = require('express-rate-limit');
require('dotenv').config();

//Création d'un compte, en hashage et salage du password
exports.signup = (req, res, next) => {
    bcrypt.genSalt(parseInt(process.env.SALT))
        .then(salt => {
            bcrypt.hash(req.body.password, salt)
                .then(hash => {
                    console.log(hash);
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'User created' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Connexion à un compte
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Wrong password' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        //Création d'un token de connexion
                        token: jwt.sign({ userId: user._id },
                            process.env.TOKEN_USER, { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};