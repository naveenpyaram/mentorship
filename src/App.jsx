import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './assets/components/Home/Home'
import Login from './assets/components/Login/Login'
import Register from './assets/components/Register/Register'
import Profile from './assets/components/Profile/Profile'
import AllProfiles from './assets/components/Profile/AllProfiles'
import Viewprofile from './assets/components/Profile/Viewprofile'
import Createprofile from './assets/components/Profile/Createprofile'
import SeeOtherProfile from './assets/components/Profile/SeeOtherProfile'
import SuccessPage from './assets/components/SuccessPage'
import MentorshipMatcher from './assets/components/MentorshipMatcher'
function App() {
  
  return (
    <>
   <Routes>
    <Route path='/' element = {<Home />} />
    <Route path='login' element = {<Login />} />
    <Route path='register' element = {<Register />} />
    <Route path='profile/:email' element = {<Profile />} />
    <Route path = 'allprofiles' element = {<AllProfiles />} />
    <Route path="/viewprofile/:email" element={<Viewprofile />} />
    <Route path = '/createprofile/:email' element = {<Createprofile />} />
    <Route path = 'seeotherprofile/:email' element = {<SeeOtherProfile />} />
    <Route path="/success/:email" element={<SuccessPage />} />
    <Route path="/mentorshipmatcher/:email" element={<MentorshipMatcher />} />
   </Routes>
 
    </>
  )
}

export default App
