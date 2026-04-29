// App.jsx
// Root component. Owns all student state and passes data/callbacks down via props.

import { useState } from 'react';
import Header from './components/Header';
import StudentTable from './components/StudentTable';
import AddStudentForm from './components/AddStudentForm';

// Seed data so the app looks populated on first load
const initialStudents = [
  { id: 1, name: 'Aryan Sharma',  score: 82 },
  { id: 2, name: 'Priya Mehta',   score: 35 },
  { id: 3, name: 'Rohan Verma',   score: 67 },
  { id: 4, name: 'Sneha Kapoor',  score: 91 },
  { id: 5, name: 'Karan Joshi',   score: 28 },
];

function App() {
  // Central state — single source of truth for all student records
  const [students, setStudents] = useState(initialStudents);

  // Pass mark (criteria for Pass/Fail)
  const [passMark, setPassMark] = useState(40);

  // nextId tracks unique IDs for newly added students
  const [nextId, setNextId] = useState(initialStudents.length + 1);

  // ── Update a student's score ──────────────────────────────────────
  // Called by StudentRow when the score input changes.
  function handleUpdateScore(id, newScore) {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: newScore } : s))
    );
  }

  // ── Add a new student ─────────────────────────────────────────────
  // Called by AddStudentForm on valid submission.
  function handleAddStudent({ name, score }) {
    const newStudent = { id: nextId, name, score };
    setStudents((prev) => [...prev, newStudent]);
    setNextId((prev) => prev + 1);
  }

  function handlePassMarkChange(nextValue) {
    const raw = nextValue;
    const parsed = raw === '' ? 0 : Number(raw);
    const clamped = Math.min(100, Math.max(0, Number.isFinite(parsed) ? parsed : 0));
    setPassMark(Math.round(clamped));
  }

  return (
    <div className="app-wrapper">
      {/* Form to add new students */}
      <AddStudentForm onAdd={handleAddStudent} />

      {/* Stats cards */}
      <Header
        students={students}
        passMark={passMark}
        onPassMarkChange={handlePassMarkChange}
      />

      {/* Table renders student list; receives update handler */}
      <StudentTable students={students} onUpdate={handleUpdateScore} passMark={passMark} />
    </div>
  );
}

export default App;