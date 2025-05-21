import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const Login = () => {
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = window.grecaptcha.getResponse();

        if (!token) {
            setMessage('Please complete the reCAPTCHA');
            return;
        }
        try {
             const res = await axios.post(
                '/api/login',
                { ...form },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const data = res.data;
            setMessage(data.message || data.error);

            if (data.message === 'Login successful') {
                navigate('/profile');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setMessage('Login failed. Please try again.');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="identifier" placeholder="Username or Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <div className="g-recaptcha" data-sitekey="your_site_key"></div>
            <button type="submit">Login</button>
            <p>{message}</p>
        </form>
    );
}

export default Login