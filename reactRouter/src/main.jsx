import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Home from './components/Pages/Home.jsx';

// const router = createBrowserRouter([
//   { 
//     path: "/", 
//     element: <Layout /> 
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>,
)
