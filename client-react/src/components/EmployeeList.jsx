import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_BASE_URL + "/api/employees";

function EmployeeList() {
  const [employees, setEmployees] = useState();

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
                  <div className="d-flex justify-content-between flex-row  align-items-center">
                    {emp.firstName} {emp.lastName}
                    <div>
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => {
                          edit(emp.id);
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
