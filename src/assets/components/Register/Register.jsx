import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const validationErrors = {};

    if (!username) {
      validationErrors.username = "Username is required.";
    } else if (username.length < 5) {
      validationErrors.username = "Username must be at least 5 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Invalid email format';
    }
    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters.";
    } else if (!/[a-zA-Z]/.test(password)) {
      validationErrors.password = "Password must contain at least one letter.";
    } else if (!/[0-9]/.test(password)) {
      validationErrors.password = "Password must contain at least one number.";
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      validationErrors.password = "Password must contain at least one special character.";
    }

   

    return validationErrors;
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, stop submission
      return;
    }

    try {
      await axios.post("http://localhost:8080/register", {
        username,
        email,
        password,
        
      });

      // Reset form fields
      setUsername("");
      setEmail("");
      setPassword("");
     
      setErrorMessage("");

      // Navigate to login on successful registration
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center text-white">
        <h2 className="text-3xl font-bold tracking-wider">Create Account</h2>
        <p className="text-purple-100 mt-2">Join our community and unlock your potential</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Username Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="text-gray-400" />
          </div>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none 
              ${errors.username 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 focus:border-purple-500'}`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none 
              ${errors.email 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 focus:border-purple-500'}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="text-gray-400" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none 
              ${errors.password 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 focus:border-purple-500'}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="text-gray-400" />
            ) : (
              <Eye className="text-gray-400" />
            )}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

     

       

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 
          text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 
          transition duration-300 ease-in-out transform hover:scale-105 
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Create Account
        </button>
      </form>

      {/* Login Redirect */}
      <div className="bg-gray-100 p-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account? {' '}
          <a href="/login" className="text-purple-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  </div>
  );
}

export default Register;
