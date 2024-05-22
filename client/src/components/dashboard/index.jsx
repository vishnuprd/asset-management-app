import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/index.jsx';
import Navbar from '../navbar/index.jsx';
import { getUser } from '../../lib/get-user.js';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [usersForAdmin, setUsersForAdmin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    employeeId: '',
    name: '',
    description: '',
    category: '',
  });
  const [tableData, setTableData] = useState([]);

  const fetchUser = async () => {
    setIsLoading(true);
    const user = await getUser();

    // check if user is an admin
    if (user.roles.includes('admin')) {
      const users = await getAllUsers();
      console.log('users', users);
      setUsersForAdmin(users);
    }
    console.log('Dashboard user', user);
    setUser(user);
    setIsLoading(false);
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('data:', data);

      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    getAssets();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('newAsset', newAsset);
    if (
      newAsset.employeeId !== '' &&
      newAsset.employeeId !== 0 &&
      newAsset.name &&
      newAsset.description &&
      newAsset.category
    ) {
      await postAsset({
        userId: newAsset.employeeId,
        name: newAsset.name,
        description: newAsset.description,
        category: newAsset.category,
      });
      setTableData([...tableData, newAsset]);
      setNewAsset({
        employeeId: '',
        name: '',
        description: '',
        category: '',
      });
      setShowForm(false);
    } else {
      alert('Please fill all fields');
    }
  };

  const getAssets = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/assets`, {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const postAsset = async (payload) => {
    try {
      const response = await fetch(
       ` ${process.env.REACT_APP_API_URL}/assets/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
          },
          body: JSON.stringify(payload),
        },
      );
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

  const _handleModalClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <Navbar user={user} />
      <Sidebar user={user} />
      <div id="dashboard" className="home-container flex flex-col ml-[360px] ">
        {user && user.roles.includes('admin') && (
          <button
            className="btn btn-outline w-[300px] ml-300 mb-70 hover:bg-black"
            onClick={toggleForm}
          >
            Add Asset
          </button>
        )}

        {showForm && (
          <div className="form-container border border-gray-300 rounded-lg p-4 w-[500px] mt-[100px]">
            <div
              className="fixed inset-0 z-10 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-center min-h-screen px-4 py-12 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <div className="w-full">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900 ml-[100px]"
                          id="modal-title"
                        >
                          Add New Employee Assets
                        </h3>
                        <div className="mt-2">
                          <form
                            className="flex flex-col"
                            onSubmit={handleSubmit}
                          >
                            <div className="mb-4">
                              <label className="my-4 text-sm">Employee:</label>
                              <select
                                name="employeeId"
                                className="w-full max-w-full select select-primary"
                                onChange={handleChange}
                                value={newAsset.employeeId}
                              >
                                <option value={0} selected>
                                  Select Employee
                                </option>
                                {usersForAdmin.map((user, index) => (
                                  <option key={index} value={user._id}>
                                    {user.username}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="text-sm">Name:</label>
                              &nbsp; &nbsp;
                              <input
                                type="text"
                                name="name"
                                value={newAsset.name}
                                onChange={handleChange}
                                placeholder="Enter Asset Name"
                                className="w-full input-field input input-bordered input-primary"
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
                                className="w-full input-field input input-bordered input-primary"
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
                                className="w-full input-field input input-bordered input-primary"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="submit"
                                className="w-1/2 mx-auto mt-4 btn btn-neutral"
                              >
                                Submit
                              </button>

                              <button
                                type="button"
                                onClick={_handleModalClose}
                                className="w-1/2 mx-auto mt-4 btn btn-active"
                              >
                                Cancel
                              </button>
                            </div>
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
                <th>Employee Name</th>
                <th>Asset Name</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.userName}</td>
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