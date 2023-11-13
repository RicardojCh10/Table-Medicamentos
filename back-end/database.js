const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "medicamentos_db",
});

connection.connect((error) => {
  if (error) {
    console.error("Error al conectar la base de datos", error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

module.exports = connection;