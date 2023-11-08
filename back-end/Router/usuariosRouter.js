const express = require("express");
const usuariosControllers = require("../Controllers/usuariosController"); // Asegúrate de importar el controlador correcto

const router = express.Router();

// Rutas para la tabla MateriaPrima
router.get("/", usuariosControllers.obtenerUsuarios);
router.get("/:id_user", usuariosControllers.obtenerUsuarioId);
router.post("/", usuariosControllers.crearUsuario);
router.delete("/:id_user", usuariosControllers.eliminarUsuarioPorId);


module.exports = router;
