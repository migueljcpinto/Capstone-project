/* import { useState } from "react";

export default function NurseSelection({ nursesList, shiftType, onAddNurse }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [showSpecialistsOnly, setShowSpecialistsOnly] = useState(false);

  //creating a new copy from the original array
  let filteredNurses = [...nursesList];

  if (selectedRole) {
    filteredNurses = filteredNurses.filter(
      (nurse) => nurse.role === selectedRole
    );
  }

  if (showSpecialistsOnly) {
    filteredNurses = filteredNurses.filter((nurse) => nurse.specialist);
  }
  return (
    <div>
      <div>
        <label>Filter by Role:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">All</option>
          <option value="nurse">Nurse</option>
          <option value="chief">Chief</option>
          <option value="sub-chief">Sub-Chief</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      <div>
        <label>Show only specialists:</label>
        <input
          type="checkbox"
          checked={showSpecialistsOnly}
          onChange={(e) => setShowSpecialistsOnly(e.target.checked)}
        />
      </div>

      <ul>
        {filteredNurses.map((nurse) => (
          <li key={nurse._id}>
            {nurse.name}
            <button
              onClick={() => {
                onAddNurse(nurse._id, shiftType);
              }}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
 */
