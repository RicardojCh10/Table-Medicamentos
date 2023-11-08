import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiURL = "http://localhost:4001/usuarios"; // URL de la API en desarrollo

  const handleLogin = () => {
    if (email && password) {
      axios
        .post(`${apiURL}`, {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log("Usuario autenticado");
          // Aquí puedes manejar la respuesta del servidor, por ejemplo, almacenar un token de autenticación.
        })
        .catch((error) => {
          console.error("Correo y/o contraseña incorrectos");
        });
    } else {
      console.error("Por favor, ingresa correo y contraseña");
    }
  };

  const handleRegistration = () => {
    if (email && password) {
      axios
        .post(`${apiURL}/register`, {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log("Usuario Registrado");
          // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de registro exitoso.
        })
        .catch((error) => {
          console.error("Error al registrar usuario");
        });
    } else {
      console.error("Por favor, ingresa correo y contraseña");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Iniciar Sesión</h1>
      <div className="form-group">
        <label>Correo Electrónico</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary m-2" onClick={handleLogin}>
        Iniciar Sesión
      </button>
      <button className="btn btn-success m-2" onClick={handleRegistration}>
        Regístrate
      </button>
    </div>
  );
};

export default Login;
