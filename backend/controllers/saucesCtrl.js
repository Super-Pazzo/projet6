// appel du modèle de la sauce
const Sauce = require("../models/sauceModels");
//fs = filesystem : permet d'aller dans les fichiers
const fs = require("fs");

// création d'une sauce
exports.createSauce = (req, res, next) => {
  try {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    Sauce.findOne({ name: sauceObject.name })
      .then((sauce) => {
        if (!sauce) {
          const sauce = new Sauce({
            ...sauceObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get("host")}./images/${
              req.file.filename
            }`,
            likes: 0, // set the likes to 0
            dislikes: 0, // set the dislikes to 0
            usersLiked: [], // set the usersLiked to an empty array
            usersDisliked: [], // set the usersDisliked to an empty array
          });
          sauce.save(); // save the sauce
          res.status(201).json({ message: "La sauce a été enregistrée !" });
        } else {
          res.status(400).json({ message: "La sauce est déjà existante !" });
        }
      })
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Requête non autorisée" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
// liker une sauce
exports.likes = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      let voteResult;
      let userClicker = req.auth.userId;
      let like = sauce.usersLiked;
      let dislike = sauce.usersDisliked;
      let good = like.includes(userClicker);
      let noGood = dislike.includes(userClicker);
      if (good === true) {
        voteResult = 1;
      } else if (noGood === true) {
        voteResult = -1;
      } else {
        voteResult = 0;
      }
    })
    .then(() => res.status(201).json({ message: "Like effectué" }))

    .catch((error) => res.status(401).json({ error }));
  // like = +1
  // like = 0

  // dislike = +1

  // dislike = 0
};
