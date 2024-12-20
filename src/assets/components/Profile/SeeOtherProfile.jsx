import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Backdrop } from "@mui/material";

const SeeOtherProfile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {email} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8080/get/${email}`);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching the profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      {isLoading ? (
        <div className="text-center text-white text-lg">Loading profile...</div>
      ) : error ? (
        <div className="text-center text-red-500 bg-red-100 px-4 py-3 rounded-lg">{error}</div>
      ) : data ? (
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <User className="h-6 w-6 text-indigo-500" /> <span>{data.name}</span>
          </h1>

          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {data.email}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Bio:</strong> {data.bio}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Mobile:</strong> {data.mobile}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Skills:</strong> {data.skills.join(", ")}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Interests:</strong> {data.interests.join(", ")}
          </p>
        
            <button
                        onClick={()=>{navigate(-1)}}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 items-center space-x-2"
                      >
                        <Backdrop className="h-5 w-5" /> <span>back</span>
                      </button>
        </div>
        
      ) : (
        <div className="text-center text-white">No profile data available.</div>
      )}
    </div>
  );
};

export default SeeOtherProfile;
