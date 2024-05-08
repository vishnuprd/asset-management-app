import React from 'react';
import Login from '../../assests/login.png';
import Company from '../../assests/company.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Usersignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: formData.password,
          }),
        },
      );
      const data = await response.json();
      console.log('user', data);
      if (!response.ok) {
        throw new Error('Registration failed');
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        alert('Registration successful');
        // navigate('/dashboard');
        window.location.href = '/dashboard';
      }

      const responseData = await response.json();
      console.log('Server Response:', responseData);

      setFormData({
        username: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between h-screen p-4 mx-auto border rounded shadow-md">
          <div className="w-1/4 ml-[180px]">
            <img src={Login} alt="Sample" className="w-full h-auto" />
          </div>
          <div className="w-1/2 ">
            <form
              className="flex flex-col items-center w-[350px]"
              onSubmit={handleSubmit}
            >
              <img src={Company} alt="Sample" className="w-[100px]" />
              <p className="mb-4 text-2xl font-bold">
                Log In Into Your Account
              </p>
              <input
                type="text"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                id="username"
                placeholder="Enter Your Username Here"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                id="email"
                placeholder="Enter Your Email-id here"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                id="password"
                placeholder="Enter Your Password Here"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-2 mb-4 font-bold text-white rounded btn btn-neutral bg-grey-500 hover:bg-grey-600"
              >
                <strong>Submit</strong>
              </button>
              <div></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
