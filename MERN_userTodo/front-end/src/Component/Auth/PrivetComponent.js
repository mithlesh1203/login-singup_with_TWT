import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to='/signup' />;
};

export default PrivateComponent;
