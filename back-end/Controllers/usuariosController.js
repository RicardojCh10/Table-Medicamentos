const connection = require("../database");

const obtenerUsuarios = (req, res) => {
  connection.query("SELECT * FROM Usuarios", (error, results) => {
    if (error) {
      console.error("Error al obtener Usuarios", error);
      res.status(500).json({
        error: "No se encontraron los usuarios",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerUsuarioId = (req, res) => {
  const id = req.params.id_usuario;
  connection.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Ocurrió un error al obtener usuario por Id" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "El usuario no fue encontrado" });
    } else {
      res.json(results[0]);
    }
  });
};

const crearUsuario = (req, res) => {
  const { nombre_usuario, contrasena, correo } = req.body;

  connection.query(
    "INSERT INTO Usuarios (nombre_usuario, contrasena, correo) VALUES (?, ?, ?)",
    [nombre_usuario, contrasena, correo],
    (error, results) => {
      if (error) {
        console.error("Error al agregar usuario", error);
        res.status(500).json({
          error: "Error al agregar usuario",
        });
      } else {
        res.json({ message: "Usuario agregado correctamente" });
      }
    }
  );
};

const eliminarUsuarioPorId = (req, res) => {
  const id = req.params.id_usuario;
  connection.query("DELETE FROM Usuarios WHERE id_usuario = ?", [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Ocurrió un error al eliminar usuario por Id" });
    } else {
      res.json({ message: "Usuario eliminado correctamente" });
    }
  });
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioId,
  crearUsuario,
  eliminarUsuarioPorId,
};
