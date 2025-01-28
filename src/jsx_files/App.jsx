// // import { useState } from 'react'
// //  import reactLogo from '../assets/react.svg'
// //  import viteLogo from '/vite.svg'
// // import '../App.css'
// // import LoginComponent from './login.jsx' 
// // import RegisterComponent from './register.jsx'
// // import Home from './home.jsx'

// // function App() {
// //   const [activeComponent, setActiveComponent] = useState(''); 
  
  
// //     const renderComponent = () => {
// //       switch (activeComponent) {
// //         case 'login':
// //           return <LoginComponent />;
// //          case 'register':
// //            return <RegisterComponent />;
// //         case 'Home':
// //           return <Home />;
        
// //         default:
// //           return <LoginComponent />;
// //       }};
// //       return(
// //         <div className="home-content">
// //         {renderComponent()}
// //       </div>
  
// //       );
    
// // }

// // export default App;

// import { useState } from 'react';
// import '../App.css';
// import LoginComponent from './login.jsx';
// import RegisterComponent from './register.jsx';
// import Home from './home.jsx';

// function App() {
//   const [activeComponent, setActiveComponent] = useState('login'); // ברירת מחדל: עמוד התחברות

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'login':
//         return <LoginComponent setActiveComponent={setActiveComponent} />;
//       case 'register':
//         return <RegisterComponent setActiveComponent={setActiveComponent} />;
//       case 'home':
//         return <Home />;
//       default:
//         return <LoginComponent setActiveComponent={setActiveComponent} />;
//     }
//   };

//   return <div className="home-content">{renderComponent()}</div>;
// }

// export default App;


import { useState } from 'react';
import '../css_files/App.css';
import LoginComponent from './login.jsx';
import RegisterComponent from './register.jsx';
import Home from './home.jsx';
import {Route,Routes } from 'react-router-dom'

function App(){
  // const [activeComponent, setActiveComponent] = useState('login'); // ברירת מחדל: עמוד התחברות

  // const renderComponent = () => {
  //   switch (activeComponent) {
  //     case 'login':
  //       return <LoginComponent setActiveComponent={setActiveComponent} />;
  //     case 'register':
  //       return <RegisterComponent setActiveComponent={setActiveComponent} />;
  //     case 'home':
  //       return <Home />;
  //     default:
  //       return <LoginComponent setActiveComponent={setActiveComponent} />;}}
    
  return(
    <>
<Routes>
<Route path='/home' element={<Home/>}/>
<Route path='/login' element={<LoginComponent/>}/>
<Route path='/register' element={<RegisterComponent/>}/>
</Routes>


   {/* return <div className="home-content">{renderComponent()}</div>; */}
</>
  );
};
 export default App;
