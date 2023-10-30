import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MedicationTable = () => {
  const [medications, setMedications] = useState([]);
  const [medicamento, setMedicamento] = useState('Ibuprofeno');
  const [fecha, setFecha] = useState(new Date());
  const [comentarios, setComentarios] = useState('');

  const addMedication = (tiempo, dosis, comentarios) => {
    const newMedication = {
      medicamento,
      dosis,
      tiempo,
      fecha,
      comentarios,
    };
    setMedications([...medications, newMedication]);
  };

  return (
    <div>
      <h2>Tabla de Medicamentos</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Medicamento</th>
            <th>Dosis</th>
            <th>Horario</th>
            <th>Fecha</th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {['Morning', 'Noon', 'Evening', 'Night', 'Only when I need it'].map((schedule) => (
            <React.Fragment key={schedule}>
              {[1].map((row) => (
                <tr key={row}>
                  {row === 1 && (
                    <td rowSpan="3">{medicamento}</td>
                  )}
                  {row === 1 && (
                    <td rowSpan="3">
                      <select
                        value={medicamento}
                        onChange={(e) => setMedicamento(e.target.value)}
                      >
                        <option value="Ibuprofeno">Ibuprofeno</option>
                        <option value="Omeprazol">Omeprazol</option>
                        {/* Agrega más medicamentos aquí */}
                      </select>
                    </td>
                  )}
                  <td>{schedule}</td>
                  {row === 1 && (
                    <td rowSpan="3">
                      <DatePicker
                        selected={fecha}
                        onChange={(date) => setFecha(date)}
                      />
                    </td>
                  )}
                  {row === 1 && (
                    <td rowSpan="3">
                      <input
                        type="text"
                        placeholder="Comentarios"
                        onChange={(e) => setComentarios(e.target.value)}
                      />
                    </td>
                  )}
                  {row === 1 && (
                    <td rowSpan="3">
                      <button onClick={() => addMedication(schedule, medicamento, fecha, comentarios)}>
                        Agregar Medicamento
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationTable;
