const passwordValidator = require('password-validator');

// Création d'un schéma pour le password
const passwordSchema = new passwordValidator();

// Propriétés obligatoires du mot de passe
passwordSchema
    .is().min(8) // Minimum 8 caractères
    .is().max(100) // Maximum 100 caractères
    .has().uppercase() // Une majuscule
    .has().lowercase() // Une minuscule
    .has().digits(2) // Minimum 2 chiffres
    .has().not().spaces() // Pas d'espaces

module.exports = passwordSchema;