import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export class EditPatientModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        persons: [],
    }

    handleSubmit(event)
    {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/patient`, {
            patientID: event.target.patientID.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            insurance: event.target.insurance.value,
            address: event.target.address.value,
            phoneNumber: event.target.phoneNumber.value
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
                            Edit Patient
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form onSubmit = { this.handleSubmit }>
                                    <Form.Group controlId = "patientID">
                                        <Form.Label hidden> Patient ID </Form.Label>
                                        <Form.Control type = "text" name = "patientID" required hidden disabled defaultValue = { this.props.patientID } />
                                    </Form.Group>

                                    <Form.Group controlId = "firstName">
                                        <Form.Label> First Name </Form.Label>
                                        <Form.Control type = "text" name = "firstName" required defaultValue = { this.props.firstName } />
                                    </Form.Group>

                                    <Form.Group controlId = "lastName">
                                        <Form.Label> Last Name </Form.Label>
                                        <Form.Control type = "text" name = "lastName" required defaultValue = { this.props.lastName } />
                                    </Form.Group>

                                    <Form.Group controlId = "insurance">
                                        <Form.Label> Insurance </Form.Label>
                                        <Form.Control type = "text" name = "insurance" required defaultValue = { this.props.insurance } />
                                    </Form.Group>

                                    <Form.Group controlId = "address">
                                        <Form.Label> Address </Form.Label>
                                        <Form.Control type = "text" name = "address" required defaultValue = { this.props.address } />
                                    </Form.Group>

                                    <Form.Group controlId = "phoneNumber">
                                        <Form.Label> Phone Number </Form.Label>
                                        <Form.Control type = "text" name = "phoneNumber" required defaultValue = { this.props.phoneNumber } />
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

export default EditPatientModal;