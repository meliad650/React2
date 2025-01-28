
// // // import React, { useState } from 'react';
// // // // import { useNavigate } from 'react-router-dom'; // להחזיר את זה במידת הצורך

// // // const RegisterComponent = () => {
// // //   const [username, setUsername] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [passwordVerify, setPasswordVerify] = useState('');
// // //   const [error, setError] = useState('');
// // //   // const navigate = useNavigate();

// // //   const handleUsernameChange = (event) => {
// // //     setUsername(event.target.value);
// // //   };

// // //   const handlePasswordChange = (event) => {
// // //     setPassword(event.target.value);
// // //   };

// // //   const handlePasswordVerifyChange = (event) => {
// // //     setPasswordVerify(event.target.value);
// // //   };

// // //   const handleSubmit = async (event) => {
// // //     event.preventDefault();

// // //     if (password !== passwordVerify) {
// // //       setError('הסיסמאות אינן תואמות');
// // //       return;
// // //     }

// // //     try {
// // //       // שליפת המשתמשים הקיימים מהשרת
// // //       const response = await fetch('http://localhost:3000/users');
// // //       if (!response.ok) {
// // //         throw new Error('שגיאה בשליפת נתונים מהשרת');
// // //       }

// // //       const users = await response.json();

// // //       // בדיקה אם שם המשתמש כבר קיים
// // //       if (users.some((user) => user.username === username)) {
// // //         setError('שם המשתמש כבר קיים במערכת');
// // //         return;
// // //       }

// // //       // חישוב ID חדש (ID הגבוה ביותר + 1)
// // //       const newId = Array.isArray(users) && users.length > 0 
// // //       ? Math.max(...users.map((user) => user.id || 0)) + 1 
// // //       : 1;
    
// // //       // הוספת משתמש חדש לשרת
// // //       const addUserResponse = await fetch('http://localhost:3000/users', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ id: newId, username, password }),
// // //       });

// // //       if (!addUserResponse.ok) {
// // //         throw new Error('שגיאה בהוספת המשתמש לשרת');
// // //       }

// // //       setError(''); // איפוס הודעת שגיאה
// // //       alert('הרישום בוצע בהצלחה'); // הודעה למשתמש

// // //       // הפניה לעמוד הבא או לעמוד מילוי פרטים נוספים
// // //       // navigate('/register/details', { state: { username, password } }); // יש להתאים לפי הדרישות
// // //     } catch (error) {
// // //       setError('שגיאה בתקשורת עם השרת');
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>רישום</h1>
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
// // //         <div>
// // //           <label htmlFor="passwordVerify">אימות סיסמה:</label>
// // //           <input
// // //             type="password"
// // //             id="passwordVerify"
// // //             value={passwordVerify}
// // //             onChange={handlePasswordVerifyChange}
// // //           />
// // //         </div>
// // //         {error && <p style={{ color: 'red' }}>{error}</p>}
// // //         <button type="submit">הירשם</button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default RegisterComponent;


// // import React, { useState } from 'react';
// // function RegisterComponent  ()  {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     username: '',
// //     email: '',
// //     phone: '',
// //     website: '',
// //     companyName: '',
// //     catchPhrase: '',
// //     bs: '',
// //     street: '',
// //     suite: '',
// //     city: '',
// //     zipcode: '',
// //     password: '',
// //     passwordVerify: '',
// //   });

// //   const [error, setError] = useState('');

