import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/index.jsx';
import Navbar from '../navbar/index.jsx';
import { getUser } from '../../lib/get-user.js';

const User = () => {
  const [user, setUser] = useState(null);
  const [tableData, setTableData] = useState([]);
  const fetchUser = async () => {
    const user = await getUser();

    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
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
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  return (
    <>
      <Navbar />
      <Sidebar user={user} />
      <div id="dashboard" className="home-container flex flex-col ml-[360px] ">
        <div className="mt-8 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>User Name</th>
                <th>Email</th>
                {/* <th>Description</th>
                <th>Category</th> */}
              </tr>
            </thead>
            <tbody>
              {tableData.map((user, index) => (
                <tr key={index}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  {/* <td>{asset.description}</td>
                  <td>{asset.category}</td> */}
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default User;
