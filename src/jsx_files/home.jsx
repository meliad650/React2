import React, { useState } from 'react';
import '../css_files/home.css';  // קישור לקובץ ה-CSS
 import Todos from './todos';
 import Posts from './Posts';
import Info from './Info';
 import AlbumDetail from './AlbumDetails'; 

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(''); // משתנה סטייט לבחירת הקומפוננטה המוצגת
const userName=JSON.parse(localStorage.getItem("loggedInUser")).name;
console.log("userName");
  // פונקציה להחזיר את הקומפוננטה הנוכחית
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Info':
        return <Info />;
       case 'Todos':
         return <Todos />;
      case 'Posts':
        return <Posts />;
      case 'Albums':
        return <AlbumDetail />;
      default:
        return <p>בחר אופציה מתפריט הניווט.</p>;
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>wellcome {userName}</h1>
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
