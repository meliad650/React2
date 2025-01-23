
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // להחזיר את זה במידת הצורך

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordVerifyChange = (event) => {
    setPasswordVerify(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordVerify) {
      setError('הסיסמאות אינן תואמות');
      return;
    }

    try {
      // שליפת המשתמשים הקיימים מהשרת
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('שגיאה בשליפת נתונים מהשרת');
      }

      const users = await response.json();

      // בדיקה אם שם המשתמש כבר קיים
      if (users.some((user) => user.username === username)) {
        setError('שם המשתמש כבר קיים במערכת');
        return;
      }

      // חישוב ID חדש (ID הגבוה ביותר + 1)
      const newId = Array.isArray(users) && users.length > 0 
      ? Math.max(...users.map((user) => user.id || 0)) + 1 
      : 1;
    
      // הוספת משתמש חדש לשרת
      const addUserResponse = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: newId, username, password }),
      });

      if (!addUserResponse.ok) {
        throw new Error('שגיאה בהוספת המשתמש לשרת');
      }

      setError(''); // איפוס הודעת שגיאה
      alert('הרישום בוצע בהצלחה'); // הודעה למשתמש

      // הפניה לעמוד הבא או לעמוד מילוי פרטים נוספים
      // navigate('/register/details', { state: { username, password } }); // יש להתאים לפי הדרישות
    } catch (error) {
      setError('שגיאה בתקשורת עם השרת');
    }
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
