// importation de exporess
const express = require("express");
// importation du router
const router = express.Router();
//importation middleware
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
//importation controller
const saucesCtrl = require("../controllers/saucesCtrl");

// récupération des sauces
router.get("/", auth, saucesCtrl.getAllSauce);
// creation des sauces
router.post("/", auth, multer, saucesCtrl.createSauce);
// récupérer une sauce
router.get("/:id", auth, saucesCtrl.getOneSauce);
// modifier une sauce
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
// supprimer une sauce
router.delete("/:id", auth, saucesCtrl.deleteSauce);
// liker des sauces
router.post("/:id/like", auth, saucesCtrl.likes);

// exportation du router
module.exports = router;
