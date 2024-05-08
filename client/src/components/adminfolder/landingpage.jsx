import React from 'react';
import Banner from '../../assests/banner.jpg';
import { useNavigate } from 'react-router-dom';

export default function Landingpage() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin/login');
  };

  const handleUserLoginClick = () => {
    navigate('/user/login');
  };

  return (
    <div className="relative flex flex-col h-screen">
      <img
        src={Banner}
        alt="Home-Image"
        id="home-image"
        className="absolute inset-0 object-cover object-right w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-1 bg-gray-100 border rounded shadow-md radio-inputs w-72">
          <label className="flex-1 text-center radio">
            <input type="radio" name="radio" checked className="hidden" />
            <span
              onClick={handleAdminClick}
              className="inline-block w-full px-4 py-2 transition duration-150 ease-in-out bg-white rounded cursor-pointer name hover:bg-gray-200"
            >
              Admin
            </span>
          </label>
          <label className="flex-1 text-center radio">
            <input type="radio" name="radio" className="hidden" />
            <span
              onClick={handleUserLoginClick}
              className="inline-block w-full px-4 py-2 transition duration-150 ease-in-out bg-white rounded cursor-pointer name hover:bg-gray-200"
            >
              User
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
