import React from "react";
import Company from "../../assests/company.png";
import { useNavigate } from "react-router-dom";

export default function Signuppage() {
    const navigate = useNavigate();

    const handleAdminLoginClick = () => {
        if (formData.fullname && formData.email && formData.password) {
            navigate("/admin/login-page");
        } else {
            alert("Please fill in all fields");
        }
    };

    const [formData, setFormData] = React.useState({
        fullname: '',
        email: '',
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
            const response = await fetch('http://localhost:4500/admin/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname: formData.fullname,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            } else {
                alert("User registration successful");
                navigate("/admin/login-page"); 
            }

            const responseData = await response.json();
            console.log('Server Response:', responseData);

            setFormData({
                fullname: '',
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
                <div className="flex justify-between items-center h-screen mx-auto p-4 border rounded shadow-md">
                    <div className="w-1/4 ml-[180px]">
                        <img src={Company} alt="Sample" className="w-full h-auto" />
                    </div>
                    <div className="w-1/2">
                        <form className="flex flex-col items-center w-[350px]" onSubmit={handleSubmit}>
                            <p className="text-2xl font-bold mb-4">Sign In Into Your Account</p>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                                id="fullname"
                                placeholder="Enter Your Name Here"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                                id="email"
                                placeholder="Enter Your Email Here"
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
                            <button onClick={handleAdminLoginClick} type="submit" className="w-full px-6 py-2 mb-4 bg-grey-500 hover:bg-grey-600 text-black font-bold rounded">
                                <strong>Submit</strong>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
