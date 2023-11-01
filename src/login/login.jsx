import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      console.log("Usuario autenticado");
    } else {
      console.error("Correo y/o contraseña incorrectos");
    }
  };

  const handleRegistration = () => {
    if (email && password) {
      console.log("Usuario Registrado");
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
