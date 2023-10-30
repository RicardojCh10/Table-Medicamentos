import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Navbar from './components/navbar';
import MedicationTable from './pages/MedicationTable';

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <header>
            <Navbar />
          </header>

          <div>
            <Routes>
              <Route path="/medicationTable" element={<MedicationTable />} />
            </Routes>
          </div>

        </Router>
      </>

    </div>
  );
}

export default App;


