import React from "react";
import Page from "../../assests/page.jpg";
import { useNavigate } from "react-router-dom";
import Company from "../../assests/company.png"

export default function Loginin() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
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
    const response = await fetch("http://localhost:4500/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    } else {
      alert("Login successful");
      navigate("/dashboard");
    }

    const responseData = await response.json();
    console.log("Server Response:", responseData);

    setFormData({
      username: "",
      password: "",
    });
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

 

  return (
    <>
      <div>
        <div className="flex justify-between items-center h-screen mx-auto p-4 border rounded shadow-md">
          <div className="w-1/4 ml-[180px]">
            <img src={Page} alt="Sample" className="w-full h-auto" />
          </div>
          <div className="w-1/2">
            <form
              className="flex flex-col items-center w-[350px]"
              onSubmit={handleSubmit}
            >
              <img src={Company} alt="Sample" className="w-[100px]" />
              <p className="text-2xl font-bold mb-4">
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
                <a className="text-blue-500 hover:text-blue-700" href="/user/signup"> started here</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
