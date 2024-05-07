import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landingpage from './components/adminfolder/landingpage';
import Adminlogin from './components/adminfolder/adminlogin';
import Usersignup from './components/adminfolder/usersignup';
import Loginin from './components/adminfolder/loginin';
import Dashboard from './components/dashboard/index.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/user/signup" element={<Usersignup/>} />
        <Route path="/user/login" element={<Loginin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
