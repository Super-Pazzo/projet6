const http = require("http");
const app = require("./app");

//renvoi un port valide (numéro ou chaine)
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
//renvoie un port valide
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//recherche les erreurs et les gère puis enregistre sur le server
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//création du serveur
const server = http.createServer(app);
//la fonction gère les erreurs
server.on("error", errorHandler);
//écouteur d'évênements
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
