import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_BASE_URL + "/api/employees";

function EmployeeList() {
  const [employees, setEmployees] = useState();
  const [editingEmployeeId, setEditingEmployeeId] = useState(-1);

  useEffect(() => {
    console.log("URL is=", URL);
    const fetchData = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      // Sort employees by last name
      const array = Object.keys(data).map((key) => data[key]);
      array.sort((itemA, itemB) => itemA.lastName.localeCompare(itemB.lastName));
      console.log(array);
      setEmployees(array);
    };
    fetchData();
  }, []);

  function doLog(msg) {
    console.log(msg);
  }
  function edit(id) {
    console.log("editing...", id);
  }
  function remove(id) {
    console.log("removing...", id);
    const newList = employees.filter((emp) => emp.id !== id);
    setEmployees(newList);
  }
  function EmployeeDisplayComponent(prop) {
    var emp = prop.emp;
    return (
      <div className="d-flex justify-content-between flex-row  align-items-center">
        {emp.firstName} {emp.lastName}
        <div>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => {
              setEditingEmployeeId(emp.id);
            }}>
            <i className="bi bi-pencil"></i>
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => {
              remove(emp.id);
            }}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    );
  }
  function EmployeeEditComponent(prop) {
    var emp = prop.emp;
    const [firstName, setFirstName] = useState(emp.firstName);
    const [lastName, setLastName] = useState(emp.lastName);

    return (
      <div className="d-flex justify-content-between flex-column align-items-center">
        <div>
          <input type="text" className="form-control form-control-sm m-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" className="form-control form-control-sm m-2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <button
            type="button"
            className="btn btn-sm btn-primary me-2"
            onClick={() => {
              emp.firstName = firstName;
              emp.lastName = lastName;
              setEditingEmployeeId(-1);
            }}>
            Conferma
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setEditingEmployeeId(-1);
            }}>
            Annulla
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container text-center w-50">
        <div className="d-flex justify-content-center flex-row">
          <h2>Employee List</h2>
        </div>
        <div className="d-flex justify-content-center flex-row mt-3">
          {employees ? (
            <ul className="list-group w-75">
              {employees.map((emp) => (
                <li className="list-group-item" key={emp.id}>
                  {editingEmployeeId === emp.id ? <EmployeeEditComponent emp={emp} /> : <EmployeeDisplayComponent emp={emp} />}
                </li>
              ))}
            </ul>
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default EmployeeList;
