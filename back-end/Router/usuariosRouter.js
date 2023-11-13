const express = require("express");
const usuariosControllers = require("../Controllers/usuariosController");

const router = express.Router();

// Rutas para la tabla Usuarios
router.get("/", usuariosControllers.obtenerUsuarios);
router.get("/:id_usuario", usuariosControllers.obtenerUsuarioId);
router.post("/", usuariosControllers.crearUsuario);
router.delete("/:id_usuario", usuariosControllers.eliminarUsuarioPorId);
// Agregar rutas adicionales según tus necesidades

module.exports = router;