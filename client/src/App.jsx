import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectsAssignments, setProjectsAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: 'employeeId',
    direction: 'ascending'
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [empRes, projRes, paRes] = await Promise.all([
          axios.get("http://localhost:5000/api/employees"),
          axios.get("http://localhost:5000/api/projects"),
          axios.get("http://localhost:5000/api/projectsAssignments")
        ]);
        setEmployees(empRes.data);
        setProjects(projRes.data);
        setProjectsAssignments(paRes.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    document.title = "Project Assignments";
  }, []);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedAssignments = useMemo(() => {
    const items = projectsAssignments.map(prAs => {
      const employee = employees.find(e => e._id === prAs.employeeId);
      const project  = projects.find(p => p.projectCode === prAs.projectCode);
      return {
        ...prAs,
        fullName: employee?.fullName || '',
        projectName: project?.projectName || ''
      };
    });
    items.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return items;
  }, [projectsAssignments, employees, projects, sortConfig]);

  if (loading) return <p>Loading …</p>;
  if (error)   return <p>Failed to load data. Please try again.</p>;

  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            {[
              { label: 'Employee Id', key: 'employeeId' },
              { label: 'Employee Name', key: 'fullName' },
              { label: 'Project Name', key: 'projectName' },
              { label: 'Start Date', key: 'startDate' },
            ].map(({ label, key }) => (
              <th
                key={key}
                onClick={() => requestSort(key)}
                style={{ cursor: 'pointer' }}
              >
                {label}
                {sortConfig.key === key
                  ? sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'
                  : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedAssignments.map(prAs => (
            <tr key={`${prAs.employeeId}-${prAs.projectCode}`}>
              <td>{prAs.employeeId}</td>
              <td>{prAs.fullName}</td>
              <td>{prAs.projectName}</td>
              <td>{prAs.startDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

