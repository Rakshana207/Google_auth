// src/components/GoogleSigninSuccess.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleSigninSuccess = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/google/signin', { withCredentials: true })
      .then(response => {
        // Expecting: { ..., "username": "kallarakshana", ... }
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error("Google Signin error:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      {username
        ? <h1>Welcome to agentesports - {username}</h1>
        : <p>Loading...</p>
      }
    </div>
  );
};

export default GoogleSigninSuccess;
