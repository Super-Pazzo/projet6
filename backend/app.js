// importation de express
const express = require("express");

// crée l'application express
const app = express();
// importation des routes
const saucesRoute = require("./routes/sauceRoute");
const userRoute = require("./routes/userRoute");

const path = require("path");

//------------------------------------------------------
// importation de mongoose
const mongoose = require("mongoose");
mongoose
  .connect("", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
//------------------------------------------------------

//------------------------------------------------------
// insertion des headers permettant de faire communiquer les serveurs
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// intercepte les requêtes qui contiennent un contenttype.json et le met à disposition dans req.body
app.use(express.json());
//------------------------------------------------------
//utilisation des routes
app.use("/images", express.static(path.join(__dirname, "images"))); //ERREUR ICI
app.use("/api/auth", userRoute);
app.use("/api/sauces", saucesRoute);

//------------------------------------------------------

// exportation de l'app pour pouvoir y accéder depuis le server node
module.exports = app;
