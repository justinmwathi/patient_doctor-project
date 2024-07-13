import React, { useState, useEffect } from 'react';
import DoctorForm from './DoctorForm'; // Assuming DoctorForm component handles adding doctors
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AdminDashboard = () => {
    // State to store list of doctors and manage form visibility
    const [doctors, setDoctors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');

    // Fetch doctors from backend on component mount
    useEffect(() => {
        fetchDoctors();
    }, []);

    // Function to fetch doctors from backend
    const fetchDoctors = () => {
        fetch('http://localhost:5555/doctors', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => console.error('Error fetching doctors:', error));
    };

    // Function to toggle visibility of the add doctor form
    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    // Function to delete a doctor
    const deleteDoctor = (doctorId) => {
        fetch(`http://localhost:5555/doctors/${doctorId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Return JSON data if response is okay
                } else {
                    throw new Error('Failed to delete doctor');
                }
            })
            .then(data => {
                // If deletion is successful, fetch updated list of doctors
                fetchDoctors();
                setDeleteMessage(data.message); // Set success message
            })
            .catch(error => {
                console.error('Error deleting doctor:', error.message);
                setDeleteMessage('Failed to delete doctor'); // Set error message
            });
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            
            {/* Button to toggle visibility of add doctor form */}
            <button onClick={toggleFormVisibility}>
                {showForm ? 'Hide Add Doctor Form' : 'Add New Doctor'}
            </button>

            {/* Conditionally render add doctor form */}
            {showForm && <DoctorForm fetchDoctors={fetchDoctors} />}

            {/* Display delete message */}
            {deleteMessage && <p>{deleteMessage}</p>}

            {/* Display list of doctors */}
            <h3>Doctors List</h3>
            <div className="doctors-list">
                {doctors.map((doctor) => (
                    <Card key={doctor.id} className="doctor-card">
                        <Card.Img variant="top" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbvcveHjjyK1d3v5sNUNfqaz-xAbJLsFyVyQ&s'} />
                        <Card.Body>
                            <Card.Title>Name:{doctor.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Specialization:{doctor.specialization}
                            </Card.Subtitle>
                            <Button variant="primary" onClick={() => deleteDoctor(doctor.id)}>Delete Doctor</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;

