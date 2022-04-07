//Limite le nombre de tentatives de connexion
const rateLimit = require("express-rate-limit");

//On bloque les connexions répétitives
const limiter = rateLimit({
    windowMs: 1 * 50 * 1000, //Interval de connexion en MS
    max: 2, //Maximum de connexion
    message: "Too many login attempts, retry in 5 minutes"
});

module.exports = { limiter };