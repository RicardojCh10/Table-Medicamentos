import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <>
        <Router>
          

          <div>
            <Routes>
              <Route path="/" element={<Navbar />} />
            </Routes>
          </div>

        </Router>
      </>

    </div>
  );
}

export default App;


