import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./Home";
import Doctor from "./Doctor";
import Patient from "./Patient";
import Appointment from "./Appointment";

const App = () => {
  return(
    <div> 
      <Router> 
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/Doctor" element={ <Doctor /> } />
          <Route path="/Patient" element={ <Patient /> } />
          <Route path="/Appointment" element={ <Appointment /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App;