import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [skillFilter, setSkillFilter] = useState("");
  const [interestFilter, setInterestFilter] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const navigate = useNavigate();
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:8080/getall");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfiles(data);
        setFilteredProfiles(data);
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setError(err.message || "An error occurred while fetching profiles.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter profiles based on skills and interests
    const filtered = profiles.filter(profile => {
      const matchesSkill = !skillFilter || 
        (profile.skills && profile.skills.some(skill => 
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        ));
      
      const matchesInterest = !interestFilter || 
        (profile.interests && profile.interests.some(interest => 
          interest.toLowerCase().includes(interestFilter.toLowerCase())
        ));
      
      return matchesSkill && matchesInterest;
    });
    
    setFilteredProfiles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [skillFilter, interestFilter, profiles]);

  // Pagination logic
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewProfile = (email) => {
    // Placeholder for view profile functionality
    alert(`Viewing profile for ${email}`);
    navigate(`/seeotherprofile/${email}`);

  };

  const handleGoBack = () => {
    // Placeholder for go back functionality
    alert('Are you sure to going back');
    window.history.back();
  };

  const allSkills = [...new Set(profiles.flatMap(profile => profile.skills || []))];
  const allInterests = [...new Set(profiles.flatMap(profile => profile.interests || []))];

  // Calculate total pages
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      {/* Back Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleGoBack}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
        >
          ← Back
        </button>
      </div>

      {/* Header */}
      <div className="text-center text-white mb-8">
        <h1 className="text-3xl font-bold">User Profiles</h1>
        <p className="text-white/80">Explore and filter user profiles</p>
      </div>

      {/* Filters */}
      <div className="flex justify-center mb-8 space-x-4">
        <div className="w-1/4">
          <label className="block text-white mb-2">Filter by Skill</label>
          <input
            type="text"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            placeholder="Enter skill"
            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            list="skillsList"
          />
          <datalist id="skillsList">
            {allSkills.map((skill, index) => (
              <option key={index} value={skill} />
            ))}
          </datalist>
        </div>
        <div className="w-1/4">
          <label className="block text-white mb-2">Filter by Interest</label>
          <input
            type="text"
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            placeholder="Enter interest"
            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            list="interestsList"
          />
          <datalist id="interestsList">
            {allInterests.map((interest, index) => (
              <option key={index} value={interest} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-white">
          <p>Loading profiles...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-center">
          <p>{error}</p>
        </div>
      )}

      {/* Profiles Horizontal Scroll Container */}
      <div className="overflow-x-auto">
        {!isLoading && currentProfiles.length > 0 && (
          <div className="flex space-x-6 pb-4">
            {currentProfiles.map((profile) => (
              <div 
                key={profile.id} 
                className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-6 text-center"
              >
                <h3 className="text-lg font-bold text-indigo-600">
                  {profile.name} {profile.surname}
                </h3>
                
                {/* Optional: Display skills and interests */}
                {profile.skills && profile.skills.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 font-semibold">Skills:</p>
                    <div className="flex flex-wrap justify-center gap-1 mt-1">
                      {profile.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profile.interests && profile.interests.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 font-semibold">Interests:</p>
                    <div className="flex flex-wrap justify-center gap-1 mt-1">
                      {profile.interests.map((interest, index) => (
                        <span 
                          key={index} 
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <button
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 rounded-lg mt-4 hover:opacity-90 transition duration-300"
                  onClick={() => handleViewProfile(profile.email)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && filteredProfiles.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-white/20 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`w-10 h-10 rounded-full ${
                currentPage === index + 1 
                  ? 'bg-white text-indigo-600' 
                  : 'bg-white/20 text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-white/20 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* No Profiles Found */}
      {!isLoading && filteredProfiles.length === 0 && (
        <div className="text-center text-white">
          <p>No profiles found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default AllProfiles;