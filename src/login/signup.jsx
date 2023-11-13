import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Singup() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: '',
    contrasena: '',
    contrasenaConfirm: '',
    email: '',
    autenticado: false,
    user: '',
  });

  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation
    if (!datos.nombre.trim() || !datos.email.trim() || !datos.contrasena.trim() || !datos.contrasenaConfirm.trim()) {
      setError('Por favor, complete todos los campos.');
      return; //Si los campos están vacios te manda a completarlos 
    }

    if (datos.contrasena !== datos.contrasenaConfirm) {
      setError('Las contraseñas no coinciden.');
      return; //si contraseña no es igual a la confirmacion de la contraseña manda error 
    }
    axios
      .post('http://localhost:8082/registro', datos)
      .then((respuesta) => {
        if (respuesta.status === 200) { {/* codigo de confirmación 200 */}
          console.log(respuesta.data[0].id);
          setDatos({ ...datos, autenticado: true, user: respuesta.data[0].id });
        } else {
          setError('Credenciales incorrectas, inténtalo de nuevo');
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión: ' + error);
        setError('email ya registrado.');
      });
  };

  useEffect(() => {
    const status = localStorage.getItem('Status');
    const email = localStorage.getItem('email');{/* Se crean las constantes obtenidas de los objetos del local.storage */}
    const user = localStorage.getItem('user');
    if (status === 'true') {
      setDatos({ ...datos, autenticado: true, email });
    }
  }, []);

  useEffect(() => {
    console.log(datos.autenticado);
    localStorage.setItem('email', datos.email);
    localStorage.setItem('Status', datos.autenticado);
    localStorage.setItem('user', datos.user);
  }, [datos.autenticado, datos.email, datos.user]);

  if (datos.autenticado) {
    navigate('/medicationTable');
    return null;
  }

  return (
    <form onSubmit={handleRegister} style={{ backgroundImage: 'url("https://m.media-amazon.com/images/I/51F54yNB4DL._AC_SL1000_.jpg")' }}>
      <h2 className="w-full flex-col text-center text-black text-4xl p-5">Registrarse</h2>
      <main className="h-screen  flex">
        <div className="bg-white rounded-sm p-2 w-[50%] mx-auto h-[90%] border-x-2 border-b-4 border-t flex items-center flex-wrap py-20">
        <div className='flex flex-col items-center justify-center w-full'>
        <label className='text-md w-[50%] p-1.5'>Nombre: </label>
          <input className='border-black border rounded-sm px-2 py-[.5%] w-[50%] '
          type='text'
          placeholder='Maximiliano Lara'

          value={datos.nombre}
          onChange={(e) => { setDatos({ ...datos, nombre: e.target.value }) }}
          />
      </div>



      <div className='flex flex-col items-center justify-center w-full'>
        <label className='text-md w-[50%] p-1.5'>Contraseña:</label>
          <input className='border-black border rounded-sm px-2 py-[.5%] w-[50%] '
          type='password'
          placeholder='********'

          value={datos.contrasena}
          onChange={(e) => { setDatos({ ...datos, contrasena: e.target.value }) }}
          />
      </div>

      <div className='flex flex-col items-center justify-center w-full'>
        <label className='text-md w-[50%] p-1.5'>Confirmar Contraseña:</label>
          <input className='border-black border rounded-sm px-2 py-[.5%] w-[50%] '
          type='password'
          placeholder='********'

          value={datos.contrasenaConfirm}
          onChange={(e) => { setDatos({ ...datos, contrasenaConfirm: e.target.value }) }}
          />
      </div>

      <div className='flex flex-col items-center justify-center w-full'>
        <label className='text-md w-[50%] p-1.5'>email:</label>
          <input className='border-black border rounded-sm px-2 py-[.5%] w-[50%] '
          type='email'
          placeholder='ejemplo@gmail.com'

          value={datos.email}
          onChange={(e) => { setDatos({ ...datos, email: e.target.value }) }}
          />
      </div>

          <div className="text-center justify-center m-5 w-full">
            <button
              type="submit"
              className="bg-black rounded-sm w-[40%] py-2 transition-all duration-300 ease-in-out hover:bg-sky-700 text-white"
            >
              Registrese
            </button>
          </div>

          <div className="w-full flex flex-wrap items-center justify-center">
            <h4>{error && <span className="text-red-500">{error}</span>}</h4>

           

          </div>
        </div>
      </main>
    </form>
  );
}

export default Singup;