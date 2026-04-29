// StudentTable.jsx
// Renders the full student list in a <table>.
// Receives the students array and the onUpdate handler from App via props.

import StudentRow from './StudentRow';

function StudentTable({ students, onUpdate, passMark }) {
  return (
    <section className="table-section">
      <p className="section-label">Current Students</p>

      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            // Empty state when no students exist
            <tr className="empty-row">
              <td colSpan="4">No students yet — add one above.</td>
            </tr>
          ) : (
            students.map((student, i) => (
              <StudentRow
                key={student.id}
                student={student}
                index={i + 1}
                onUpdate={onUpdate}
                passMark={passMark}
              />
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default StudentTable;