import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export class EditAppointmentModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        persons: [],
        personsDoctor: [],
        personsPatient: []
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/api/doctor`)
        .then(res => {
            const personsDoctor = res.data;
            this.setState({ personsDoctor });
        })

        axios.get(`http://localhost:5000/api/patient`)
        .then(res => {
            const personsPatient = res.data;
            this.setState({ personsPatient });
        })
    }

    handleSubmit(event)
    {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/appointment`, {
            appointmentID: event.target.appointmentID.value,
            doctorName: event.target.doctorName.value,
            patientName: event.target.patientName.value,
            appointmentDate: event.target.appointmentDate.value
        })

        .then(res => {
            const persons = res.data;
            this.setState({ persons });
        })

        document.location.reload(true);
    }

    render(){
        return (
            <div className = "container">
                <Modal
                    { ...this.props }
                    size = "lg"
                    aria-labelledby = "contained-modal-title-vcenter"
                    centered>

                    <Modal.Header>
                        <Modal.Title id = "contained-modal-title-vcenter">
                            Edit Appointment
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form onSubmit = { this.handleSubmit }>
                                    <Form.Group controlId = "appointmentID">
                                        <Form.Label hidden> Appointment ID </Form.Label>
                                        <Form.Control type = "text" name = "appointmentID" required hidden disabled defaultValue = { this.props.appointmentID } />
                                    </Form.Group>

                                    <Form.Group controlId = "doctorName">
                                        <Form.Label> Doctor Name </Form.Label>
                                        <Form.Control as = "select" name = "doctorName" defaultValue = { this.props.doctorName }>
                                            { this.state.personsDoctor.map(personDoctor =>
                                                <option key = { personDoctor.doctorID } > { personDoctor.firstName + " " + personDoctor.lastName } </option>) }
                                        </Form.Control> <br></br>
                                    </Form.Group>

                                    <Form.Group controlId = "patientName">
                                        <Form.Label> Patient Name </Form.Label>
                                        <Form.Control as = "select" name = "patientName" defaultValue = { this.props.patientName }>
                                            { this.state.personsPatient.map(personPatient =>
                                                <option key = { personPatient.patientID } > { personPatient.firstName + " " + personPatient.lastName } </option>) }
                                        </Form.Control> <br></br>
                                    </Form.Group>

                                    <Form.Group controlId = "appointmentDate">
                                        <Form.Label> Date-Time </Form.Label>
                                        <Form.Control type = "date" name = "appointmentDate" required defaultValue = { this.props.appointmentDate } />
                                    </Form.Group> <br></br>

                                    <Form.Group>
                                        <Button variant = "primary" type = "submit">
                                            Update
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant = "danger" onClick = { this.props.onHide }> Close </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EditAppointmentModal;