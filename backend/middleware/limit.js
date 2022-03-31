//LIMITER NBRE TENTATIVE CONNEXTION
const rateLimit = require("express-rate-limit");

//On bloque les connexions répétitives
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, //INTERVAL CONNEXTION EN MN
    max: 2, //MAX CONNEXTION
    message: "Too many login attempts, retry in 5 minutes"
});

//EXPORTER LMITER
module.exports = { limiter };