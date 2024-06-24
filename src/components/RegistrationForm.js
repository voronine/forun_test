import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/actionsUser';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const registrationError = useSelector(state => state.user?.error);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!userName || !email || !telefon || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    const userData = {
      userName,
      email,
      telefon,
      password
    };

    try {
      await dispatch(registerUser(userData));
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <div>
        <label>User Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Telefon:</label>
        <input
          type="text"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {registrationError && <div style={{ color: 'red' }}>{registrationError}</div>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegistrationForm;
