import React, { useState, useMemo, useEffect } from 'react';

import { Search, Filter, Users, Star, ArrowLeft, Link as LinkIcon ,Check} from 'lucide-react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
const MentorshipMatcher = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isMentorFilter, setIsMentorFilter] = useState(null);
  const [initialProfiles, setInitialProfiles] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const {email} = useParams();
  const [data,setData] = useState({});
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);
  const [gettedConnections, setGettedConnections] = useState([]);
  const [alldata,setAllData] = useState([]);

  useEffect(() => {
    const emails = acceptedConnections.map(obj => obj.email1);
    setGettedConnections(emails);
  }, [acceptedConnections]);
  console.log(gettedConnections);
  console.log(initialProfiles);
  useEffect(() => {
    if (initialProfiles.length > 0 && gettedConnections.length > 0) {
      const matchedProfiles = initialProfiles.filter(profile => gettedConnections.includes(profile.email));
      setAllData(matchedProfiles);
    }
  }, [initialProfiles, gettedConnections]);  // Triggered when either of these arrays changes
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notifications/${email}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    if (email) {
      fetchNotifications();
    }
  }, [email]);
  
  
  console.log(alldata);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/getall", {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (Array.isArray(response.data)) {
          setInitialProfiles(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
        
        setError('');
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setError(err.response?.data?.message || err.message || "An error occurred while fetching profiles");
        setInitialProfiles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8080/get/${email}`);
        setData(response.data);
      
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);
  const handleLogout = () => {
    console.log('User logged out');
    window.history.back();
    // Redirect to login page
  };

  // Extract unique skills from all profiles
  const allSkills = useMemo(() => {
    return [...new Set(initialProfiles.flatMap(profile => profile.skills || []))];
  }, [initialProfiles]);

  // Filtering and matching logic
  const filteredProfiles = useMemo(() => {
    return initialProfiles.filter(profile => {
      const matchesSearch = 
        profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.role?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.every(skill => profile.skills?.includes(skill));

      const matchesMentorFilter = isMentorFilter === null || 
        (isMentorFilter === true && profile.mentor) || 
        (isMentorFilter === false && !profile.mentor);

      return matchesSearch && matchesSkills && matchesMentorFilter;
    });
  }, [searchTerm, selectedSkills, isMentorFilter, initialProfiles]);

  // Toggle skill selection
  const toggleSkillFilter = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Handle profile selection
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  // Handle back button in sidebar
  const handleBackToList = () => {
    setSelectedProfile(null);
  };
    // Fetch connection requests
  useEffect(() => {
    const fetchConnectionRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/connection-requests/${email}`);
        setConnectionRequests(response.data);
        const connectionsResponse = await axios.get(`http://localhost:8080/accepted-connections/${email}`);
        setAcceptedConnections(connectionsResponse.data);
      } catch (error) {
        console.error("Error fetching connection requests:", error);
      }
    };

    if (email) {
      fetchConnectionRequests();
    }
  }, [email]);
  
  // Send connection request
  const sendConnectionRequest = async (receiverEmail) => {
    try {
      const response = await axios.post('http://localhost:8080/send-connection-request', {
        senderEmail: email,
        receiverEmail: receiverEmail
      });

      // Update UI to show request sent
      alert('Connection request sent successfully!');
    } catch (error) {
      console.error("Error sending connection request:", error);
      alert('Failed to send connection request. Please try again.');
    }
  };

  // Handle connection request response
  const handleConnectionRequest = async (requestId, status) => {
    try {
      const response = await axios.post('http://localhost:8080/handle-connection-request', {
        requestId,
        status // 'ACCEPTED' or 'DECLINED'
      });

      // Refresh connection requests
      const updatedRequests = await axios.get(`http://localhost:8080/connection-requests/${email}`);
      setConnectionRequests(updatedRequests.data);
      const connectionsResponse = await axios.get(`http://localhost:8080/accepted-connections/${email}`);
      setAcceptedConnections(connectionsResponse.data);

      alert(`Connection request ${status.toLowerCase()}!`);
    } catch (error) {
      console.error("Error handling connection request:", error);
      alert('Failed to process connection request. Please try again.');
    }
  };

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-red-100 text-red-700 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Error Fetching Profiles</h2>
        <p>{error}</p>
        <p className="mt-2">Please check your backend connection and try again.</p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <p className="mt-4">Loading profiles...</p>
      </div>
    );
  }

  return (
    <div>

    <Navbar name = {data.name}/>
    <div className="flex h-screen mt-12">
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col p-6 bg-gray-50">
        <div className="mb-6 sticky top-0 bg-gray-50 z-10">
          <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <Users className="mr-3" /> Mentorship Matcher
          </h1>
          <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
        >
          ← Back
        </button>
      </div>
          
          {/* Search and Filters */}
          <div className="mb-6 flex space-x-4 mt-3">
            <div className="flex-grow relative">
              <input 
                type="text" 
                placeholder="Search by name or role"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={20} />
            </div>
          </div>

          {/* Skills Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <Filter className="mr-2" /> Filter by Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkillFilter(skill)}
                  className={`
                    px-3 py-1 rounded-full text-sm 
                    ${selectedSkills.includes(skill) 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'}
                  `}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Profiles List */}
        <div className="overflow-y-auto flex-grow">
          {filteredProfiles.length === 0 ? (
            <div className="text-center text-gray-500 py-6">
              No profiles match your search criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProfiles.map(profile => (
                <div 
                  key={profile.id} 
                  className="border p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleProfileSelect(profile)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold">{profile.name}</h2>
                      <p className="text-gray-600">{profile.role}</p>
                    </div>
                    {profile.mentor && (
                      <div className="flex items-center text-yellow-500">
                        <Star className="mr-1" /> Mentor
                      </div>
                    )}
                  </div>
                   {/* Connection Request Button */}
             {profile.email !== email && (
                        <button 
                          onClick={() => sendConnectionRequest(profile.email)}
                          className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                          <LinkIcon className="mr-2" size={20} /> Connect
                        </button>
                      )}

                  <div className="mt-4">
                    <h3 className="font-semibold">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills?.map(skill => (
                        <span 
                          key={skill} 
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
              ))
              
              }
            </div>
          )}
            
        </div>
      </div>
       
        {/* Accepted Connections Section */}
        <div className="w-110 bg-white shadow-lg p-6 overflow-y-auto">
  {/* Connection Requests Section */}
  <div className="mb-6">
    <h2 className="text-xl font-bold mb-4">Connection Requests</h2>
    {connectionRequests.length === 0 ? (
      <p className="text-gray-500">No pending connection requests</p>
    ) : (
      <div className="space-y-4">
        {connectionRequests.map(request => (
          <div 
            key={request.id} 
            className="border p-12 rounded-lg bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <div className='mr-3'>
                <h3 className="font-semibold">{request.senderName}</h3>
                <p className="text-gray-600">{request.senderEmail}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleConnectionRequest(request.id, 'ACCEPTED')}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleConnectionRequest(request.id, 'DECLINED')}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Connections Section */}
  <div>
    <h2 className="text-xl font-bold mb-4 flex items-center">
      <Check className="mr-2" /> Connections
    </h2>
    {acceptedConnections.length === 0 ? (
      <p className="text-gray-500">No connections yet</p>
    ) : (
      <div className="space-y-4">
        {alldata.map(connection => (
          <div 
            key={connection.id} 
            className="border p-4 rounded-lg bg-green-50 cursor-pointer hover:bg-green-100"
            onClick={() => {
              // Find the full profile in initialProfiles
              const selectedProfile = initialProfiles.find(
                profile => profile.email === connection.email
              );
              if (selectedProfile) {
                handleProfileSelect(selectedProfile);
              }
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{connection.name}</h3>
                <p className="text-gray-600">{connection.email}</p>
                <p className="text-sm text-gray-500">{connection.role}</p>
              </div>
              <Check className="text-green-500" />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


      {/* Sidebar */}
      <div className={`
        ${selectedProfile ? 'w-96' : 'w-0 overflow-hidden'} 
        bg-white shadow-lg transition-all duration-300 ease-in-out
      `}>
        {selectedProfile && (
          <div className="p-6">
            <button 
              onClick={handleBackToList}
              className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2" /> Back to List
            </button>

            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">{selectedProfile.name}</h2>
              <p className="text-gray-600">{selectedProfile.role}</p>
              {selectedProfile.mentor && (
                <div className="flex items-center justify-center text-yellow-500 mt-2">
                  <Star className="mr-1" /> Mentor
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProfile.skills?.map(skill => (
                    <span 
                      key={skill} 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Interests</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProfile.interests?.map(interest => (
                    <span 
                      key={interest} 
                      className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProfile.mentor && selectedProfile.menteePreferences && (
                <div>
                  <h3 className="font-semibold">Mentee Preferences</h3>
                  <p className="text-gray-600">{selectedProfile.menteePreferences.join(", ")}</p>
                </div>
              )}

              {!selectedProfile.mentor && selectedProfile.mentorshipGoals && (
                <div>
                  <h3 className="font-semibold">Mentorship Goals</h3>
                  <p className="text-gray-600">{selectedProfile.mentorshipGoals}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MentorshipMatcher;