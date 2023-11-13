import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-pink">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/medicationTable" className="nav-link">
              TABLA DE MEDICAMENTOS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              INICIAR SESIÓN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
