const passwordValidator = require('password-validator');

// Création d'un schéma pour le password
const passwordSchema = new passwordValidator();

// Propriétés du password
passwordSchema
    .is().min(8) // Mini 8 caractères
    .is().max(100) // Maxi 100 caractères
    .has().uppercase() // Une majuscule
    .has().lowercase() // Une minuscule
    .has().digits(2) // Mini 2 chiffres
    .has().not().spaces() // Pas d'espaces

module.exports = passwordSchema;