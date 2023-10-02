import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PatientListPage() {
    const [patients, setPatients] = useState([]);

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
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.first_name}</td>
                            <td>{patient.last_name}</td>
                            <td>{patient.sex}</td>
                            <td>{patient.birth_date}</td>
                            <td>{patient.phone}</td>
                            <td>
                                <Link to={`/patient/${patient.id}`} className="btn">View Profile</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientListPage;
