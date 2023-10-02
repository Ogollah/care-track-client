import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

function PatientListPage() {
    const [patients, setPatients] = useState([]);
    const [page, setPage] = useState(1);
    const [patientsPerPage] = useState(10);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        console.log("authen: " + authToken);

        if (!authToken) {
            console.error("Authentication token is null.");
            return;
        }

        const headers = {
            Authorization: `Bearer ${authToken}`
        };

        axios.get('http://localhost:8095/api/v1/patients', { withCredentials: true })
            .then((response) => {
                setPatients(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const indexOfLastPatient = page * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(patients.length / patientsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Patient List</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Sex</th>
                        <th>Birth Date</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPatients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.first_name}</td>
                            <td>{patient.last_name}</td>
                            <td>{patient.sex}</td>
                            <td>{patient.birth_date}</td>
                            <td>{patient.phone}</td>
                            <td>
                                <Link to={`/patient/${patient.id}`} className="btn btn-info">
                                    View Profile
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                <Pagination>
                    {pageNumbers.map((number) => (
                        <Pagination.Item
                            key={number}
                            active={number === page}
                            onClick={() => setPage(number)}
                        >
                            {number}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div>
    );
}

export default PatientListPage;
