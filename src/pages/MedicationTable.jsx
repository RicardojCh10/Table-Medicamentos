import React, { useEffect, useState, useContext } from "react";
import Morning from "../components/morning";
import Noon from "../components/noon";
import Evening from "../components/evening";
import Night from "../components/night";
import BeNecessary from "../components/benecessary";
import Agregar from "../components/agregar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../context/MainContext";

function Tabla() {
  const cerrarSesion = () => {
    localStorage.clear();
    setIsopen(false);
    navigate("/");
  };

  const abrir = () => {
    setAbierto(true);
  };

  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const isUserAuthenticated = () => {
    const status = localStorage.getItem("Status");
    return status === "true";
  };

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate("/");
    }
  }, []);
  const [isopen, setIsopen] = useState(false);

  return (
    <>
      <div>
        <div>
          <h2 className="w-full flex-col text-center text-3xl p-5">
            MEDICAMENTOS
          </h2>
        </div>

        <div className="bg-white rounded-sm w-[90%] mx-auto h-[40%] border-x-2 border-b-4 border-t flex items-center justify-center flex-wrap py-8">
          <div className="flex items-center justify-between w-full mx-10">
            <button
              className="text-black border-red-600 border-2 transition-all duration-300 ease-in-out hover:bg-red-700 focus:ring focus:outline-none focus:ring-red-300 m-3 px-2 border border-red-600 rounded-sm w-32"
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesión
            </button>
            <button></button>
          </div>

          <table className="h-80">
            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center ">
                  <Morning />
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center">
                  <Noon />
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr>
                  <Evening />
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center">
                  <Night />
                </tr>
              </thead>
            </table>

            <table className="my-0.5 ">
              <thead>
                <tr className="items-center justify-center ">
                  <BeNecessary />
                </tr>
              </thead>
            </table>
          </table>
        </div>
      </div>

      <Agregar abierto={abierto} setAbierto={setAbierto} />
    </>
  );
}

export default Tabla;
