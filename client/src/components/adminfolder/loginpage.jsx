import React from "react";
import Login from "../../assests/login.png";
import { useNavigate } from "react-router-dom";

export default function Loginpage() {
    const navigate = useNavigate();

    const handleLoginPage = () => {
        if (formData.username && formData.email && formData.password) {
            navigate("/user/signup"); 
        } else {
            alert("Please fill in all fields");
        }
        
    };

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
            const response = await fetch('http://localhost:4500/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            } else {
                alert("User registration successful");
                navigate("/user/signup"); 
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
                <div className="flex justify-between items-center h-screen mx-auto p-4 border rounded shadow-md">
                    <div className="w-1/4 ml-[180px]">
                        <img src={Login} alt="Sample" className="w-full h-auto" />
                    </div>
                    <div className="w-1/2 ">
                        <form className="flex flex-col items-center w-[350px]" onSubmit={handleSubmit}>
                            <p className="text-2xl font-bold mb-4">Log In Into Your Account</p>
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
                                type="text"
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                                id="username"
                                placeholder="Enter Your Username Here"
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
                            <button onClick={handleLoginPage} type="submit" className="w-full px-6 py-2 mb-4 bg-grey-500 hover:bg-grey-600 text-black font-bold rounded">
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
