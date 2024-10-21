import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider> 
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

//by wrapping <App /> with <ContextProvider>, 
//im ensuring that all components within App can access 
//the context provided by ContextProvider


//by wrapping <App /> with <BrowserRouter>, 
//im enabling routing capabilities for all components within App, 
//allowing them to use React Router's features like Link, Route, and useNavigate.
