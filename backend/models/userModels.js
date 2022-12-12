// importation de mongoose
const mongoose = require("mongoose");

// importation unique-validator après installation
const uniqueValidator = require("mongoose-unique-validator");

// création d'un schéma d'utilisateur
const userModels = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Application de unique-validator sur le shema
userModels.plugin(uniqueValidator);
// exportation du model
module.exports = mongoose.model("User", userModels);
