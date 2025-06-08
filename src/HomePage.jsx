import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // When redirected from Google, the Spring Boot backend will set the JWT response
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get('http://localhost:8080/google/signin', {
          withCredentials: true,
        });

        const { jwt, username, role, email, balance } = res.data;

        // Store JWT and user data
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('user', JSON.stringify({ username, role, email, balance }));

        setUser({ username, email, role, balance });
      } catch (error) {
        console.error('Authentication failed', error);
        navigate('/');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Wallet Balance: ₹{user.balance}</p>
    </div>
  );
}

export default HomePage;
