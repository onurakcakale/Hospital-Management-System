import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddPatientModal from "./AddPatientModal";
import EditPatientModal from "./EditPatientModal";
import axios from 'axios';

export class Patient extends Component {
    constructor(props) {
        super(props);
        this.states = { addModalShow: false, editModalShow: false }
    }

    state = {
        persons: [],
    }

    refreshList() {
        axios.get(`http://localhost:5000/api/patient`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deletePatient = (e, id) => {
        if (window.confirm('Are you sure?')) {
            const thidClickedFunda = e.currentTarget;
            thidClickedFunda.innerText = "Deleting";
            const res = axios
                .delete(`http://localhost:5000/api/patient/${id}`)
        }
        document.location.reload(true);
    };

    render() {
        const { patientID, firstName, lastName, insurance, address, phoneNumber } = this.state;

        let addModalClose = () => this.setState({ addModalShow: false })
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div>
                <div className="title">
                    <h6> Hospital Management System </h6>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4 className="menu"> Patient </h4>
                        </div>
                    </div>
                    <hr></hr>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Table className="mt-4" stripped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th> First Name </th>
                                        <th> Last Name </th>
                                        <th> Insurance </th>
                                        <th> Address </th>
                                        <th> Phone Number </th>
                                        <th>  </th>
                                        <th>  </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.persons.map(person =>
                                        <tr key={person.patientID}>
                                            <td> {person.firstName} </td>
                                            <td> {person.lastName} </td>
                                            <td> {person.insurance} </td>
                                            <td> {person.address} </td>
                                            <td> {person.phoneNumber} </td>
                                            <td>
                                                <ButtonToolbar>
                                                    <Button className="mr-2" variant="info"
                                                        onClick={() => this.setState({
                                                            editModalShow: true,
                                                            patientID: person.patientID,
                                                            firstName: person.firstName,
                                                            lastName: person.lastName,
                                                            insurance: person.insurance,
                                                            address: person.address,
                                                            phoneNumber: person.phoneNumber
                                                        })}> Edit
                                                    </Button>

                                                    <EditPatientModal show={this.state.editModalShow}
                                                        onHide={editModalClose}
                                                        patientID={patientID}
                                                        firstName={firstName}
                                                        lastName={lastName}
                                                        insurance={insurance}
                                                        address={address}
                                                        phoneNumber={phoneNumber} />
                                                </ButtonToolbar>
                                            </td>

                                            <td>
                                                <ButtonToolbar>
                                                    <Button className="mr-2" variant='danger' onClick={(e) => this.deletePatient(e, person.patientID)}> Delete </Button>
                                                </ButtonToolbar>
                                            </td>
                                        </tr>)}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <ButtonToolbar>
                                <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}> Add Patient </Button>
                                <AddPatientModal show={this.state.addModalShow} onHide={addModalClose} />
                            </ButtonToolbar>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Patient;