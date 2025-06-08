import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const user = queryParams.get('username');

    if (token) {
      localStorage.setItem('jwt', token);
    }

    if (user) {
      setUsername(user);
    } else {
      // Fallback to localStorage if username isn't in query params
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear(); // Remove jwt and username
    navigate('/'); // Redirect to login page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Agentesports, {username}!</h1>
      <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Logout
      </button>
    </div>
  );
}

export default UserProfile;







// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// function UserProfile() {
//   const location = useLocation();
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const token = queryParams.get('token');
//     const user = queryParams.get('username');

//     if (token) {
//       localStorage.setItem('jwt', token);
//     }

//     if (user) {
//       setUsername(user);
//     }
//   }, [location]);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '100px' }}>
//       <h1>Welcome to Agentesports, {username}!</h1>
//     </div>
//   );
// }

// export default UserProfile;
