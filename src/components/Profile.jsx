import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = sessionStorage.getItem('authToken'); 

                const response = await axios.get('http://localhost:3001/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true 
                });

                setUser(response.data);
            } catch (error) {
                if (
                    (error.response && (error.response.status === 401 || error.response.status === 404)) ||
                    error.message === 'Unauthorized'
                ) {
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
                console.error('Error fetching profile:', error);
            }
        };

        fetchUser();
    }, []);
    const logout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get('http://localhost:3001/api/logout', { withCredentials: true });
            if (res.data.message === 'Logged out successfully') {
                setUser(null);
                navigate('/login');
            }

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return user ? (
        <div className="profile">
            <h2>Your Profile</h2>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Joined: {new Date(user.created_at).toLocaleString()}</p>
            <button onClick={logout}>Logout</button>
        </div >
    ) : (
        <p>Loading...</p>
    );
}

export default Profile