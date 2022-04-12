//on récupère le model
const Sauce = require('../models/sauce');
const fs = require('fs');
const { userInfo } = require('os');

//Création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Object created' }))
        .catch(error => res.status(400).json({ error }));
};

//Modification
exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
            (sauce) => {
                //Si on ne trouve pas la sauce recherchée
                if (!sauce) {
                    res.status(404).json({
                        error: new Error('No such object')
                    });
                }
                //Si l'ID de l'user ne correspond pas à celui qui possède l'objet
                if (thing.userId !== req.auth.userId) {
                    res.status(400).json({
                        error: new Error('Unauthorized request')
                    });
                }
                const filename = Sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const sauceObject = req.file ? {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : {...req.body };
                    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Object modified' }))
                        .catch(error => res.status(400).json({ error }));
                });
            })
        .catch(error => res.status(500).json({ error }));
};

//Suppression
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
            (sauce) => {
                //Si on ne trouve pas la sauce recherchée
                if (!sauce) {
                    res.status(404).json({
                        error: new Error('No such object')
                    });
                }
                //Si l'ID de l'user ne correspond pas à celui qui possède l'objet
                if (thing.userId !== req.auth.userId) {
                    res.status(400).json({
                        error: new Error('Unauthorized request')
                    });
                }
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Object deleted' }))
                        .catch(error => res.status(400).json({ error }));
                });
            })
        .catch(error => res.status(500).json({ error }));
};

//Récupérer une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

//Récupérer l'ensemble des sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

//Système de like et dislike
exports.rateSauce = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;

    //LIKE
    if (like == 1) {
        Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
                if (!sauce.usersLiked.includes(userId))(
                        Sauce.updateOne({ _id: sauceId }, {
                            $inc: { likes: 1 },
                            $push: { usersLiked: userId }
                        })
                    )
                    .then(() => res.status(200).json({ message: "You liked this!" }))
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));
    }

    //DISLIKE
    if (like === -1) {
        Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
                if (!sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne({ _id: sauceId }, {
                            $inc: { dislikes: 1 },
                            $push: { usersDisliked: userId }
                        })
                        .then(() => res.status(200).json({ message: "You disliked this!" }))
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }

    //ANNULATION LIKE/DISLIKE
    if (like === 0) {
        Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
                if (sauce.usersLiked.includes(userId)) {
                    Sauce.updateOne({ _id: sauceId }, {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: userId }
                        })
                        .then(() => res.status(200).json({ message: "You removed your like!" }))
                        .catch((error) => res.status(400).json({ error }));
                }
                if (sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne({ _id: sauceId }, {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: userId },
                        })
                        .then(() => res.status(200).json({ message: "You removed your dislike!" }))
                        .catch((error) => res.status(400).json({ error }));
                }
            })
    }
};