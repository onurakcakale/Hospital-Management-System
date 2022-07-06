import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddDoctorModal from "./AddDoctorModal";
import EditDoctorModal from "./EditDoctorModal";
import axios from 'axios';

export class Doctor extends Component {
    constructor(props) {
        super(props);
        this.states = { addModalShow: false, editModalShow: false }
    }

    state = {
        persons: [],
    }

    refreshList() {
        axios.get(`http://localhost:5000/api/doctor`)
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

    deleteDoctor = (e, id) => {
        if (window.confirm('Are you sure?')) {
            const thidClickedFunda = e.currentTarget;
            thidClickedFunda.innerText = "Deleting";
            const res = axios
                .delete(`http://localhost:5000/api/doctor/${id}`)
        }
        document.location.reload(true);
    };

    render() {
        const { doctorID, firstName, lastName, insurance, address, phoneNumber } = this.state;

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
                            <h4 className="menu"> Doctor </h4>
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
                                        <tr key={person.doctorID}>
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
                                                            doctorID: person.doctorID,
                                                            firstName: person.firstName,
                                                            lastName: person.lastName,
                                                            insurance: person.insurance,
                                                            address: person.address,
                                                            phoneNumber: person.phoneNumber
                                                        })}> Edit
                                                    </Button>

                                                    <EditDoctorModal show={this.state.editModalShow}
                                                        onHide={editModalClose}
                                                        doctorID={doctorID}
                                                        firstName={firstName}
                                                        lastName={lastName}
                                                        insurance={insurance}
                                                        address={address}
                                                        phoneNumber={phoneNumber} />
                                                </ButtonToolbar>
                                            </td>

                                            <td>
                                                <ButtonToolbar>
                                                    <Button className="mr-2" variant='danger' onClick={(e) => this.deleteDoctor(e, person.doctorID)}> Delete </Button>
                                                </ButtonToolbar>
                                            </td>
                                        </tr>)}
                                </tbody>
                            </Table> </div> </div> </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <ButtonToolbar>
                                <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}> Add Doctor </Button>
                                <AddDoctorModal show={this.state.addModalShow} onHide={addModalClose} />
                            </ButtonToolbar>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Doctor;