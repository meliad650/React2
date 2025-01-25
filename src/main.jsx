import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './jsx_files/App.jsx'
import LoginComponent from './jsx_files/login.jsx' 
import RegisterComponent from './jsx_files/register.jsx'
import Home from './jsx_files/home.jsx'
import Posts from './jsx_files/Posts.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Home />
  </StrictMode>,
)
