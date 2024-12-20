import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserCheck } from 'lucide-react';

const Createprofile = () => {
  const navigate = useNavigate();
  const { email } = useParams(); 
  console.log(email);// Get email from URL
  const [formData, setFormData] = useState({
    name: '',
    email: email, // Set initial value from useParams
    mobile: '',
    bio: '',
    role : '',
    skills: [],
    interests : [],
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (event) => {
    setNewSkill(event.target.value);
  };
  const handleInterestChange = (event) =>{
    setNewInterest(event.target.value);
  }

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill('');
    }
  };
  const handleAddInterest = () => {
    if (newInterest.trim() !== '') {
      setFormData({ ...formData, interests: [...formData.interests, newInterest] });
      setNewInterest('');
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
     
  };
  const handleRemoveInterest = (index) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index),
    });
     
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/addProfile', formData);
      if (response.status === 201) {
        alert('Profile created successfully!');
        navigate(`/success/${formData.email}`);
        // Navigate to view profile page with email1
      } else {
        alert('Failed to create profile.');
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('An error occurred while creating the profile.');
    }
    setFormData({
      name: '',
      email: '', // Set initial value from useParams
      mobile: '',
      bio: '',
      skills: [],
      interests : [],
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email} // Use the email from formData
            readOnly
            onChange={handleChange}// Make the field read-only since it's from URL
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
          />
        </div>
        <label htmlFor="">Role</label>
        <div className="relative">
         
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserCheck className="text-gray-400" />
          </div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none`}
          >
            <option value="">Select your role</option>
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>
        
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Skills
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="newSkill"
              name="newSkill"
              value={newSkill}
              onChange={handleSkillChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mr-2"
              placeholder="Add Skill"
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddSkill}
            >
              Add
            </button>
          </div>
          <ul className="mt-2 list-disc list-inside">
            {formData.skills.map((skill, index) => (
              <li key={index}>
                {skill}
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => handleRemoveSkill(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Interests
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="newInterest"
              name="newInterest"
              value={newInterest}
              onChange={handleInterestChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mr-2"
              placeholder="Add Skill"
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddInterest}
            >
              Add
            </button>
          </div>
          <ul className="mt-2 list-disc list-inside">
            {formData.interests.map((interest, index) => (
              <li key={index}>
                {interest}
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => handleRemoveInterest(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Createprofile;
