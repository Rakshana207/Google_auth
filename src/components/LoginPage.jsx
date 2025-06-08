import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleGoogleLogin = () => {
  window.location.href = 'https://agentesports-backend-api-dev.onrender.com/oauth2/authorization/google';
};
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://agentesports-backend-api-dev.onrender.com/api/auth/login', {
        username,
        password
      });

      // Save JWT token
      localStorage.setItem('jwt', response.data.jwt);
      localStorage.setItem('username', response.data.username); // Save for next page

      // Redirect to user profile page
      navigate('/userprofile');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <form onSubmit={handleLogin}>
        <h2>Login to Agentesports</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '10px' }}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '10px' }}
        /><br />
        <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleGoogleLogin} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Sign in with Google
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
