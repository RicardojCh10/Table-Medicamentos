const connection = require("../database");

const obtenerUsuarios = (req, res) => {
  connection.query("SELECT * FROM Usuarios", (error, results) => {
    if (error) {
      console.error("Error al obtener Usuarios", error);
      return res.status(500).json({
        error: "No se encontraron los usuarios",
      });
    }
    return res.json(results);
  });
};

const obtenerUsuarioPorId = (req, res) => {
  const id = req.params.id_usuario;
  connection.query('SELECT * FROM Usuarios WHERE id = ?', id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Ocurrió un error al obtener usuario por Id" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "El usuario no fue encontrado" });
    }
    return res.json(results[0]);
  });
};

const crearUsuario = (req, res) => {
  const { nombre, contrasena, correo } = req.body;

  connection.query(
    "INSERT INTO Usuarios (nombre, contrasena, correo) VALUES (?, ?, ?)",
    [nombre, contrasena, correo],
    (error, results) => {
      if (error) {
        console.error("Error al agregar usuario", error);
        return res.status(500).json({
          error: "Error al agregar usuario",
        });
      }
      return res.json({ message: "Usuario agregado correctamente" });
    }
  );
};

const eliminarUsuarioPorId = (req, res) => {
  const id = req.params.id_usuario;
  connection.query("DELETE FROM Usuarios WHERE id = ?", id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Ocurrió un error al eliminar usuario por Id" });
    }
    return res.json({ message: "Usuario eliminado correctamente" });
  });
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  eliminarUsuarioPorId,
};
