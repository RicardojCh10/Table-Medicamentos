const connection = require("../database");

const obtenerRecetas = (req, res) => {
  connection.query('SELECT * FROM Receta', (error, results) => {
    if (error) {
      console.error("Error al obtener las recetas", error);
      res.status(500).json({
        error: "Error al obtener las recetas",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerRecetaPorId = (req, res) => {
  const id = req.params.id_receta;
  connection.query("SELECT * FROM Receta WHERE id_receta = ?", [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Ocurrió un error al obtener la receta" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "La receta no fue encontrada" });
    } else {
      res.json(results[0]);
    }
  });
};

const crearReceta = (req, res) => {
  const {
    queso,
    id_materiaPrima_id,
    tiempo_cuajado,
    tiempo_maduracion,
    cantidad_sal,
    prensado,
    tiempo_total_elaboracion,
    valoracion_queso,
    imagen,
  } = req.body;

  connection.query(
    "INSERT INTO Receta (queso, id_materiaPrima_id, tiempo_cuajado, tiempo_maduracion, cantidad_sal, prensado, tiempo_total_elaboracion, valoracion_queso, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      queso,
      id_materiaPrima_id,
      tiempo_cuajado,
      tiempo_maduracion,
      cantidad_sal,
      prensado,
      tiempo_total_elaboracion,
      valoracion_queso,
      imagen,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al agregar receta", error);
        res.status(500).json({
          error: "Error al agregar receta",
        });
      } else {
        res.json({ message: "Receta agregada correctamente" });
      }
    }
  );
};

const actualizarRecetaPorId = (req, res) => {
  const id = req.params.id_receta;
  const {
    queso,
    id_materiaPrima_id,
    tiempo_cuajado,
    tiempo_maduracion,
    cantidad_sal,
    prensado,
    tiempo_total_elaboracion,
    valoracion_queso,
    imagen,
  } = req.body;

  connection.query(
    "UPDATE Receta SET queso = ?, id_materiaPrima_id = ?, tiempo_cuajado = ?, tiempo_maduracion = ?, cantidad_sal = ?, prensado = ?, tiempo_total_elaboracion = ?, valoracion_queso = ?, imagen = ? WHERE id_receta = ?",
    [
      queso,
      id_materiaPrima_id,
      tiempo_cuajado,
      tiempo_maduracion,
      cantidad_sal,
      prensado,
      tiempo_total_elaboracion,
      valoracion_queso,
      imagen,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar receta", error);
        res.status(500).json({ error: "Error al actualizar receta" });
      } else {
        res.json({ message: "Receta actualizada correctamente" });
      }
    }
  );
};

const eliminarRecetaPorId = (req, res) => {
  const id = req.params.id_receta;
  connection.query("DELETE FROM Receta WHERE id_receta = ?", [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Ocurrió un error al eliminar la receta" });
    } else {
      res.json({ message: "Receta eliminada correctamente" });
    }
  });
};

module.exports = {
  obtenerRecetas,
  obtenerRecetaPorId,
  crearReceta,
  actualizarRecetaPorId,
  eliminarRecetaPorId,
};
