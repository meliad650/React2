import React, { useState } from 'react';
import '../css_files/home.css';  // קישור לקובץ ה-CSS
// import Info from './Info';
// import Todos from './Todos';
 import Posts from './Posts';
// import Albums from './Albums';

const Home = ({ userName }) => {
  const [activeComponent, setActiveComponent] = useState(''); // משתנה סטייט לבחירת הקומפוננטה המוצגת

  // פונקציה להחזיר את הקומפוננטה הנוכחית
  const renderComponent = () => {
    switch (activeComponent) {
      // case 'Info':
      //   return <Info />;
      // case 'Todos':
      //   return <Todos />;
      case 'Posts':
        return <Posts />;
      // case 'Albums':
      //   return <Albums />;
      default:
        return <p>בחר אופציה מתפריט הניווט.</p>;
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>ברוך הבא, {userName}</h1>
      </header>

      <nav className="nav-bar">
        <button onClick={() => setActiveComponent('Info')}>Info</button>
        <button onClick={() => setActiveComponent('Todos')}>Todos</button>
        <button onClick={() => setActiveComponent('Posts')}>Posts</button>
        <button onClick={() => setActiveComponent('Albums')}>Albums</button>
        <button
          onClick={() => {
            localStorage.setItem('loggedInUser', '');
            window.location.reload(); // רענון העמוד ליציאה מהחשבון
          }}
        >
          Logout
        </button>
      </nav>

      <div className="home-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Home;
