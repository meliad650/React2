// RegisterComponent.js
import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom'; // להחזיר שימוש נכון ב-react-router

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [error, setError] = useState('');
  //const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordVerifyChange = (event) => {
    setPasswordVerify(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordVerify) {
      setError('הסיסמאות אינן תואמות');
      return;
    }

    // שליפת המשתמשים הקיימים מה-Local Storage
    const existingUsers = JSON.parse(localStorage.getItem('authorizedUsers')) || [];

    // בדיקה אם שם המשתמש כבר קיים
    if (existingUsers.some((user) => user.username === username)) {
      setError('שם המשתמש כבר קיים במערכת');
      return;
    }

    // הוספת המשתמש החדש למערך ושמירתו ב-Local Storage
    const updatedUsers = [...existingUsers, { username, password }];
    localStorage.setItem('authorizedUsers', JSON.stringify(updatedUsers));

    setError(''); // איפוס הודעות שגיאה

    // הפניה לעמוד הבא או לעמוד התחברות
    //navigate('/login'); // נניח שמפנים לעמוד התחברות
  };

  return (
    <div>
      <h1>רישום</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">שם משתמש:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="passwordVerify">אימות סיסמה:</label>
          <input
            type="password"
            id="passwordVerify"
            value={passwordVerify}
            onChange={handlePasswordVerifyChange}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">הירשם</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
