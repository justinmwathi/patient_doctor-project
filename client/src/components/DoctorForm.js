import React, { useState } from 'react';

const DoctorForm = ({ fetchDoctors }) => {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('specialization', specialization);

        try {
            const response = await fetch('http://localhost:5555/doctors', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to add doctor');
            }

            fetchDoctors(); // Fetch updated list of doctors after adding
            setName(''); // Reset form fields after successful submission
            setSpecialization('');
            setError('');
        } catch (error) {
            setError('Error adding doctor: ' + error.message);
            console.error('Error adding doctor:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Specialization:</label>
                <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={isLoading}>{isLoading ? 'Adding...' : 'Add Doctor'}</button>
        </form>
    );
};

export default DoctorForm;



