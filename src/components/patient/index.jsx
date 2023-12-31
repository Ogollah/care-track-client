import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PatientProfilePage() {
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // Fetch patient data from the API
        fetch(`http://localhost:8095/api/v1/patient/${id}`)
            .then((response) => response.json())
            .then((data) => setPatient(data))
            .catch((error) => console.error('Error fetching patient data', error));
    }, [id]);

    const dummyPatient = {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        sex: 'Male',
        phone: '123-456-7890',
    };

    const [bmi, setBmi] = useState('');
    const [general_health, setGeneralHealth] = useState('');
    const [on_diet, setOnDiet] = useState('');
    const [taking_drugs, setTakingDrugs] = useState('');
    const [comments, setComments] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    useEffect(() => {
        if (weight && height) {
            const weightNum = parseFloat(weight);
            const heightNum = parseFloat(height);

            if (isNaN(weightNum) || isNaN(heightNum) || heightNum === 0) {
                setBmi('Invalid input');
                return;
            }

            const heightInMeters = heightNum / 100;
            const bmiValue = (weightNum / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);
        } else {
            setBmi('');
        }
    }, [weight, height]);

    const handleSubmit = () => {
        // Prepare the data to send in the POST request
        const visitData = {
            visitDate: selectedDate,
            weight,
            height,
            bmi,
            general_health,
            on_diet,
            taking_drugs,
            comments,
        };

        // Send the POST request
        fetch(`http://localhost:8095/api/v1/visit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitData),
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/patients');
                    console.log('Visit data submitted successfully');
                } else {
                    // Handle errors, e.g., show an error message to the user
                    console.error('Error submitting visit data');
                }
            })
            .catch((error) => console.error('Error submitting visit data', error));
    };

    return (
        <div className="container mt-4">
            <h2>Patient Information</h2>
            {patient ? (
                <div>
                    <p><strong>Name:</strong> {patient.first_name} {patient.last_name}</p>
                    <p><strong>Birth Date:</strong> {patient.birth_date}</p>
                    <p><strong>Sex:</strong> {dummyPatient.sex}</p>
                    <p><strong>Phone:</strong> {patient.phone}</p>
                </div>
            ) : (
                <div>
                    <p><strong>Name:</strong> {dummyPatient.firstName} {dummyPatient.lastName}</p>
                    <p><strong>Birth Date:</strong> {dummyPatient.birthDate}</p>
                    <p><strong>Sex:</strong> {dummyPatient.sex}</p>
                    <p><strong>Phone:</strong> {dummyPatient.phone}</p>
                </div>
            )}
            <hr />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Visit Form</h2>
                        <label htmlFor="weight">Date:</label>
                        <br />
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        />
                        <br />
                        <label htmlFor="weight">Weight:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <label htmlFor="height">Height:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        {bmi && (
                            <div>
                                <br />
                                <div className="form-control">
                                    <p><strong>BMI:</strong> {bmi}</p>
                                </div>
                                <br />
                                {parseFloat(bmi) < 25 ? (
                                    <div>

                                        <h3>FORM A</h3>
                                        <label htmlFor="generalHealth">General Health:</label>
                                        <select
                                            className="form-select"
                                            onChange={(e) => setGeneralHealth(e.target.value)}
                                        >
                                            <option value="Good">Good</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                        <label htmlFor="onDiet">Have you ever been on a diet to lose weight?</label>
                                        <select
                                            className="form-select"
                                            onChange={(e) => setOnDiet(e.target.value)}
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        <label htmlFor="comments">Comments:</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Comments"
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                        />
                                        <br />
                                        <div>

                                            <button class="btn" onClick={handleSubmit}>Submit Visit</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h3>FORM B Overweight</h3>
                                        <label htmlFor="generalHealth">General Health:</label>
                                        <select
                                            className="form-select"
                                            onChange={(e) => setGeneralHealth(e.target.value)}
                                        >
                                            <option value="Good">Good</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                        <label htmlFor="takingDrugs">Are you currently taking any drugs?</label>
                                        <select
                                            className="form-select"
                                            onChange={(e) => setTakingDrugs(e.target.value)}
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        <label htmlFor="comments">Comments:</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Comments"
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                        />
                                        <br />
                                        <div>

                                            <button className="btn btn-info" onClick={handleSubmit}>Submit Visit</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientProfilePage;
