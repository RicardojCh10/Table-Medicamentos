import React from "react";

const MedicationRow = ({ medication, onTakeMedication }) => {
  return (
    <tr>
      <td>{medication.medicationName}</td>
      <td>{medication.dosage}</td>
      <td>{medication.frequencyPerDay}</td>
      <td>{medication.hoursBetweenDoses}</td>
      <td>{medication.duration}</td>
      <td>
        <button onClick={onTakeMedication}>Tomar</button>
      </td>
    </tr>
  );
};

export default MedicationRow;
