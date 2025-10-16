import { useEffect, useState } from "react";


const URL = import.meta.env.VITE_BASE_URL + "/api/employees";

function EmployeeList() {
  const [temp, setTemp] = useState();

  useEffect(() => {
    console.log("URL is=", URL);
    const fetchData = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      setTemp(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container d-flex justify-content-center text-center">
      <h2>Employee List</h2>
    </div>
  );
}

export default EmployeeList;
