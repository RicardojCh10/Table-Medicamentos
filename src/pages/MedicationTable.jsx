import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faSun,
  faCloudSun,
  faCloudMoon,
  faMoon,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const MedicationTable = () => {
  const [medications, setMedications] = useState(createInitialMedications());
  const [takenMedications, setTakenMedications] = useState([]);

  const medicationOptions = [
    "Medication A",
    "Medication B",
    "Medication C",
    "Medication D",
    // Agrega más medicamentos disponibles aquí
  ];

  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequencyPerDay: 1,
    hoursBetweenDoses: 8,
    duration: 1,
    comments: "",
    days: [],
  });

  const handleFormChange = (field, value) => {
    if (field === "days") {
      const selectedDays = formData.days.includes(value)
        ? formData.days.filter((day) => day !== value)
        : [...formData.days, value];
      setFormData({ ...formData, [field]: selectedDays });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const calculateDuration = () => {
    const dosesPerDay = parseInt(formData.frequencyPerDay);
    const hoursBetweenDoses = parseInt(formData.hoursBetweenDoses);
    const totalHours = dosesPerDay > 0 ? (formData.duration - 1) * hoursBetweenDoses : 0;

    return totalHours;
  };

  const addMedication = () => {
    const newMedications = [...medications];
    const dosesPerDay = parseInt(formData.frequencyPerDay);
    const hoursBetweenDoses = parseInt(formData.hoursBetweenDoses);
    const intervalBetweenDoses = hoursBetweenDoses * 60 * 60 * 1000; // Convertir horas a milisegundos

    for (let i = 0; i < dosesPerDay; i++) {
      const newRow = {
        id: newMedications.length + 1,
        time: getMedicationTime(i * hoursBetweenDoses),
        medicationName: formData.medicationName,
        dosage: formData.dosage,
        duration: formData.duration,
        days: formData.days,
        comments: formData.comments,
        intervalBetweenDoses: intervalBetweenDoses,
        nextDoseTime: new Date(new Date().getTime() + i * intervalBetweenDoses),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
        startTime: new Date().getTime(),
      };
      newMedications.push(newRow);
    }

    setMedications(newMedications);
    setFormData({
      medicationName: "",
      dosage: "",
      frequencyPerDay: 1,
      hoursBetweenDoses: 8,
      duration: 1,
      comments: "",
      days: [],
    });
  };

  const takeMedication = (id) => {
    const updatedMedications = [...medications];
    const medicationIndex = updatedMedications.findIndex((med) => med.id === id);

    if (medicationIndex !== -1) {
      updatedMedications[medicationIndex].startTime = new Date().getTime();
      setMedications(updatedMedications);

      setTakenMedications((prevTakenMedications) => [
        ...prevTakenMedications,
        id,
      ]);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setMedications((prevMedications) => {
        return prevMedications.map((med) => {
          if (med.startTime) {
            const currentTime = new Date().getTime();
            const elapsedTime = new Date(currentTime - med.startTime);
            med.hours = elapsedTime.getUTCHours();
            med.minutes = elapsedTime.getUTCMinutes();
            med.seconds = elapsedTime.getUTCSeconds();
          }
          return med;
        });
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getRowClass = (time) => {
    switch (time) {
      case "Morning":
        return (
          <span>
            <FontAwesomeIcon icon={faSun} /> Morning
          </span>
        );
      case "Noon":
        return (
          <span>
            <FontAwesomeIcon icon={faCloudSun} /> Noon
          </span>
        );
      case "Evening":
        return (
          <span>
            <FontAwesomeIcon icon={faCloudMoon} /> Evening
          </span>
        );
      case "Night":
        return (
          <span>
            <FontAwesomeIcon icon={faMoon} /> Night
          </span>
        );
      case "Only when I need it":
        return (
          <span>
            <FontAwesomeIcon icon={faQuestion} /> Only when I need it
          </span>
        );
      default:
        return "";
    }
  };

  const getMedicationTime = (hoursOffset) => {
    const currentTime = new Date();
    currentTime.setHours(6 + hoursOffset); // Comienza a las 6:00 AM y se incrementa según el offset
    return currentTime.getHours() >= 18 ? "Night" : "Evening";
  };

  // Agregar el estado para mostrar/ocultar el modal
  const [showModal, setShowModal] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <h3>Agregar Medicamento</h3>
          <button className="btn btn-primary" onClick={openModal}>
            Agregar
          </button>

          {/* Modal */}
          <div
            className={`modal ${showModal ? "show" : ""}`}
            style={{ display: showModal ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Agregar Medicamento</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Contenido del formulario del modal */}
                  <div className="form-group">
                    <label>Medicamento</label>
                    <select
                      className="form-control"
                      value={formData.medicationName}
                      onChange={(e) =>
                        handleFormChange("medicationName", e.target.value)
                      }
                    >
                      <option value="">Seleccione un medicamento</option>
                      {medicationOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Dosis</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.dosage}
                      onChange={(e) => handleFormChange("dosage", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Frecuencia por día</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={formData.frequencyPerDay}
                      onChange={(e) =>
                        handleFormChange("frequencyPerDay", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Horas entre dosis</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={formData.hoursBetweenDoses}
                      onChange={(e) =>
                        handleFormChange("hoursBetweenDoses", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Duración (días)</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={formData.duration}
                      onChange={(e) =>
                        handleFormChange("duration", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Comentarios</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Comentarios"
                      value={formData.comments}
                      onChange={(e) =>
                        handleFormChange("comments", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addMedication();
                      closeModal(); // Cierra el modal al agregar
                    }}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-3">Tabla de Medicamentos</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th className="grouped-header" rowSpan="7">
              Horario
            </th>
            <th>Medicamento</th>
            <th>Dosis</th>
            <th>Tiempo hasta próxima dosis</th>
            <th>
              <FontAwesomeIcon icon={faClock} /> Tiempo Transcurrido
            </th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((med) => (
            <MedicationRow
              key={med.id}
              medication={med}
              rowClass={getRowClass(med.time)}
              onTakeMedication={() => takeMedication(med.id)}
              takenMedications={takenMedications}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const createInitialMedications = () => {
  const times = ["Morning", "Noon", "Evening", "Night", "Only when I need it"];

  const initialMedications = times.map((time, index) => ({
    id: index + 1,
    time,
    medicationName: "",
    dosage: "",
    startDate: null, // Modificar para usar fecha de inicio
    comments: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
    startTime: null,
  }));

  return initialMedications;
};

const MedicationRow = ({ medication, rowClass, onTakeMedication, takenMedications }) => {
  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const formattedTime =
    medication.hours +
    ":" +
    formatTime(medication.minutes) +
    ":" +
    formatTime(medication.seconds);

  const isTaken = takenMedications.includes(medication.id);

  const timeUntilNextDose = () => {
    if (medication.nextDoseTime) {
      const currentTime = new Date().getTime();
      const timeDifference = medication.nextDoseTime - currentTime;
      const hoursUntilNextDose = Math.floor(timeDifference / (60 * 60 * 1000));
      const minutesUntilNextDose = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));

      return `${hoursUntilNextDose}h ${minutesUntilNextDose}m`;
    } else {
      return "N/A";
    }
  };

  return (
    <tr className={rowClass}>
      <td>{medication.time}</td>
      <td>{medication.medicationName}</td>
      <td>{medication.dosage}</td>
      <td>{timeUntilNextDose()}</td>
      <td>
        {medication.startTime ? (
          <span>
            <FontAwesomeIcon icon={faClock} /> {formattedTime}
          </span>
        ) : "N/A"}
      </td>
      <td>{medication.comments}</td>
      <td>
        {medication.startTime ? (
          isTaken ? (
            <button className="btn btn-success" disabled>
              Tomado
            </button>
          ) : (
            <button className="btn btn-success" onClick={onTakeMedication}>
              Se tomó la medicina
            </button>
          )
        ) : null}
      </td>
    </tr>
  );
};

export default MedicationTable;