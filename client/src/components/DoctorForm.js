import React, { useState } from 'react';

const DoctorForm = ({ fetchDoctors }) => {
    // State to manage form inputs
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Assuming you have user_id stored in localStorage
        const user_id = localStorage.getItem('loggedInUserId');

        // Validate user_id presence
        if (!user_id) {
            console.error('User ID not found.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name); // Assuming name is a state variable
        formData.append('specialization', specialization); // Assuming specialization is a state variable
        formData.append('user_id', user_id); // Include user_id in form data

        fetch('http://localhost:5555/doctors', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add doctor');
            }
            return response.json();
        })
        .then(data => {
            // Clear form fields and update doctors list
            setName(''); // Assuming setName is a state setter for name
            setSpecialization(''); // Assuming setSpecialization is a state setter for specialization
            fetchDoctors(); // Assuming fetchDoctors is a function to fetch updated doctors list
        })
        .catch(error => console.error('Error adding doctor:', error));
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Doctor's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Specialty"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
            />
            <button type="submit">Add Doctor</button>
        </form>
    );
};

export default DoctorForm;

