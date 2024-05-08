import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user }) {
  console.log('user:', user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="text-xl btn btn-ghost">
          Shiva Texyarn Limited
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <button className="avatar online placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-12 mr-[10px]">
              <span className="text-xl">
                {user && user.username.toUpperCase().charAt(0)}
              </span>
            </div>
          </button>
          <ul className="shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
