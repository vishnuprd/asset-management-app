import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Avatar from "../../components/avatar/avatar.jsx";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    employeeId: "",
    name: "",
    description: "",
    category: "",
  });
  const [tableData, setTableData] = useState([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({
      ...newAsset,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, newAsset]);
    setNewAsset({
      employeeId: "",
      name: "",
      description: "",
      category: "",
    });
    setShowForm(false);
  };

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = async () => {
    try {
      const response = await fetch("http://localhost:4500/api/assets");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const postAsset = async () => {
    try {
      const response = await fetch("http://localhost:4500/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsset),
      });
      if (!response.ok) {
        throw new Error("Failed to add asset");
      }
      setNewAsset({
        name: "",
        description: "",
        userId: "",
        category: "",
      });
      getAssets();
    } catch (error) {
      console.error("Error adding asset:", error.message);
    }
  };

  return (
    <>
      <Avatar />
      <Sidebar />
      <div id="dashboard" className="home-container flex flex-col ml-[400px] ">
        <button
          className="btn btn-outline w-[200px] ml-350 mb-70 hover:bg-black"
          onClick={toggleForm}
        >
          Add Asset
        </button>
        {showForm && (
          <div className="form-container border border-gray-300 rounded-lg p-4 w-[500px] mt-[100px]">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-sm">Employee ID:</label>
                <input
                  type="text"
                  name="employeeId"
                  value={newAsset.employeeId}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newAsset.name}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={newAsset.description}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">Category:</label>
                <input
                  type="text"
                  name="category"
                  value={newAsset.category}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-[100px] mt-4 mx-auto"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        <div className="overflow-x-auto mt-8">
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.employeeId}</td>
                  <td>{asset.name}</td>
                  <td>{asset.description}</td>
                  <td>{asset.category}</td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
