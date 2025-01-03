import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        dispatch(logout()); 
        alert('Logged out successfully!');
        navigate('/login'); 
      } catch (error) {
        console.error('Logout Error:', error);
        alert('An error occurred while logging out. Please try again.');
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default Logout;
