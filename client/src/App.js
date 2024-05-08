import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landingpage from './components/adminfolder/landingpage';
import Adminlogin from './components/adminfolder/adminlogin';
import Usersignup from './components/adminfolder/usersignup';
import Loginin from './components/adminfolder/loginin';
import Dashboard from './components/dashboard/index.jsx';
import { useEffect } from 'react';
import ProtectedRoute from './components/layouts/protected-route.js';
import User from './components/user/index.jsx';

function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const getUser = async () => {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).token
      : null;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get-user`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('data:', data);
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full h-full min-h-screen m-auto">
        <span className="m-auto loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/user/signup" element={<Usersignup />} />
        <Route path="/user/login" element={<Loginin />} />
        <Route path="/user" element={<User />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
