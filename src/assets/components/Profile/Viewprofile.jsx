import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { User, Edit, Trash, Save, XCircle, View } from "lucide-react";
import { Backdrop } from "@mui/material";

const Viewprofile = () => {
  const { email } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8080/get/${email}`);
        setData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/update/${email}`, formData);
      if (response.status === 200) {
        alert("Profile updated successfully!");
        setData(formData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError("An error occurred while updating the profile.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/delete/${email}`);
        if (response.status === 200) {
          alert("Profile deleted successfully!");
          navigate("/login");
        } else {
          setError("An error occurred while deleting the profile.");
        }
      } catch (error) {
        console.error("Error deleting user profile:", error);
        setError("An error occurred while deleting the profile.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      {isLoading ? (
        <div className="text-center text-white text-lg">Loading profile...</div>
      ) : error ? (
        <div className="text-center text-red-500 bg-red-100 px-4 py-3 rounded-lg">{error}</div>
      ) : isEditing ? (
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Bio:</label>
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Mobile:</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Skills:</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    skills: e.target.value.split(",").map((skill) => skill.trim()),
                  }))
                }
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Interests:</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    interests: e.target.value.split(",").map((interest) => interest.trim()),
                  }))
                }
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          

            <div>
              <label className="block text-gray-600 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
            >
              <Save className="h-5 w-5" /> <span>Save</span>
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center space-x-2"
            >
              <XCircle className="h-5 w-5" /> <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <User className="h-6 w-6 text-indigo-500" /> <span>{data.name}</span>
          </h1>

          <p className="text-gray-600 mb-2">Email: {data.email}</p>
          <p className="text-gray-600 mb-2">Role: {data.role}</p>
          <p className="text-gray-600 mb-2">Bio: {data.bio}</p>
          <p className="text-gray-600 mb-2">Mobile: {data.mobile}</p>
          <p className="text-gray-600 mb-2">Skills: {data.skills.join(", ")}</p>
          <p className="text-gray-600 mb-2">Interests: {data.interests.join(", ")}</p>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-2"
            >
              <Trash className="h-5 w-5" /> <span>Delete</span>
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
            >
              <Edit className="h-5 w-5" /> <span>Edit</span>
            </button>
            <button
              onClick={()=>{navigate(-1)}}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center space-x-2"
            >
              <Backdrop className="h-5 w-5" /> <span>back</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewprofile;