// //   const handleChange = (event) => {
// //     const { id, value } = event.target;
// //     setFormData((prevData) => ({ ...prevData, [id]: value }));
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     if (formData.password !== formData.passwordVerify) {
// //       setError('הסיסמאות אינן תואמות');
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:3000/users');
// //       if (!response.ok) {
// //         throw new Error('שגיאה בשליפת נתונים מהשרת');
// //       }

// //       const users = await response.json();

// //       if (users.some((user) => user.username === formData.username)) {
// //         setError('שם המשתמש כבר קיים במערכת');
// //         return;
// //       }

// //       const newId = Array.isArray(users) && users.length > 0
// //         ? Math.max(...users.map((user) => user.id || 0)) + 1
// //         : 1;

// //       const newUser = {
// //         id: newId,
// //         name: formData.name,
// //         username: formData.username,
// //         email: formData.email,
// //         phone: formData.phone,
// //         website: formData.website,
// //         address: {
// //           street: formData.street,
// //           suite: formData.suite,
// //           city: formData.city,
// //           zipcode: formData.zipcode,
// //           geo: {
// //             lat: '', // ניתן להוסיף ערכים גיאוגרפיים לפי הצורך
// //             lng: ''
// //           }
// //         },
// //         company: {
// //           name: formData.companyName,
// //           catchPhrase: formData.catchPhrase,
// //           bs: formData.bs
// //         },
// //         password: formData.password, // לא מומלץ לשמור סיסמאות כך במציאות, יש להשתמש בהצפנה
// //       };

// //       const addUserResponse = await fetch('http://localhost:3000/users', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(newUser),
// //       });

// //       if (!addUserResponse.ok) {
// //         throw new Error('שגיאה בהוספת המשתמש לשרת');
// //       }

// //       setError('');
// //       alert('הרישום בוצע בהצלחה');
// //       setFormData({
// //         name: '', username: '', email: '', phone: '', website: '', companyName: '',
// //         catchPhrase: '', bs: '', street: '', suite: '', city: '', zipcode: '',
// //         password: '', passwordVerify: ''
// //       });
// //     } catch (error) {
// //       setError('שגיאה בתקשורת עם השרת');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>רישום</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label htmlFor="name">שם מלא:</label>
// //           <input type="text" id="name" value={formData.name} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="username">שם משתמש:</label>
// //           <input type="text" id="username" value={formData.username} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="email">אימייל:</label>
// //           <input type="email" id="email" value={formData.email} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="phone">טלפון:</label>
// //           <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="website">אתר:</label>
// //           <input type="text" id="website" value={formData.website} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="street">רחוב:</label>
// //           <input type="text" id="street" value={formData.street} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="suite">סוויטה:</label>
// //           <input type="text" id="suite" value={formData.suite} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="city">עיר:</label>
// //           <input type="text" id="city" value={formData.city} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="zipcode">מיקוד:</label>
// //           <input type="text" id="zipcode" value={formData.zipcode} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="companyName">שם החברה:</label>
// //           <input type="text" id="companyName" value={formData.companyName} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="catchPhrase">סיסמת החברה:</label>
// //           <input type="text" id="catchPhrase" value={formData.catchPhrase} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="bs">תחום פעילות:</label>
// //           <input type="text" id="bs" value={formData.bs} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="password">סיסמה:</label>
// //           <input type="password" id="password" value={formData.password} onChange={handleChange} />
// //         </div>
// //         <div>
// //           <label htmlFor="passwordVerify">אימות סיסמה:</label>
// //           <input type="password" id="passwordVerify" value={formData.passwordVerify} onChange={handleChange} />
// //         </div>
// //         {error && <p style={{ color: 'red' }}>{error}</p>}
// //         <button type="submit">הירשם</button>
// //         <button >לחץ כאן להתחברות</button>

// //       </form>
// //     </div>
// //   );
// // };

// // export default RegisterComponent;

// import React, { useState } from 'react';

// function RegisterComponent({ setActiveComponent }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     email: '',
//     phone: '',
//     website: '',
//     companyName: '',
//     catchPhrase: '',
//     bs: '',
//     street: '',
//     suite: '',
//     city: '',
//     zipcode: '',
//     password: '',
//     passwordVerify: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (event) => {
//     const { id, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [id]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (formData.password !== formData.passwordVerify) {
//       setError('הסיסמאות אינן תואמות');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3000/users');
//       if (!response.ok) {
//         throw new Error('שגיאה בשליפת נתונים מהשרת');
//       }

//       const users = await response.json();

//       if (users.some((user) => user.username === formData.username)) {
//         setError('שם המשתמש כבר קיים במערכת');
//         return;
//       }

//       const newId = Array.isArray(users) && users.length > 0
//         ? Math.max(...users.map((user) => user.id || 0)) + 1
//         : 1;

//       const newUser = {
//         id: newId,
//         name: formData.name,
//         username: formData.username,
//         email: formData.email,
//         phone: formData.phone,
//         website: formData.website,
//         address: {
//           street: formData.street,
//           suite: formData.suite,
//           city: formData.city,
//           zipcode: formData.zipcode,
//           geo: {
//             lat: '',
//             lng: ''
//           }
//         },
//         company: {
//           name: formData.companyName,
//           catchPhrase: formData.catchPhrase,
//           bs: formData.bs
//         },
//         password: formData.password,
//       };

//       const addUserResponse = await fetch('http://localhost:3000/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newUser),
//       });

//       if (!addUserResponse.ok) {
//         throw new Error('שגיאה בהוספת המשתמש לשרת');
//       }

//       // שמירת המשתמש הנוכחי ב-Local Storage
//       localStorage.setItem('loggedInUser', JSON.stringify(newUser));

//       setError('');
//       alert('הרישום בוצע בהצלחה');
//       setFormData({
//         name: '', username: '', email: '', phone: '', website: '', companyName: '',
//         catchPhrase: '', bs: '', street: '', suite: '', city: '', zipcode: '',
//         password: '', passwordVerify: ''
//       });

//       // מעבר לעמוד הבית
//       setActiveComponent('home');
//     } catch (error) {
//       setError('שגיאה בתקשורת עם השרת');
//     }
//   };

//   const handleNavigateToLogin = () => {
//     setActiveComponent('login');
//   };

//   return (
//     <div>
//       <h1>רישום</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">שם מלא:</label>
//           <input type="text" id="name" value={formData.name} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="username">שם משתמש:</label>
//           <input type="text" id="username" value={formData.username} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="email">אימייל:</label>
//           <input type="email" id="email" value={formData.email} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="phone">טלפון:</label>
//           <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="website">אתר:</label>
//           <input type="text" id="website" value={formData.website} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="street">רחוב:</label>
//           <input type="text" id="street" value={formData.street} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="suite">סוויטה:</label>
//           <input type="text" id="suite" value={formData.suite} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="city">עיר:</label>
//           <input type="text" id="city" value={formData.city} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="zipcode">מיקוד:</label>
//           <input type="text" id="zipcode" value={formData.zipcode} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="companyName">שם החברה:</label>
//           <input type="text" id="companyName" value={formData.companyName} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="catchPhrase">סיסמת החברה:</label>
//           <input type="text" id="catchPhrase" value={formData.catchPhrase} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="bs">תחום פעילות:</label>
//           <input type="text" id="bs" value={formData.bs} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="password">סיסמה:</label>
//           <input type="password" id="password" value={formData.password} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="passwordVerify">אימות סיסמה:</label>
//           <input type="password" id="passwordVerify" value={formData.passwordVerify} onChange={handleChange} />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//          <button type="submit">הירשם</button>
//         <button type="button" onClick={handleNavigateToLogin}>לחץ כאן להתחברות</button>
//       </form>
//     </div>
//   );
// }

// export default RegisterComponent;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function RegisterComponent({ setActiveComponent }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    password: '',
    passwordVerify: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (formData.password !== formData.passwordVerify) {
  //     setError('הסיסמאות אינן תואמות');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://localhost:3000/users');
  //     if (!response.ok) {
  //       throw new Error('שגיאה בשליפת נתונים מהשרת');
  //     }

  //     const users = await response.json();

  //     if (users.some((user) => user.username === formData.username)) {
  //       setError('שם המשתמש כבר קיים במערכת');
  //       return;
  //     }

  //     const newUser = {
  //               id: newId,
  //               name: formData.name,
  //               username: formData.username,
  //               email: formData.email,
  //               phone: formData.phone,
  //               website: formData.website,
  //               address: {
  //                 street: formData.street,
  //                 suite: formData.suite,
  //                 city: formData.city,
  //                 zipcode: formData.zipcode,
  //                 geo: {
  //                   lat: '',
  //                   lng: ''
  //                 }
  //               },
  //               company: {
  //                 name: formData.companyName,
  //                 catchPhrase: formData.catchPhrase,
  //                 bs: formData.bs
  //               },
  //               password: formData.password,
  //             };

  //     const addUserResponse = await fetch('http://localhost:3000/users', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newUser),
  //     });

  //     if (!addUserResponse.ok) {
  //       throw new Error('שגיאה בהוספת המשתמש לשרת');
  //     }

  //     setError('');
  //     alert('הרישום בוצע בהצלחה');
  //     setActiveComponent('login'); // מעבר לעמוד ההתחברות
  //   } catch (error) {
  //     setError('שגיאה בתקשורת עם השרת');
  //   }
  // };

  const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (formData.password !== formData.passwordVerify) {
          setError('הסיסמאות אינן תואמות');
          return;
        }
    
        try {
          const response = await fetch('http://localhost:3000/users');
          if (!response.ok) {
            throw new Error('שגיאה בשליפת נתונים מהשרת');
          }
    
          const users = await response.json();
    
          if (users.some((user) => user.username === formData.username)) {
            setError('שם המשתמש כבר קיים במערכת');
            return;
          }
    
          const newId = Array.isArray(users) && users.length > 0
            ? Math.max(...users.map((user) => user.id || 0)) + 1
            : 1;
    
          const newUser = {
            id: newId,
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            website: formData.password,
            address: {
              street: formData.street,
              suite: formData.suite,
              city: formData.city,
              zipcode: formData.zipcode,
              geo: {
                lat: '',
                lng: ''
              }
            },
            company: {
              name: formData.companyName,
              catchPhrase: formData.catchPhrase,
              bs: formData.bs
            },
          };
    
          const addUserResponse = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          });
    
          if (!addUserResponse.ok) {
            throw new Error('שגיאה בהוספת המשתמש לשרת');
          }
    
          // שמירת המשתמש הנוכחי ב-Local Storage
          localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    
          setError('');
          alert('הרישום בוצע בהצלחה');
          setFormData({
            name: '', username: '', email: '', phone: '', website: '', companyName: '',
            catchPhrase: '', bs: '', street: '', suite: '', city: '', zipcode: '',
            password: '', passwordVerify: ''
          });
    
          // מעבר לעמוד הבית
          setActiveComponent('home');
        } catch (error) {
          setError('שגיאה בתקשורת עם השרת');
        }
      };

  // const handleNavigateToLogin = () => {
  //   setActiveComponent('login');
  // };

   return (
    <div>
      <h1>רישום</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">שם מלא:</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="username">שם משתמש:</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">אימייל:</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="phone">טלפון:</label>
          <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
        </div>
    
        <div>
          <label htmlFor="street">רחוב:</label>
          <input type="text" id="street" value={formData.street} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="suite">סוויטה:</label>
          <input type="text" id="suite" value={formData.suite} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="city">עיר:</label>
          <input type="text" id="city" value={formData.city} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="zipcode">מיקוד:</label>
          <input type="text" id="zipcode" value={formData.zipcode} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="companyName">שם החברה:</label>
          <input type="text" id="companyName" value={formData.companyName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="catchPhrase">סיסמת החברה:</label>
          <input type="text" id="catchPhrase" value={formData.catchPhrase} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="bs">תחום פעילות:</label>
          <input type="text" id="bs" value={formData.bs} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">סיסמה:</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="passwordVerify">אימות סיסמה:</label>
          <input type="password" id="passwordVerify" value={formData.passwordVerify} onChange={handleChange} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">הירשם</button>
        <Link to="/login"><button type="button"> 
         לחץ כאן להתחברות 
         </button></Link>
      </form>
    </div>
  );
}

export default RegisterComponent;
