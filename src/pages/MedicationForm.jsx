import React, { useState } from "react";

const MedicationForm = ({ addMedication }) => {
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequencyPerDay: 1,
    hoursBetweenDoses: 8,
    duration: 1,
    comments: "",
    days: [],
    startDate: new Date().toISOString().split("T")[0], // Agregar fecha de inicio
  });

  const [medicationOptions, setMedicationOptions] = useState([]); // Estado para almacenar los medicamentos

  useEffect(() => {
    // Simulación de solicitud a la API para obtener la lista de medicamentos
    // Esto simularía una solicitud a una API que devuelve una lista de medicamentos
    fetch("https://api.fakeexample.com/medications")
      .then((response) => response.json())
      .then((data) => setMedicationOptions(data.medications))
      .catch((error) => console.error("Error fetching medications", error));
  }, []);

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

  return (
    <div>
      <div className="form-group">
        <label>Medicamento</label>
        <select
          className="form-control"
          value={formData.medicationName}
          onChange={(e) => handleFormChange("medicationName", e.target.value)}
        >
          {/* opciones de medicamentos */}
          <option value="">Seleccione un medicamento</option>
          {medicationOptions.map((medication) => (
            <option key={medication.id} value={medication.name}>
              {medication.name}
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
          onChange={(e) => handleFormChange("frequencyPerDay", e.target.value)}
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

      <div className="form-group">
        <label>Seleccionar días</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="Monday"
              checked={formData.days.includes("Monday")}
              onChange={(e) => handleFormChange("days", e.target.value)}
            />
            Monday
          </label>
          {/* Repetir para otros días de la semana */}
        </div>
      </div>

      <div className="form-group">
        <label>Fecha de inicio</label>
        <input
          type="date"
          className="form-control"
          value={formData.startDate}
          onChange={(e) => handleFormChange("startDate", e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={() => {
          addMedication(formData);
        }}
      >
        Agregar
      </button>
    </div>
  );
};

export default MedicationForm;
