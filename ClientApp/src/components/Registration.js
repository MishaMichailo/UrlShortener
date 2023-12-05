import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Loginstyle.css';

const Registration = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isPasswordValid = (password) => {
    return password.length >= 10 && password.length <= 16 && /[a-zA-Z]/.test(password);
  };

  const handleRegistration = () => {
    const { password } = formData;

    if (!isPasswordValid(password)) {
      setRegistrationError('Password must be between 10 and 16 characters and contain letters.');
      return;
    }
    axios.post(
      'https://localhost:7213/Registration/registration',
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const token = response.data.token; 
          const userId = response.data.Id;
          localStorage.setItem('token', token); 
          localStorage.setItem('Id', userId);
          console.log('Registration successful');
          setRegistrationError(null);
          navigate('/', { replace: true });
        } else {
          console.error('Registration failed');
          if (response.data === "User with this username already exists.") {
            setRegistrationError("User with this username already exists.");
          }else{

            setRegistrationError(null);
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setRegistrationError('Error during registration(Please create passwrod not less than 10 and not gross than 16');
      });
  };

  return (
    <div>
      <h2>Registration</h2>
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
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
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
      <button onClick={handleRegistration}>Register</button>
      {registrationError && (
        <div className="error-message">
          {registrationError}
        </div>
      )}
    </div>
  );
};

export default Registration;