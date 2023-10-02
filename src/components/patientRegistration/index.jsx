import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PatientRegistrationForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        patient_number: '',
        first_name: '',
        last_name: '',
        sex: '',
        birth_date: '',
        phone: '',
        IDNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8095/api/v1/patient', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Redirect to the patient profile page on success
                    navigate('/patient/profile');
                }
            })
            .catch((error) => console.error('Error posting patient data', error));
    };

    const handleCancel = () => {
        // Reset the form data
        setFormData({
            patient_number: '',
            first_name: '',
            last_name: '',
            sex: '',
            birth_date: '',
            phone: '',
            IDNumber: '',
        });
    };
    return (
        <div className="container mt-4">
            <h2>Patient Registration</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="patient_number" className="form-label">
                        Patient Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="patient_number"
                        value={formData.patient_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sex" className="form-label">
                        Sex
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                    />
                    {/* <select
                        className="form-select"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="birth_date" className="form-label">
                        Birth Date
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="IDNumber" className="form-label">
                        ID Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="IDNumber"
                        value={formData.IDNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PatientRegistrationForm;
