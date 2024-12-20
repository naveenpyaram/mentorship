import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  IconButton,
} from '@mui/material';
import { LogOutIcon } from 'lucide-react';

const Profile = () => {
  const { email } = useParams(); // Fetch email from URL parameters
  const [isMatched, setIsMatched] = useState(null); // null for loading state
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getall');
        // Check for the email match directly when data is fetched
        const matchFound = response.data.some((profile) => profile.email === email);
        setIsMatched(matchFound);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsMatched(false);
      }
    };

    fetchData();
  }, [email]);

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login'); // Redirect to login page
  };

  const handleMentorshipMatcher = () => {
    // Logic for MentorshipMatcher
    console.log('Navigating to MentorshipMatcher');
    navigate(`/mentorshipmatcher/${email}`); // Navigate to MentorshipMatcher page
  };

  if (isMatched === null) {
    // Show a loading spinner while fetching data
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ marginTop: 5 }}>
      <Card
        sx={{
          maxWidth: 500,
          margin: '0 auto',
          padding: 3,
          position: 'relative',
        }}
      >
        {/* Logout Button at the Top-Right Corner */}
        <IconButton
          onClick={handleLogout}
          color="error"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            },
          }}
        >
          <LogOutIcon />
        </IconButton>

        <CardContent>
          <Typography variant="h5" gutterBottom>
            {isMatched ? 'Welcome Back!' : 'Profile Not Found'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {isMatched
              ? `Your email (${email}) is matched. You can proceed to view your profile.`
              : `Your email (${email}) is not matched. Please create a new profile.`}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            {isMatched ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/viewprofile/${email}`)}
                  sx={{ marginRight: 2 }}
                >
                  View Profile
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/allprofiles')}
                  sx={{ marginRight: 2 }}
                >
                  View All Profiles
                </Button>
                {/* MentorshipMatcher Button */}
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleMentorshipMatcher}
                  sx={{
                    background: 'linear-gradient(to right, #4caf50, #81c784)',
                    color: 'white',
                    marginTop : 5,
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(to right, #388e3c, #4caf50)',
                     
                    },
                  }}
                >
                  MentorshipMatcher
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate(`/createprofile/${email}`)}
              >
                Create Profile
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
