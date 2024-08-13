// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SidebarAdmin from './Components/adminSidebar';
import Admin from "./Admin"
import Student from './Admin/students';
import Simulations from './Admin/simulations';
import SimulationDetails from './Admin/simulationDetails';
import NoPage from './Components/noPage';

import SidebarStudent from './Components/studentSidebar';
import StudentDashboard from "./Student"
import SimulationStudents from './Student/simulations';
import SimulationDetailsStudents from './Student/simulationDetails';

import Login from './Authentication';
import SignUP from './Authentication/signUp';

function App() { 

  const [path, setPath] = useState(null); //Admin Student Not
  const [userRole, setUserRole] = useState("Not"); //Admin Student Not
  const location = useLocation();

  const getSession = async () => {
    try {
      const role = JSON.parse(localStorage.getItem("accessToken"))
      setPath(location.pathname)
      if(role){
        setUserRole(role.role)
      }else{
        setUserRole("Not")
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(path !== location.pathname){
      getSession()
    }
  },[location])

  return (
    <div className="app">
      {userRole == "Admin" && <SidebarAdmin/> }
      {userRole == "Student" && <SidebarStudent/> }
      <main className="content">
        {userRole == "Not" &&
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUP />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        }
        {userRole == "Admin" &&
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/admin/students" element={<Student />} />
            <Route path="/admin/simulation" element={<Simulations />} />
            <Route path="/admin/simulation/detail/:id" element={<SimulationDetails />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        }
        {userRole == "Student" &&
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/student/simulation" element={<SimulationStudents />} />
            <Route path="/student/simulation/detail/:id" element={<SimulationDetailsStudents />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        }
      </main>
    </div>
  );
}

export default App;
