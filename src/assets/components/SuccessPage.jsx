import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { email } = useParams(); // Retrieve the email from the URL

  const handleBackToProfile = () => {
    navigate(`/profile/${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Profile Created Successfully!</h1>
        <p className="text-gray-700 mb-6">
          Your profile has been created. You can now view your profile or return to the main page.
        </p>
        <button
          onClick={handleBackToProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back To Hme
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
