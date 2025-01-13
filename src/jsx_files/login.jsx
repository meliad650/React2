// LoginComponent.js
import React, { useState } from 'react';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // שליפת משתמשים מה-Local Storage
    const users = JSON.parse(localStorage.getItem('authorizedUsers')) || [];

    // בדיקה אם המשתמש קיים בנתוני ה-Local Storage
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // שמירת המשתמש המחובר ב-Local Storage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      setError(''); // איפוס הודעת השגיאה
      window.location.href = '/home'; // הפניה לעמוד הבית
    } else {
      setError('שם משתמש או סיסמה אינם נכונים');
    }
  };

  return (
    <div>
      <h1>התחברות</h1>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">התחבר</button>
      </form>
    </div>
  );
}

export default LoginComponent;
