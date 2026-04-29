// AddStudentForm.jsx
// Controlled form to add a new student.
// Props:
//   onAdd – callback({ name, score }) called on valid submission

import { useState } from 'react';

function AddStudentForm({ onAdd }) {
  // Local state for the two form fields
  const [name, setName]   = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      setError('Please enter a student name.');
      return;
    }
    if (score === '' || isNaN(score)) {
      setError('Please enter a valid score.');
      return;
    }

    const numScore = Math.min(100, Math.max(0, Number(score)));

    // Lift the new student up to App
    onAdd({ name: name.trim(), score: numScore });

    // Clear form after submission
    setName('');
    setScore('');
    setError('');
  }

  return (
    <section className="panel panel-form">
      <div className="panel-titlebar">
        <div className="panel-titleleft">
          <span className="panel-dot" aria-hidden="true" />
          <p className="panel-title">REGISTER STUDENT</p>
        </div>
        <p className="panel-meta">NEW ENTRY</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="field">
            <label className="sr-only" htmlFor="student-name">
              Student name
            </label>
            <input
              id="student-name"
              type="text"
              placeholder="Student name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              autoComplete="off"
            />
          </div>

          <div className="field">
            <label className="sr-only" htmlFor="student-score">
              Score
            </label>
            <input
              id="student-score"
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => {
                setScore(e.target.value);
                setError('');
              }}
              aria-label="Score"
            />
          </div>

          <button type="submit" className="btn-add">
            + ADD
          </button>
        </div>

        {error && <p className="form-error">{error}</p>}
      </form>
    </section>
  );
}

export default AddStudentForm;