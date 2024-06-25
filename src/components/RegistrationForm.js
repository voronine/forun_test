import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/actionsUser';

const RegistrationForm = ({ onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const registrationError = useSelector(state => state.user?.error);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!userName || !email || !telefon || !password) {
      alert('Пожалуйста, заполните все обязательные поля.');
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
      console.log('Пользователь успешно зарегистрирован!');
      onSuccess();
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <div>
      <h2>Форма регистрации</h2>
      <div>
        <label>Имя пользователя:</label>
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
        <label>Телефон:</label>
        <input
          type="text"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {registrationError && <div style={{ color: 'red' }}>{registrationError}</div>}
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
};

export default RegistrationForm;
