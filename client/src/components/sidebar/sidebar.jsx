import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
   
      <div className="sidebar-container">
        <div className="side-container flex flex-col w-[300px] border-r min-h-screen ml-4 mt-4 fixed ">
          <div className="flex flex-col mt-6">
            <p className="leading-9 mt-4 flex items-center">
              <Link to="/dashboard" smooth={true} duration={200} spy={true} hashSpy={true}>
                <i className='bx bxs-dashboard text-xl mr-2'></i> Dashboard
              </Link>
            </p>
          
            <p className="leading-9 mt-4 flex items-center">
              <Link to="/contact" smooth={true} duration={200} spy={true} hashSpy={true}>
                <i className='bx bx-cog text-xl mr-2'></i> Contact
              </Link>
            </p>
            <p className="leading-9 mt-4 flex items-center">
              <Link to="/helpcenter" smooth={true} duration={200} spy={true} hashSpy={true}>
                <i className='bx bx-phone-call text-xl mr-2'></i> Help
              </Link>
            </p>
          </div>
        </div>
      </div>
  
  );
}



 