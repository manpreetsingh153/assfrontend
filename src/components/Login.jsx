import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
const Login = () => {
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const recaptchaRef = useRef(null);
    const [token, setToken] = useState("");
    const recaptcha = useRef();
    useEffect(() => {
        if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
                window.grecaptcha.render(recaptchaRef.current, {
                    sitekey: "6Le70EIrAAAAAP8is3TaeHTRotpfZLxm9hc1vcze",
                });
            });
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const captchaValue = recaptcha.current.getValue()
        if (!captchaValue) {
            setMessage('Please verify the reCAPTCHA!');
            // alert('Please verify the reCAPTCHA!')
        }
        const recaptchaToken = window.grecaptcha.getResponse();
        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA");
            return;
        }
        setToken(recaptchaToken);
        try {
            const res = await axios.post(
                'https://assbackend-859f.onrender.com/api/login',
                { ...form, token: recaptchaToken },
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
            <div className='mt-1'>
                <ReCAPTCHA ref={recaptcha} sitekey={'6Le70EIrAAAAAP8is3TaeHTRotpfZLxm9hc1vcze'} />
            </div>
            <button type="submit">Login</button>
            <div>Don't have an account? <Link to="/">Register</Link></div>
            <p>{message}</p>
        </form>
    );
}

export default Login