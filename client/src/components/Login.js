import React, { useState } from 'react';

const LoginForm = ({ role }) => {
    const [loginData, setLoginData] = useState({
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (response.ok) {
                console.log(`${role} Login successful!`);
                localStorage.setItem('token', data.access_token);
                alert(`${role} login successful!`);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="card">
                <h2>{role} Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="tel" name="phone" placeholder="Phone No" value={loginData.phone} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} required minLength="8" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
