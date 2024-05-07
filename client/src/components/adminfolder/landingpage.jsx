import React from "react";
import Banner from "../../assests/banner.jpg";
import { useNavigate } from "react-router-dom";

export default function Landingpage() {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate("/admin/signup-page");
    }

    const handleUserLoginClick=()=>{
        navigate("/user/signup-page");
    }

    return (
        <div className="h-screen flex flex-col relative">
            <img src={Banner} alt="Home-Image" id="home-image" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="radio-inputs border rounded bg-gray-100 shadow-md p-1 w-72">
                    <label className="radio flex-1 text-center">
                        <input type="radio" name="radio" checked className="hidden" />
                        <span onClick={handleAdminClick} className="name px-4 py-2 cursor-pointer transition duration-150 ease-in-out rounded inline-block w-full bg-white hover:bg-gray-200">Admin</span>
                    </label>
                    <label className="radio flex-1 text-center">
                        <input type="radio" name="radio" className="hidden" />
                        <span onClick={handleUserLoginClick} className="name px-4 py-2 cursor-pointer transition duration-150 ease-in-out rounded inline-block w-full bg-white hover:bg-gray-200">Login</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
