// !dependencias
const express = require("express");
const cors = require("cors");

const recetasRouter = require("./Router/recetasRouter")
const usuariosRouter = require("./Router/usuariosRouter")


/* app va a tener todos los atributos y metodos de 
express */

const app = express();

app.use(cors());

app.use(express.json());

// Ruta al Router
app.use("/recetas", recetasRouter);
app.use("/usuarios",usuariosRouter);


app.get("/", (req, res) => {
  res.send(`<h1>Hola</h1>`);
});

app.listen(4001, () => {
  console.log("API escuchando por el puerto 4001");
});