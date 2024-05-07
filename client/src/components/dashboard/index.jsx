import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/index.jsx';
import Navbar from '../navbar/index.jsx';

export default function Dashboard() {
  // localStorage token ->
  const [showForm, setShowForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    employeeId: '',
    name: '',
    description: '',
    category: '',
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
      employeeId: '',
      name: '',
      description: '',
      category: '',
    });
    setShowForm(false);
  };

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = async () => {
    try {
      const response = await fetch('http://localhost:4500/api/assets');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const postAsset = async () => {
    try {
      const response = await fetch('http://localhost:4500/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAsset),
      });
      if (!response.ok) {
        throw new Error('Failed to add asset');
      }
      setNewAsset({
        name: '',
        description: '',
        userId: '',
        category: '',
      });
      getAssets();
    } catch (error) {
      console.error('Error adding asset:', error.message);
    }
  };

  return (
    <>
      <Navbar />
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
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-center justify-center min-h-screen px-4 py-12 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-[100px]" id="modal-title">Add New Employee Assets</h3>
                        <div className="mt-2">
                          <form className="flex flex-col" onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <label className="text-sm">Employee ID:</label>
                             &nbsp; &nbsp;
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
                              &nbsp; &nbsp;
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
                              &nbsp; &nbsp;
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
                              &nbsp; &nbsp;
                              <input
                                type="text"
                                name="category"
                                value={newAsset.category}
                                onChange={handleChange}
                                className="input-field"
                              />
                            </div>
                            <button type="submit" className="btn btn-primary w-[100px] mt-4 mx-auto">Submit</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 overflow-x-auto">
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
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
