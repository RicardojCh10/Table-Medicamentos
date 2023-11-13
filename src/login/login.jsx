import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {RiEyeLine, RiEyeOffLine} from "react-icons/ri";

function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () =>{
    setShowPassword(!showPassword)

  }

  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    email: '',
    contrasena: '',
    autenticado: false,
    user: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const status = localStorage.getItem('Status');
    const email = localStorage.getItem('email');
    const user = localStorage.getItem('user')
    if (status === 'true') {
      setDatos({ ...datos, autenticado: true, email, });
    }
  }, []);

  useEffect(() => {
    console.log(datos.autenticado); 
    localStorage.setItem('email', datos.email);
    localStorage.setItem('Status', datos.autenticado);
    localStorage.setItem('user', datos.user)
  }, [datos.autenticado, datos.email, datos.user]);

  const handleLogin = (e) => {

    e.preventDefault();

        // Validation
        if (!datos.email.trim() || !datos.contrasena.trim()) {
          setError('Por favor, complete todos los campos.');
          return;
        }

    axios
      .post('http://localhost:8082/login', datos)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log(respuesta.data[0].id)
          setDatos({ ...datos, autenticado: true, user:respuesta.data[0].id });
          
          console.log('Bien del front')
        } else {
          setError('Credenciales incorrectas, inténtalo de nuevo');
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión: ' + error);
        setError('Credenciales incorrectas.');
      });
  };

  const cerrarSesion = () => {
    localStorage.clear();
    setDatos({ ...datos, autenticado: false });
  };

  if (datos.autenticado) {
    navigate('/medicationTable');
    return null;
  }




  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
      <h2>Inico de Sesión</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"> <strong>Email:</strong> </label>
            <input type="email" placeholder="Ingrese Correo Electrónico" name="email" 
            onChange={handleInput} className="form-control rounded-0"></input>
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Contraseña:</strong></label>
            <input type="password" placeholder="Ingrese la Contraseña" name="password"
            onChange={handleInput} className="form-control rounded-0"></input>
              {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
        </main>
      </form>
    ) : (
      navigate('/')
    )
  );
}

export default Login;