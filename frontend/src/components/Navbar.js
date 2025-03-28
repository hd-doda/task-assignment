import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          MERN App
        </Link>
        <div className="space-x-4">
          <Link to="/instructor-dashboard" className="text-white hover:text-gray-200">
            Instructor Dashboard
          </Link>
          <Link to="/student-dashboard" className="text-white hover:text-gray-200">
            Student Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;