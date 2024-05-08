import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const routes = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'bx bxs-dashboard',
    role: ['admin', 'user'],
  },
  {
    path: '/user',
    label: 'User',
    icon: 'bx bxs-contact',
    role: ['admin'],
  },
];

export default function Sidebar({ user }) {
  const location = useLocation();

  const userRoles = user?.roles;

  const currentPath = location.pathname;

  return (
    <div className="sidebar-container">
      <div className="side-container flex flex-col w-[300px] border-r min-h-screen ml-4 mt-4 fixed ">
        <div className="flex flex-col mt-6">
          {routes.map((route) => {
            const isRoleMatch = route.role.some(
              (role) => userRoles && userRoles.includes(role),
            );

            if (!isRoleMatch) {
              return null;
            }

            return (
              <p className="flex items-center mt-4 leading-9">
                <Link
                  to={route.path}
                  smooth={true}
                  duration={200}
                  spy={true}
                  className={`${
                    route.path === currentPath ? 'text-blue-500' : 'text-black'
                  }`}
                  hashSpy={true}
                >
                  <i className={`mr-2 text-xl ${route.icon}`}></i> {route.label}
                </Link>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
