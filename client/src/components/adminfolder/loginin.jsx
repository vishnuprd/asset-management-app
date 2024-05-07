import React from "react";
import Page from "../../assests/page.jpg"
import { useNavigate } from "react-router-dom";

export default function Loginin() {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        if (formData.username && formData.password) {
            navigate("/dashboard");
        } else {
            alert("Please fill in all fields");
        }
    };

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
            const response = await fetch('http://localhost:4500/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            } else {
                alert("Login successful");
                navigate("/dashboard"); 
            }

            const responseData = await response.json();
            console.log('Server Response:', responseData);

            setFormData({
                username: '',
                password: '',
            });
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return(
        <>
            <div>
                <div className="flex justify-between items-center h-screen mx-auto p-4 border rounded shadow-md">
                    <div className="w-1/4 ml-[180px]">
                        <img src={Page} alt="Sample" className="w-full h-auto" />
                    </div>
                    <div className="w-1/2">
                        <form className="flex flex-col items-center w-[350px]" onSubmit={handleSubmit}>
                            <p className="text-2xl font-bold mb-4">Log In Into Your Account</p>
                           
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
                            <button onClick={handleDashboardClick} type="submit" className="w-full px-6 py-2 mb-4 bg-grey-500 hover:bg-grey-600 text-black font-bold rounded">
                                <strong>Submit</strong>
                            </button>
                            <div></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
