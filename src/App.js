import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter  } from 'react-router-dom';
import "./App.css"; // Importa el archivo de estilos CSS

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Navbar from './components/navbar';
import MedicationTable from './pages/MedicationTable';
import Login from './login/login'
import Signup from './login/signup';
import MedicationChart from './pages/MedicationChart';


function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <div>
            {/* <Navbar/> */}

            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/medicationTable" element={<MedicationTable/>} />
              <Route path="/MedicationChart" element={<MedicationChart/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </>

    </div>
  );
}

export default App;


