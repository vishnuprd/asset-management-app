import React from 'react';
import Page from '../../assests/page.jpg';
import Company from '../../assests/company.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Loginin() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
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
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        },
      );
      console.log('response:', response);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        localStorage.setItem('user', JSON.stringify(data));

        setFormData({
          username: '',
          password: '',
        });
        alert('Login successful');
        // navigate('/dashboard');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      const errMessage = error.message;
      alert(errMessage);
      console.error('Error during login:', error.message);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between h-screen p-4 mx-auto border rounded shadow-md">
          <div className="w-1/4 ml-[180px]">
            <img src={Page} alt="Sample" className="w-full h-auto" />
          </div>
          <div className="w-1/2">
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
                placeholder="Enter Your name Here"
                value={formData.username}
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
            <div>
              <p className="text-sm">
                Don't have an account yet? Let's get
                <a
                  className="text-blue-500 hover:text-blue-700"
                  href="/user/signup"
                >
                  {' '}
                  started here
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
