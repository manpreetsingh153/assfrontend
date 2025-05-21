import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';


const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const recaptcha = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'https://assbackend-859f.onrender.com/api/register',
                form,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const data = res.data;
            if (res.status === 200) {
                setMessage('Registration successful. Please log in.');
                setTimeout(() => {

                    navigate('/login');
                }, 2000);
            }
            setMessage(data.message || data.error);
        } catch (error) {
            console.error('Registration failed:', error);
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <div className='mt-1'>
                <ReCAPTCHA ref={recaptcha} sitekey={'6Le70EIrAAAAAP8is3TaeHTRotpfZLxm9hc1vcze'} />
            </div>
            <button type="submit">Register</button>
            <div>Already have an account? <Link to="/login">Login</Link></div>
            <p>{message}</p>
        </form>
    );
}

export default Register