

// // // import React, { useState } from 'react';

// // // function LoginComponent() {
// // //   const [username, setUsername] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [error, setError] = useState('');

// // //   const handleUsernameChange = (event) => {
// // //     setUsername(event.target.value);
// // //   };

// // //   const handlePasswordChange = (event) => {
// // //     setPassword(event.target.value);
// // //   };

// // //   const handleSubmit = async (event) => {
// // //     event.preventDefault();

// // //     try {
// // //       // שליפת נתוני המשתמשים מהשרת
// // //       const response = await fetch('http://localhost:3000/users');
// // //       if (!response.ok) {
// // //         throw new Error('שגיאה בשליפת נתונים מהשרת');
// // //       }
// // //       const users = await response.json();
// // //       console.log(users);
// // //       // בדיקה אם המשתמש קיים בנתונים מהשרת
// // //       const user = users.find(
// // //         (u) => u.email === username && u.website === password
// // //       );

// // //       if (user) {
// // //         // שמירת המשתמש המחובר ב-Local Storage
// // //         localStorage.setItem('loggedInUser', JSON.stringify(user));

// // //         setError(''); // איפוס הודעת השגיאה
// // //         window.location.href = '/home'; // הפניה לעמוד הבית
// // //       } else {
// // //         setError('שם משתמש או סיסמה אינם נכונים');
// // //       }
// // //     } 
// // //     catch (error) {
// // //       setError('שגיאה בתקשורת עם השרת');
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>התחברות</h1>
// // //       <form onSubmit={handleSubmit}>
// // //         <div>
// // //           <label htmlFor="username">שם משתמש:</label>
// // //           <input
// // //             type="text"
// // //             id="username"
// // //             value={username}
// // //             onChange={handleUsernameChange}
// // //           />
// // //         </div>
// // //         <div>
// // //           <label htmlFor="password">סיסמה:</label>
// // //           <input
// // //             type="password"
// // //             id="password"
// // //             value={password}
// // //             onChange={handlePasswordChange}
// // //           />
// // //         </div>
// // //         {error && <p style={{ color: 'red' }}>{error}</p>}
// // //         <button type="submit">התחבר</button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default LoginComponent;

// // import React, { useState } from 'react';

// // function LoginComponent({ setActiveComponent }) {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');

// //   const handleUsernameChange = (event) => {
// //     setUsername(event.target.value);
// //   };

// //   const handlePasswordChange = (event) => {
// //     setPassword(event.target.value);
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     try {
// //       // שליפת נתוני המשתמשים מהשרת
// //       const response = await fetch('http://localhost:3000/users');
// //       if (!response.ok) {
// //         throw new Error('שגיאה בשליפת נתונים מהשרת');
// //       }
// //       const users = await response.json();
// //       console.log(users);

// //       // בדיקה אם המשתמש קיים בנתונים מהשרת
// //       const user = users.find(
// //         (u) => u.email === username && u.website === password
// //       );

// //       if (user) {
// //         // שמירת המשתמש המחובר ב-Local Storage
// //         localStorage.setItem('loggedInUser', JSON.stringify(user));

// //         setError(''); // איפוס הודעת השגיאה
// //         setActiveComponent('home'); // מעבר לעמוד הבית
// //       } else {
// //         setError('שם משתמש או סיסמה אינם נכונים');
// //       }
// //     } catch (error) {
// //       setError('שגיאה בתקשורת עם השרת');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>התחברות</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label htmlFor="username">שם משתמש:</label>
// //           <input
// //             type="text"
// //             id="username"
// //             value={username}
// //             onChange={handleUsernameChange}
// //           />
// //         </div>
// //         <div>
// //           <label htmlFor="password">סיסמה:</label>
// //           <input
// //             type="password"
// //             id="password'
// //             value={password}
// //             onChange={handlePasswordChange}
// //           />
// //         </div>
// //         {error && <p style={{ color: 'red' }}>{error}</p>}
// //         <button type="submit" >'התחבר'</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default LoginComponent;
// import React, { useState } from 'react';

// function LoginComponent({ setActiveComponent }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // שליפת נתוני המשתמשים מהשרת
//       const response = await fetch('http://localhost:3000/users');
//       if (!response.ok) {
//         throw new Error('שגיאה בשליפת נתונים מהשרת');
//       }
//       const users = await response.json();

//       // בדיקה אם המשתמש קיים בנתונים מהשרת
//       const user = users.find(
//         (u) => u.email === username && u.website === password
//       );

//       if (user) {
//         // שמירת המשתמש המחובר ב-Local Storage
//         localStorage.setItem('loggedInUser', JSON.stringify(user));

//         setError(''); // איפוס הודעת השגיאה
//         setActiveComponent('home'); // מעבר לעמוד הבית
//       } else {
//         setError('שם משתמש או סיסמה אינם נכונים');
//       }
//     } catch (error) {
//       setError('שגיאה בתקשורת עם השרת');
//     }
//   };

//   return (
//     <div>
//       <h1>התחברות</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">שם משתמש:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={handleUsernameChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">סיסמה:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit">התחבר</button>
//         <button onClick={setActiveComponent('register')}>לחץ כאן להרשמה</button>
//       </form>
//     </div>
//   );
// }

// export default LoginComponent;
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useHref } from "react-router-dom";

function LoginComponent({ setActiveComponent }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // שליפת נתוני המשתמשים מהשרת
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('שגיאה בשליפת נתונים מהשרת');
      }
      const users = await response.json();

      // בדיקה אם המשתמש קיים בנתונים מהשרת
      const user = users.find(
        (u) => u.email === username && u.website === password
      );

      if (user) {
        // שמירת המשתמש המחובר ב-Local Storage
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        setError(''); // איפוס הודעת השגיאה
        navigate('/home');
      } else {
        setError('שם משתמש או סיסמה אינם נכונים');
      }
    } catch (error) {
      setError('שגיאה בתקשורת עם השרת');
    }
  };



  return (
    <div>
      <h1>התחברות</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" >שם משתמש:</label>
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
        <Link to="/register"><button type="button"> 
         לחץ כאן להרשמה 
         </button></Link>

        
      </form>
    </div>
  );
}

export default LoginComponent;
