import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import "../MedicationTable.css";

// ... (el resto de tu código)



const MedicationTable = () => {
  const [medications, setMedications] = useState(createInitialMedications());

  const medicationOptions = [
    "Medication A",
    "Medication B",
    "Medication C",
    "Medication D",
    // Agrega más medicamentos disponibles aquí
  ];

  const [formData, setFormData] = useState({
    selectedTime: "Morning",
    medicationName: "",
    dosage: "",
    duration: 1,
    comments: "",
  });

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const calculateDuration = () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + parseInt(formData.duration));

    return { startDate: today, endDate };
  };

  const addMedication = () => {
    const newMedications = [...medications];
    const emptyRow = newMedications.find(
      (med) => med.time === formData.selectedTime && !med.medicationName
    );

    if (emptyRow) {
      emptyRow.medicationName = formData.medicationName;
      emptyRow.dosage = formData.dosage;
      emptyRow.duration = formData.duration;
      const { startDate, endDate } = calculateDuration();
      emptyRow.startDate = startDate;
      emptyRow.endDate = endDate;
      emptyRow.comments = formData.comments;
      emptyRow.startTime = new Date().getTime(); // Agregar el tiempo de inicio
    }

    setMedications(newMedications);
    setFormData({
      selectedTime: "Morning",
      medicationName: "",
      dosage: "",
      duration: 1,
      comments: "",
    });
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
        return "morning-row";
      case "Noon":
        return "noon-row";
      case "Evening":
        return "evening-row";
      case "Night":
        return "night-row";
      case "Only when I need it":
        return "custom-row";
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <h3>Agregar Medicamento</h3>
          <div className="form-group">
            <label>Horario</label>
            <select
              className="form-control"
              value={formData.selectedTime}
              onChange={(e) => handleFormChange("selectedTime", e.target.value)}
            >
              <option value="Morning">Morning</option>
              <option value="Noon">Noon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
              <option value="Only when I need it">Only when I need it</option>
            </select>
          </div>
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
            <label>Duración</label>
            <input
              type="number"
              className="form-control"
              min="1"
              value={formData.duration}
              onChange={(e) => handleFormChange("duration", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Comentarios</label>
            <input
              type="text"
              className="form-control"
              placeholder="Comentarios"
              value={formData.comments}
              onChange={(e) => handleFormChange("comments", e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={addMedication}>
            Agregar
          </button>
        </div>
      </div>

      <h2 className="mt-3">Tabla de Medicamentos</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th className="grouped-header" rowSpan="4">
              Horario
            </th>
            <th>Medicamento</th>
            <th>Dosis</th>
            <th>
              <FontAwesomeIcon icon={faClock} /> Tiempo Transcurrido
            </th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((med) => (
            <MedicationRow
              key={med.id}
              medication={med}
              rowClass={getRowClass(med.time)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const createInitialMedications = () => {
  const times = ["Morning", "Noon", "Evening", "Night", "Only when I need it"];

  const initialMedications = times.flatMap((time, index) => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: index * 4 + i + 1,
      time,
      medicationName: "",
      dosage: "",
      startDate: null,
      endDate: null,
      comments: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
      startTime: null,
    }));
  });

  return initialMedications;
};

const MedicationRow = ({ medication, rowClass }) => {
  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const formattedTime =
    medication.hours +
    ":" +
    formatTime(medication.minutes) +
    ":" +
    formatTime(medication.seconds);

  return (
    <tr className={rowClass}>
      <td>{medication.time}</td>
      <td>{medication.medicationName}</td>
      <td>{medication.dosage}</td>
      <td>
        {medication.startTime ? (
          <span>
            <FontAwesomeIcon icon={faClock} /> {formattedTime}
          </span>
        ) : (
          "N/A"
        )}
      </td>
      <td>{medication.comments}</td>
    </tr>
  );
};

export default MedicationTable;
