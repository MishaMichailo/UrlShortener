import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Loginstyle.css';

function Login() {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    axios.post('https://localhost:7213/Login/login', formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const token = response.data.token;
        const isAdmin = response.data.isAdmin;
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin',isAdmin)
        if (token){
            navigate('/urlpage', { replace: true });
        }
        if (token && isAdmin) {
          navigate('/dataFromDb', { replace: true });
          }
        else {
          setError('Incorrect username or password');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Error during login');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <div className="error-message">{error}</div>}
        <p>
          Don't have an account? <span onClick={() => navigate('/registration', {replace: true})}> Register here </span>
        </p>
    </div>
  );
}

export default Login;