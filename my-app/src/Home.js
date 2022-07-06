import React from "react";
import { useNavigate } from "react-router-dom";
import share from './share.png';
import star from './star.png';
import starblue from './starblue.png';
import style from './style.css';

const Home = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="title">
                <h6> Hospital Management System </h6>
            </div>
            
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4 className="menu"> Home </h4>
                    </div>
                </div>
                <hr></hr>
            </div>

            <div className="container">
                <div className="row menu">
                    <div className="col-sm-4" align="center">
                        <button className="buttonPatient" onClick={ () => navigate("/Patient") }> 
                            <img src={share} className="imageButton" align="left"/>
                            <div className="container">
                                <div className="row">                  
                                    <div className="col text" align="left">
                                        <h2> 3 </h2> PATIENT
                                    </div>
                                </div>
                            </div>   
                        </button>
                    </div>

                    <div className="col-sm-4" align="center">
                        <button className="buttonDoctor" onClick={ () => navigate("/Doctor") }> 
                            <img src={star} className="imageButton" align="left"/>
                            <div className="container">
                                <div className="row">
                                    <div className="col text" align="left">
                                        <h2> 2 </h2> DOCTOR
                                    </div>
                                </div>
                            </div>   
                        </button>
                    </div>

                    <div className="col-sm-4" align="center">
                        <button className="buttonAppointment" onClick={ () => navigate("/Appointment") }> 
                            <img src={starblue} className="imageButton" align="left"/>
                            <div className="container">
                                <div className="row">
                                    <div className="col text" align="left">
                                        <h2> 2 </h2>APPOINTMENT
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
       </div>      
    )
}

export default Home;