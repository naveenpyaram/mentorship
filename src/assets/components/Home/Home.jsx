import React from 'react';
import { UserPlus, Users, Target, BookOpen, CodeXml, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MentorshipHomepage = () => {
 
  const navigate = useNavigate();

  const featureCards = [
    {
      icon: UserPlus,
      title: "Connect with Experts",
      description: "Find mentors across various fields tailored to your professional goals."
    },
    {
      icon: BrainCircuit,
      title: "Skill Development",
      description: "Learn from experienced professionals and accelerate your career growth."
    },
    {
      icon: CodeXml,
      title: "Diverse Opportunities",
      description: "Explore mentorship across tech, business, creative, and academic domains."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 flex flex-col">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Target className="h-12 w-12 text-teal-600" />
            <h1 className="text-4xl font-bold text-gray-800">MentorShip</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            A dynamic platform connecting passionate learners with experienced mentors across diverse fields. 
            Transform your potential, one meaningful connection at a time.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition flex items-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Login</span>
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="border-2 border-teal-500 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition flex items-center space-x-2"
            >
              <UserPlus className="h-5 w-5" />
              <span>Register</span>
            </button>
          </div>
        </div>
        
        {/* Illustrative Image Placeholder */}
        <div className="relative hidden md:block">
          <div className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform rotate-6 hover:rotate-0 transition-transform duration-300">
            <BookOpen className="h-48 w-48 mx-auto text-teal-600 opacity-70" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Your Path to Professional Growth
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featureCards.map((card, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-teal-50 to-blue-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-teal-100 rounded-full p-4 inline-block mb-4">
                  <card.icon className="h-12 w-12 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 text-white/80">
            Join thousands of professionals finding their perfect mentor match today.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition flex items-center space-x-2 mx-auto"
          >
            <UserPlus className="h-6 w-6" />
            <span>Get Started Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipHomepage;

