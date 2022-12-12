const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/userCtrl");

// intercepte les requetes post d'inscription
router.post("/signup", userCtrl.signup);

// intercepte les requetes post d'authentification
router.post("/login", userCtrl.login);

// on exporte router
module.exports = router;
