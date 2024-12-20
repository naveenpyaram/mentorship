import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Navbar({name}) {
const navigate = useNavigate();
console.log(name);
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              <button 
                className="hover:text-gray-200"
              >
              {name}
              </button>
            </h1> 
          </div>
          <div className="relative">
            <button 
              className="text-white hover:text-gray-200" 
              onClick={() => navigate('/login')} 
            >
              Logout
            </button>
          
          </div>
        </div>
      </nav>
     
    </div>
  );
}

export default Navbar;