
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landingpage from './components/adminfolder/landingpage';
import Adminsignup from './components/adminfolder/adminsignup';
import Adminlogin from './components/adminfolder/adminlogin';
import Loginpage from './components/adminfolder/loginpage';
import Loginin from './components/adminfolder/loginin';
import Dashboard from "./components/dashboard/dashboard.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/admin/signup-page" element={<Adminsignup />} />
        <Route path="/admin/login-page" element={<Adminlogin />} />
        <Route path="/user/signup-page" element={<Loginpage />} />
        <Route path="/user/signup" element={<Loginin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
        
  
    </BrowserRouter>
   
  );
}

export default App;
