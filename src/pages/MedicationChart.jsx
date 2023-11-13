import React, { useState, useEffect, useRef } from 'react';
import { FaSun, FaMoon, FaClock } from 'react-icons/fa';
import { MdRotateRight } from 'react-icons/md';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MedicationChart = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [medicamentosOptions, setMedicamentosOptions] = useState([]);
  const [suggestedMedicamentos, setSuggestedMedicamentos] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const timerRef = useRef(null);
  const [selectedMedicamentos, setSelectedMedicamentos] = useState([]);

  const [descriptions, setDescriptions] = useState({});

  const calculateHorario = (horaInicio) => {
    if (!horaInicio) return 'Unknown';

    const [hour, minute] = horaInicio.split(':').map(Number);

    if (
      (hour >= 6 && (hour < 12 || (hour === 12 && minute === 0))) // Morning
    ) {
      return 'Morning';
    } else if (
      (hour >= 12 && (hour < 16 || (hour === 16 && minute === 0))) // Noon
    ) {
      return 'Noon';
    } else if (
      (hour >= 16 && (hour < 19 || (hour === 19 && minute === 0))) // Evening
    ) {
      return 'Evening';
    } else {
      return 'Night';
    }
  };

  const calculateHorarioActual = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) return 'Morning';
    if (currentHour >= 12 && currentHour < 16) return 'Noon';
    if (currentHour >= 16 && currentHour < 19) return 'Evening';
    return 'Night';
  };

  const calculateNextDoseTime = (horaInicio, frecuencia) => {
    if (!horaInicio || typeof horaInicio !== 'string') return null;

    const [hour, minute] = horaInicio.split(':').map(Number);

    if (isNaN(hour) || isNaN(minute)) {
      return null;
    }

    const currentDate = new Date();
    const nextDoseTime = new Date(currentDate);
    nextDoseTime.setHours(hour);
    nextDoseTime.setMinutes(minute);

    while (nextDoseTime <= currentDate) {
      nextDoseTime.setHours(nextDoseTime.getHours() + frecuencia);
    }

    return nextDoseTime;
  };

  const updateNextDoseTime = (medication, horarioActual) => {
    if (medication) {
      const nextDoseTime = calculateNextDoseTime(
        parseInt(medication.frecuencia),
        medication.horaInicio
      );

      setMedicamentos((prevMedicamentos) =>
        prevMedicamentos.map((med) => {
          if (med.nombre === medication.nombre) {
            const timeRemaining = nextDoseTime - new Date(); // Calculate remaining time
            return {
              ...med,
              nextDoseTime,
              horario: calculateHorario(medication.horaInicio),
              timeRemaining, // Update remaining time
            };
          }
          return med;
        })
      );

      if (nextDoseTime) {
        const currentTime = new Date();
        const timeUntilNextDose = nextDoseTime - currentTime;

        if (timeUntilNextDose > 0) {
          timerRef.current = setTimeout(() => {
            updateNextDoseTime(medication, horarioActual);
          }, timeUntilNextDose);
        }
      }
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:8082/obtenerMedicamentos')
      .then((respuesta) => {
        const medicamentosData = respuesta.data.medicamentos;
        setMedicamentosOptions(medicamentosData.map((med) => med.nombre));

        const descriptionsData = {};
        medicamentosData.forEach((med) => {
          descriptionsData[med.nombre] = med.descripcion;
        });
        setDescriptions(descriptionsData);

        // Initialize medicamentos with their next dose times
        const horarioActual = calculateHorarioActual();
        const currentTime = new Date();
        const updatedMedicamentos = medicamentosData.map((medication) => {
          const nextDoseTime = calculateNextDoseTime(
            parseInt(medication.frecuencia),
            medication.horaInicio
          );
          const timeUntilNextDose = nextDoseTime - currentTime;
          if (timeUntilNextDose > 0) {
            timerRef.current = setTimeout(() => {
              updateNextDoseTime(medication, horarioActual);
            }, timeUntilNextDose);
          }
          return {
            ...medication,
            nextDoseTime,
            horario: calculateHorario(medication.horaInicio),
            timeRemaining: timeUntilNextDose, // Initialize time remaining
          };
        });

        setMedicamentos(updatedMedicamentos);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (event, name) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const suggestions = medicamentosOptions || [];
    if (typeof value === "string") {
      const filteredSuggestions = suggestions.filter((med) =>
        med && med.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedMedicamentos(filteredSuggestions);
    }

    const requiredFields = ['nombre', 'dosis', 'frecuencia', 'duracion', 'horaInicio'];
    const allRequiredFieldsFilled = requiredFields.every((field) => !!inputValues[field]);
    setIsSaveDisabled(!allRequiredFieldsFilled);
  };

  const calculateNextDose = (horaInicio, frecuencia) => {
    if (!horaInicio || !frecuencia) return null;
    const [hour, minute] = horaInicio.split(':').map(Number);
    const currentDate = new Date();
    const nextDoseTime = new Date(currentDate);
    nextDoseTime.setHours(hour);
    nextDoseTime.setMinutes(minute);

    while (nextDoseTime <= currentDate) {
      nextDoseTime.setHours(nextDoseTime.getHours() + frecuencia);
    }

    return nextDoseTime;
  };

  const handleToggleSelected = (medication) => {
    setSelectedMedicamentos((prevSelected) => {
      if (prevSelected.includes(medication)) {
        return prevSelected.filter((med) => med !== medication);
      }
      return [...prevSelected, medication];
    });
  };

  const handleRestartTimer = (horario) => {
    // Encuentra las medicaciones con el horario especificado y actualiza sus temporizadores
    medicamentos
      .filter((med) => med.horario === horario && med.timeRemaining !== null)
      .forEach((medication) => {
        updateNextDoseTime(medication, horario);
      });
  };

  const handleSaveMedication = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const frecuencia = parseInt(inputValues.frecuencia);
    const nextDoseTime = calculateNextDose(inputValues.horaInicio, frecuencia);
    const horarioActual = calculateHorarioActual();

    const timeRemaining = frecuencia * 60 * 60 * 1000; // Convert Frecuencia to milliseconds

    const newMedication = {
      nombre: inputValues.nombre || '',
      dosis: inputValues.dosis || '',
      frecuencia: frecuencia,
      duracion: inputValues.duracion || '',
      comentarios: inputValues.comentarios || '',
      horaInicio: inputValues.horaInicio || '',
      soloParaMalestar: inputValues.soloParaMalestar || false,
      nextDoseTime,
      horario: horarioActual,
      timeRemaining, // Add remaining time in milliseconds
    };

    if (newMedication.soloParaMalestar) {
      newMedication.horario = 'Only when I need it';
    } else {
      updateNextDoseTime(newMedication, horarioActual);
    }

    setMedicamentos([...medicamentos, newMedication]);
    setSelectedMedicamentos([]); // Clear selected medications
    setShowModal(false);
    setInputValues({});
    setIsSaveDisabled(true);

    // Start the timer to update the remaining time
    timerRef.current = setInterval(() => {
      setMedicamentos((prevMedicamentos) =>
        prevMedicamentos.map((med) => {
          if (med.nombre === newMedication.nombre) {
            const updatedTimeRemaining = med.timeRemaining - 1000;
            return {
              ...med,
              timeRemaining: updatedTimeRemaining,
            };
          }
          return med;
        })
      );

      if (newMedication.timeRemaining <= 0) {
        clearInterval(timerRef.current);
      }
    }, 1000);
  };

  const timeData = [
    { label: 'Morning', icon: <FaSun style={styles.timeIcon} />, color: '#FFDDDD' },
    { label: 'Noon', icon: <FaClock style={styles.timeIcon} />, color: '#FFE8DD' },
    { label: 'Evening', icon: <FaSun style={styles.timeIcon} />, color: '#DDF2E8' },
    { label: 'Night', icon: <FaMoon style={styles.timeIcon} />, color: '#DDE7F2' },
    { label: 'Only when I need it', icon: <MdRotateRight style={styles.rotateIcon} />, color: '#E4E4E4' },
  ];

  const formatTimeRemaining = (timeRemaining) => {
    const hours = Math.floor(timeRemaining / 3600000);
    const minutes = Math.floor((timeRemaining % 3600000) / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <div className="container">
        <div className="header">CUADRO DE MEDICAMENTOS</div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Agregar Medicamento
        </Button>
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th className="th"></th>
                {[
                  'Medicamentos',
                  'Dosis',
                  'Frecuencia',
                  'Duración',
                  'Comentarios',
                  'Siguiente Dosis en:',
                  'Seleccionar',
                ].map((header) => (
                  <th className="th" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeData.map((time) => (
                <tr key={time.label}>
                  <td style={{ ...styles.td, background: time.color }}>
                    {time.icon}
                    <span style={{ color: '#555555', fontWeight: 'bold' }}>{time.label}</span>
                  </td>
                  {[
                    'nombre',
                    'dosis',
                    'frecuencia',
                    'duracion',
                    'comentarios',
                    'Siguiente Dosis en:',
                  ].map((field, index) => (
                    <td key={field} style={{ ...styles.td, background: time.color }}>
                      {medicamentos
                        .filter((med) => med.horario === time.label)
                        .map((med, index) => (
                          <div key={index} style={styles.column}>
                            {field === 'comentarios' && med.nombre in descriptions
                              ? `${med[field]}\n\n${descriptions[med.nombre]}`
                              : field === 'Siguiente Dosis en:' && med.timeRemaining !== null
                              ? (
                                <>
                                  {formatTimeRemaining(med.timeRemaining)}
                                </>
                              )
                              : med[field]}
                          </div>
                        ))}
                    </td>
                  ))}
                  <td style={{ ...styles.td, background: time.color }}>
                    {medicamentos.some((med) => med.horario === time.label && med.timeRemaining !== null) && (
                      <button onClick={() => handleRestartTimer(time.label)}>Reiniciar Temporizadores</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

const styles = {
  timeIcon: {
    marginRight: '10px',
    verticalAlign: 'middle',
  },
  rotateIcon: {
    marginRight: '10px',
    verticalAlign: 'middle',
  },
  td: {
    padding: '10px',
    textAlign: 'center',
  },
  column: {
    marginBottom: '5px',
  },
};

export default MedicationChart;