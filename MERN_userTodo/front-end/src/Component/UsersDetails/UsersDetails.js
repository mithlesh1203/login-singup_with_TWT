import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Api';

const ProductList = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await api.get('/get-users');
      if (response.data !== 'Product Not Found'){
        setUsersData(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteUser = async (emailId) => {
    try {
      await api.delete(`/delete-user/${emailId}`);
      setUsersData((prevUsers) => prevUsers.filter((user) => user.emailId !== emailId));
      window.alert('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
      window.alert('An error occurred while deleting the user.');
    }
  };

  return (
    <div className='product-list-container'>
      <h3>Users Details</h3>
      <table className='product-table'>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Email I'd</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.emailId}</td>
                <td>{user.phoneNo}</td>
                <td>
                  <button type='button' className='delete-button' onClick={() => handleDeleteUser(user.emailId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
