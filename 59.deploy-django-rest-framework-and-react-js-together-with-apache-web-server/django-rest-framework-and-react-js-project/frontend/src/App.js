import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      try {
        const students = await axios.get("http://backend.django-rest-framework-and-react-js-project.com/api/student/");
        console.log(students.data);
        setStudents(students.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllStudent();
  }, []);

  return (
    <div className="App">
      <h1>Connect React JS to Django</h1>
      {
        students.map((student, i) => {
          return (
            <h2 key={i}>{student.stuname} {student.email}</h2>
          )
        })
      }
    </div>
  );
}

export default App;
