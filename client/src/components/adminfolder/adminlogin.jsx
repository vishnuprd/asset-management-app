import React from 'react';
import Logo from '../../assests/logo.jpg';
import { useNavigate } from 'react-router-dom';
import Company from '../../assests/company.png';
export default function Loginpage() {
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
        `${process.env.REACT_APP_API_URL}/admin/login`,
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

      const data = await response.json();
      console.log('response', response);
      if (!response.ok) {
        throw new Error('Registration failed');
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        alert('login successful');
        // navigate('/dashboard');
        window.location.href = '/dashboard';
      }

      const responseData = await response.json();
      console.log('Server Response:', responseData);
      console.log('Response Status:', response.status);
      console.log('Response Data:', data);

      setFormData({
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between h-screen p-4 mx-auto border rounded shadow-md">
        <div className="w-1/4 ml-[180px]">
          <img src={Logo} alt="Sample" className="w-full h-auto" />
        </div>
        <div className="w-1/2">
          <form
            className="flex flex-col items-center w-[350px]"
            onSubmit={handleSubmit}
          >
            <img src={Company} alt="Sample" className="w-[100px]" />
            <p className="mb-4 text-2xl font-bold">Welcome to the Admin Page</p>
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
              id="username"
              placeholder="Enter Your Name Here"
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
            <div>
              <p className="text-sm">
                <strong>UserName:</strong> admin{' '}
              </p>
              <p className="text-sm">
                <strong>Password:</strong> admin{' '}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
