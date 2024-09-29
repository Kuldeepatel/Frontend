import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Book Management</h1>
        <div>
          <Link to="/" className="text-white px-4 hover:underline">Home</Link>
          <Link to="/books" className="text-white px-4 hover:underline">Check All Books</Link>
          <Link to="/issue" className="text-white px-4 hover:underline">Issue Book</Link>
          <Link to="/users" className="text-white px-4 hover:underline">View All Users</Link>
          <Link to="/return" className="text-white px-4 hover:underline">Return Book</Link>
          <Link to="/history" className="text-white px-4 hover:underline">Book History</Link>
          <Link to="/userhistory" className="text-white px-4 hover:underline">User History</Link>
          <Link to="/range" className="text-white px-4 hover:underline">Range BookIssue</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
