import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddAppointmentModal from "./AddAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";
import axios from 'axios';

export class Appointment extends Component{
    constructor(props)
    {
        super(props);
        this.states = { addModalShow: false, editModalShow: false }    
    }

    state = {
        persons: [],
    }

    refreshList()
    {
        axios.get(`http://localhost:5000/api/appointment`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    componentDidMount()
    {
        this.refreshList();
    }

    componentDidUpdate()
    {
        this.refreshList();
    }

    deleteAppointment = (e, id) => {
        if(window.confirm('Are you sure?')){
            const thidClickedFunda = e.currentTarget;
            thidClickedFunda.innerText = "Deleting";
            const res = axios
            .delete(`http://localhost:5000/api/appointment/${id}`)
        }
        document.location.reload(true);
      };

    render()
    {
        const { appointmentID, doctorName, patientName, appointmentDate } = this.state;
        
        let addModalClose = () => this.setState({ addModalShow: false })
        let editModalClose = () => this.setState({ editModalShow: false });
    
        return(            
            <div>
            <div className="title">
                <h6> Hospital Management System </h6>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4 className="menu"> Appointment </h4>
                    </div>
                </div>
                <hr></hr>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                <Table className = "mt-4" stripped bordered hover size = "sm">
                    <thead>
                        <tr>
                            <th> Doctor Name </th>
                            <th> Patient Name </th>
                            <th> Date </th>
                            <th>  </th>
                            <th>  </th>
                        </tr>                   
                    </thead>
    
                    <tbody>
                        { this.state.persons.map(person =>
                            <tr key = { person.appointmentID }>
                                <td> { person.doctorName } </td>
                                <td> { person.patientName } </td>
                                <td> { person.appointmentDate } </td>
                                <td> 
                                    <ButtonToolbar>
                                        <Button className = "mr-2" variant = "info" 
                                            onClick = { () => this.setState({ editModalShow: true,
                                            appointmentID: person.appointmentID,
                                            doctorName: person.doctorName,
                                            patientName: person.patientName,
                                            appointmentDate: person.appointmentDate }) }> Edit
                                        </Button>

                                        <EditAppointmentModal show = { this.state.editModalShow }
                                            onHide = { editModalClose }
                                            appointmentID = { appointmentID }
                                            doctorName = { doctorName }
                                            patientName = { patientName }
                                            appointmentDate = { appointmentDate } />
                                    </ButtonToolbar>
                                </td>                          
                                
                                <td>
                                    <ButtonToolbar>
                                        <Button className = "mr-2" variant='danger' onClick={ (e) => this.deleteAppointment(e, person.appointmentID) }> Delete </Button>
                                    </ButtonToolbar>                                  
                                </td>
                            </tr>) }
                    </tbody>
                </Table></div></div></div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <ButtonToolbar>
                                <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}> Add Appointment </Button>
                                <AddAppointmentModal show={this.state.addModalShow} onHide={addModalClose} />
                            </ButtonToolbar>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Appointment;