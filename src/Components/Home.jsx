import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg'; 

const HomePage = () => {
  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> 
      <h1 className="text-white text-8xl font-bold z-10">Book Management System</h1>
      <div className="absolute bottom-28 w-full text-center z-10">
        <Link to="/books" className="bg-white text-blue-500 px-6 py-3 rounded shadow-lg hover:bg-gray-100 transition mx-2">Check All Books</Link>
        <Link to="/issue" className="bg-white text-green-500 px-6 py-3 rounded shadow-lg hover:bg-gray-100 transition mx-2">Issue Book</Link>
        <Link to="/users" className="bg-white text-purple-500 px-6 py-3 rounded shadow-lg hover:bg-gray-100 transition mx-2">View All Users</Link>
        <Link to="/return" className="bg-white text-orange-500 px-6 py-3 rounded shadow-lg hover:bg-gray-100 transition mx-2">Return Book</Link>
        <Link to="/history" className="bg-white text-teal-500 px-6 py-3 rounded shadow-lg hover:bg-gray-100 transition mx-2">Book History</Link>
        <Link to="/total-rent" className="bg-white text-red-500 px-6 py-3 rounded shadow-lg hover:bg-gray-100 transition mx-2">Total Rent</Link>
      </div>
    </div>
  );
};

export default HomePage;
