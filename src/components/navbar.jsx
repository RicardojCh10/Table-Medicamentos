import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-pink">
      <Link to="/" className="navbar-brand">
        HOME
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/medicationTable" className="nav-link">
              TABLA DE MEDICAMENTOS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ruta2" className="nav-link">
              Ruta 2
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
