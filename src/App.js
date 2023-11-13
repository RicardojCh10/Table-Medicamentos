import React from 'react';
import "./App.css"; // Importa el archivo de estilos CSS

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// RUTAS 
import Login from "./login/login.jsx"
// import Registros from "./paginas/Registros"
import Tabla from './pages/MedicationTable';
import './index.css';
import {ContextoContextProvider} from './context/MainContext'


const router = createBrowserRouter([
  {
    path:"/",
    element: <Login/>
    
  },
  {
    // path:"/registro",
    // element: <Registros/>
  },
  {
    // path:"/tabla",
    // element: <Tabla/>
  },
 
 
])

function App() {

  return (
    <>
    <ContextoContextProvider>
      <div>
        <body>
          <RouterProvider router={router}/>
        </body>
      </div>
    </ContextoContextProvider>
    </>
  )
}

export default App;


