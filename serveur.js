const express = require('express');
const app = express();
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const path = require('path');


app.get("/", (req,res) =>{
    res.sendFile(`${__dirname}/public/index.html`)
})

// Permet d'avoir le CSS sur le serveur
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));

io.on("connection", (socket) => {
    console.log("Un utilisateur vient de se connecter.")

    socket.on("disconnect", () => {
        console.log("Un utilisateur vient de se déconnecter.")
    })

    socket.on("play_a_case", (currentPlayer, index) => {
        console.log("Joueur: " + currentPlayer);
        console.log("Index: " + index)
        io.emit("play_a_case", currentPlayer, index);
    });
})

server.listen(3000, () => {
    console.log("Ecoute sur le port 3000")
})