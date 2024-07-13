import React, { useState, useEffect } from 'react';

const DoctorDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchPatients(); // Fetch patients when component mounts
    }, []);

    const fetchPatients = () => {
        fetch('/patients', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                setPatients(data); // Update patients state with fetched data
            } else {
                console.error('Invalid data format for patients:', data);
            }
        })
        .catch(error => console.error('Error fetching patients:', error));
    };

    const fetchPatientDetails = (patientId) => {
        fetch(`/patients/${patientId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => response.json())
        .then(data => setSelectedPatient(data))
        .catch(error => console.error('Error fetching patient details:', error));
    };

    const handleSearch = () => {
        fetch(`/patients/search?q=${searchQuery}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.error('Error searching patients:', error));
    };

    return (
        <div>
            <h1>Doctor Dashboard</h1>
            
            <h2>Search Patients</h2>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by patient name"
            />
            <button onClick={handleSearch}>Search</button>

            {searchResults.length > 0 && (
                <div>
                    <h3>Search Results:</h3>
                    <ul>
                        {searchResults.map(patient => (
                            <li key={patient.id}>
                                {patient.name} 
                                <button onClick={() => fetchPatientDetails(patient.id)}>View Details</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <h2>Assigned Patients</h2>
            <ul>
                {patients.map(patient => ( // Ensure patients state is always an array
                    <li key={patient.id}>
                        {patient.name}
                        <button onClick={() => fetchPatientDetails(patient.id)}>View Details</button>
                    </li>
                ))}
            </ul>

            {selectedPatient && (
                <div>
                    <h2>Patient Details</h2>
                    <p>Name: {selectedPatient.name}</p>
                    <p>Age: {selectedPatient.age}</p>
                    <p>Gender: {selectedPatient.gender}</p>
                    <p>Medical History: {selectedPatient.medical_history}</p>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;

