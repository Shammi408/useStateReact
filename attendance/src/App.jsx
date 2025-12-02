import { useState } from 'react'

import './App.css'

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul", present: true },
    { id: 2, name: "Aditi", present: false },
    { id: 3, name: "Karan", present: true },
    { id: 4, name: "Meera", present: false },
    { id: 5, name: "Vikram", present: true },
  ])
  const [filter, setFilter] = useState("all");

  const toggleAttendance = (id) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id 
          ? { ...student, present: !student.present }
          : student
      )
    );
  };
  const filteredStudents = students.filter((student) => {
    if (filter === "present") return student.present;
    if (filter === "absent") return !student.present;
    return true; 
  });

  const presentCount = students.filter((s) => s.present).length;
  return (
    <>
      { students.length === 0 && <p>No students available</p>}
      {students.length > 0 && ( 
      <div>
        <label>
            Show:{" "}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </label>
          {filteredStudents.map((student) => (
            <p key={student.id}>
              {student.name} :
              <span
                style={{
                  color: student.present ? "green" : "red",
                  fontWeight: student.present ? "bold" : "normal",
                }}
              >
                {student.present ? " Present" : " Absent"}
              </span>
              <button onClick={() => toggleAttendance(student.id)}>
                Toggle Attendance
              </button>
            </p>
          ))}
          <p>Present Students: {presentCount}</p>
      </div>)}
    </>
  )
}

export default App
