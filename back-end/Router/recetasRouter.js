const express = require("express");
const recetasControllers = require("../Controllers/recetasController"); // Asegúrate de importar el controlador correcto

const router = express.Router();

// Rutas para la tabla Recetas
router.get("/", recetasControllers.obtenerRecetas);
router.get("/:id_receta", recetasControllers.obtenerRecetaPorId);
router.post("/", recetasControllers.crearReceta);
router.delete("/:id_receta", recetasControllers.eliminarRecetaPorId);
router.put("/:id_receta", recetasControllers.actualizarRecetaPorId);

module.exports = router;
