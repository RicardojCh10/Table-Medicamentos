import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContexto } from "../context/MainContext";
import mediodia from "../assets/sol.png";

function Noon() {
  const [medicamentos, setMedicamentos] = useState([]);
  const { handleDelete, handleTime, triggerEffect } = useContexto();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        const response = await axios.get(
          "http://localhost:8082/medicamentosMedio",
          {
            params: { user },
          }
        );
        setMedicamentos(response.data.medicamentos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // fetch inicial

    const intervalId = setInterval(() => {
      fetchData();
    }, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000); // Random time between 2 and 5 seconds

    // Clear the interval when the component is unmounted or when the dependency array changes
    return () => clearInterval(intervalId);
  }, [triggerEffect]);

  return (
    <>
      {/*Tiempo - hora programada*/}
      <th className="bg-[#F8DA45] w-40 h-24 border-r-2  font-semibold">
        Mediodia
        <img
          className="items-center justify-center mx-auto mb-auto w-10 h-10 "
          src={mediodia}
        ></img>
      </th>
      <td className="bg-[#FFFF71]  w-40 h-fit border-r-2">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2>{medicamento.nombre}</h2>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </td>
      {/*Dosis*/}
      <td className="bg-[#FFFF71]  w-40 h-fit border-r-2 text-center">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2 key={index}>{medicamento.dosis}</h2>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </td>

      {/* Inicio hora */}

      <td className="bg-[#FFFF71] border-r-2 w-40 h-fit text-center">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => {
            const currentTime = new Date();

            // Use the current date instead of a fixed date (e.g., 2023-11-10)
            const currentYear = currentTime.getFullYear();
            const currentMonth = currentTime.getMonth() + 1; // Months are zero-based
            const currentDay = currentTime.getDate();

            const horaProgramada = new Date(
              `${currentYear}-${currentMonth}-${currentDay} ${medicamento.hora_programada}`
            );

            // Check if the current time is greater than the scheduled time
            const showButton = currentTime > horaProgramada;

            return (
              <h2 key={index} className="h-15">
                {medicamento.hora_programada}
                {showButton && (
                  <button
                    className="ml-2"
                    onClick={() => handleTime(medicamento.id)}
                  >
                    <span className="text-2xl">+</span>
                  </button>
                )}
              </h2>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </td>

      {/* Finalhora */}

      <td className="bg-[#FFFF71] w-40 h-fit border-r-2 text-center">
        <td className="bg-[#FFFF71]  w-40 h-fit">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={index}>{medicamento.fecha_programada}</h2>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </td>
      </td>

      <td className="bg-[#FFFF71] w-80 border-r-2">
        <h2 className="h-30">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={index} className="w-30">
                {medicamento.comentarios}
              </h2>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </h2>
      </td>
      <td className=" bg-[#FFFF71] w-8 h-fit border-r-2">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <button
              className="w-full"
              onClick={() => handleDelete(medicamento.id)}
            >
              x
            </button>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </td>
    </>
  );
}

export default Noon;
