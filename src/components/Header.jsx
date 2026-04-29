// Header.jsx
// Displays dashboard-style stats (total students, passed count, average score)

function Header({ students, passMark, onPassMarkChange }) {
  const total = students.length;
  const passed = students.filter((s) => Number(s.score) >= Number(passMark)).length;
  const avgScore =
    total === 0
      ? 0
      : Math.round(
          students.reduce((sum, s) => sum + (Number.isFinite(Number(s.score)) ? Number(s.score) : 0), 0) /
            total
        );

  return (
    <section className="stats-wrap" aria-label="Class summary">
      <div className="stats-toolbar" aria-label="Pass criteria">
        <p className="stats-toolbar-label">PASS MARK</p>
        <input
          className="passmark-input"
          type="number"
          min="0"
          max="100"
          value={passMark}
          onChange={(e) => onPassMarkChange(e.target.value)}
          aria-label="Pass mark"
        />
      </div>

      <div className="stats">
      <div className="stat-card">
        <p className="stat-label">TOTAL</p>
        <p className="stat-value">{total}</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">PASSED (≥ {passMark})</p>
        <p className="stat-value">{passed}</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">AVG SCORE</p>
        <p className="stat-value">{avgScore}</p>
      </div>
      </div>
    </section>
  );
}

export default Header;