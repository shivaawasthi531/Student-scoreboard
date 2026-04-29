// StudentRow.jsx
// Represents a single student row in the table.
// Props:
//   student  – { id, name, score }
//   index    – row serial number (1-based)
//   onUpdate – callback(id, newScore) to update score in parent state

function StudentRow({ student, index, onUpdate, passMark }) {
  const numericScore = Number(student.score);
  const isPassing = Number.isFinite(numericScore) && numericScore >= Number(passMark);

  function handleScoreChange(e) {
    // Parse the value; keep it between 0 and 100
    const raw = e.target.value;
    if (raw === '') {
      onUpdate(student.id, '');
      return;
    }
    const num = Math.min(100, Math.max(0, Number(raw)));
    onUpdate(student.id, num);
  }

  return (
    <tr>
      {/* Serial number */}
      <td className="col-sr">{index}</td>

      {/* Student name */}
      <td>{student.name}</td>

      {/* Editable score input */}
      <td>
        <input
          type="number"
          className="score-input"
          value={student.score}
          min="0"
          max="100"
          onChange={handleScoreChange}
          aria-label={`Score for ${student.name}`}
        />
      </td>

      {/* Pass / Fail badge — conditional rendering based on score */}
      <td>
        <span className={`status-badge ${isPassing ? 'pass' : 'fail'}`}>
          {isPassing ? 'Pass' : 'Fail'}
        </span>
      </td>
    </tr>
  );
}

export default StudentRow;