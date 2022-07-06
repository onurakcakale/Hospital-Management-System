import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export class AddDoctorModal extends Component{
    constructor(props){
        super(props);
    }

    state = {
        persons: [],
    }

    state ={
        firstName:'',
        lastName:'',
        insurance:'',
        address:'',
        phoneNumber:''
    }

    handleInput = (e) =>{
        this.setState({
          [e.target.name]:e.target.value
        })
    }

    savePersonel = async (e) => {
        e.preventDefault();
  
        const res = await axios.post('http://localhost:5000/api/doctor', this.state)
        .then(res => {
            const persons = res.data;
            this.setState({ persons });
        });

        document.location.reload(true);
    }

    render()
    {
        return(
            <div className = 'container'>
                <Modal
                    { ...this.props }
                    size = "lg"
                    aria-labelledby = "contained-modal-title-vcenter"
                    centered>
                    
                    <Modal.Header>
                        <Modal.Title id = "contained-modal-title-vcenter">
                            Add Doctor
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form onSubmit = { this.savePersonel }>
                                    <Form.Group controlId = "firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type = "text" name = "firstName" required onChange={this.handleInput} value={this.state.firstName} /> <br></br>
                                    </Form.Group>

                                    <Form.Group controlId = "lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type = "text" name = "lastName" required onChange={this.handleInput} value={this.state.lastName} /> <br></br>
                                    </Form.Group>

                                    <Form.Group controlId = "insurance">
                                        <Form.Label>Insurance</Form.Label>
                                        <Form.Control type = "text" name = "insurance" onChange={this.handleInput} value={this.state.insurance} /> <br></br>
                                    </Form.Group>

                                    <Form.Group controlId = "address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type = "text" name = "address" required onChange={this.handleInput} value={this.state.address} /> <br></br>
                                    </Form.Group>

                                    <Form.Group controlId = "phoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type = "text" name = "phoneNumber" required onChange={this.handleInput} value={this.state.phoneNumber} /> <br></br>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant = "primary" type = "submit">
                                            Add Doctor
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

export default AddDoctorModal;