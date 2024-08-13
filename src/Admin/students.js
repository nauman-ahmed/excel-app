import { useState, useEffect, useRef } from "react";
import { Table } from 'react-bootstrap';
import { getAllStudents } from "../API/Admin";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import MetricDisplay from "../Components/metric";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Student = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const count = useRef(0)

  const getAllStudentsHandler = async () => {
    setIsLoading(true)
    const response = await getAllStudents()
    if(response.code == 201){
      toast.success(response.message)
      setStudents(response.data)
    }else{
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    count.current += 1; 
    getAllStudentsHandler()
  },[])

  return (
    <div className="pt-5 ">
      <div className="d-flex justify-content-center">
        <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
          <h1>All Students</h1>
        </div>
      </div>
      <div className="mt-5 px-5">
        {isLoading ? <div className="d-flex justify-content-center"><Spin size="large"/> </div>:
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center tablePlaceContent">Name</th>
                <th className="text-center tablePlaceContent">Exams Taken</th>
                <th className="text-center tablePlaceContent">Average Score</th>
                <th className="text-center tablePlaceContent">University</th>
                <th className="text-center tablePlaceContent">Graduation Year</th>
                <th className="text-center tablePlaceContent">Gender</th>
                <th className="text-center tablePlaceContent">Race</th>
                <th className="text-center tablePlaceContent">Ethnicity</th>
              </tr>
            </thead>
            <tbody>
              {
                students.length && 
                students.map((student) =>
                <tr>
                  <td className="text-center tablePlaceContent">{student.firstName} {student.lastName}</td>
                  <td className="text-center tablePlaceContent">{student.examTaken}</td>
                  <td className="text-center tablePlaceContent">{student.avgScore}</td>
                  <td className="text-center tablePlaceContent">{student.university}</td>
                  <td className="text-center tablePlaceContent">{student.gradYear}</td>
                  <td className="text-center tablePlaceContent">{student.gender}</td>
                  <td className="text-center tablePlaceContent">{student.race}</td>
                  <td className="text-center tablePlaceContent">{student.ethnicity}</td>
                </tr>  
                )
                
              }
            </tbody>
          </Table>
        }
      </div>
    </div>
  );
  };
  
  export default Student;