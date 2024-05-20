import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";

import LoginSignup from "./Components/LoginSignup/LoginSignup";
import CreateSongForm from "./Components/SongForm/songceateform";
import VersionDashboard from './Components/SongDashboard/VersionDashboard';
import ColaboratorsDashboard from './Components/SongDashboard/ColaboratorsDashboard';
import ChatDashboard from './Components/SongDashboard/ChatDashboard';
import ColabDashboard from './Components/SongDashboard/ColabDashboard';
import ProjectDashboard from './Components/UserDashboard/ProjectDashboard';
import ColabprojectDashboard from './Components/UserDashboard/ColabprojectsDashboard';
import MyfilesDashboard from './Components/UserDashboard/MyfilesDashboard';
import Dashboard from './Components/UserDashboard/Dashboard';
import UserProfileForm from './Components/Profile Edit Form/Form';
import UserProfile from './Components/Profile Edit Form/Profile_user';
import AddFile from './Components/SongDashboard/Add file/AddFile';
// import Landing from './Components/Landing/Landing';

let email=localStorage.getItem('userEmail')
console.log(email);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/AddFile" element={<AddFile/>} />
        <Route path="/UserProfile" element={<UserProfile/>} />
        <Route path="/UserProfileForm" element={<UserProfileForm/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/MyfilesDashboard" element={<MyfilesDashboard/>} />
        <Route path="/ColabprojectDashboard" element={<ColabprojectDashboard/>} />
        <Route path="/ProjectDashboard" element={<ProjectDashboard/>} />
        <Route path="/VersionDashboard" element={<VersionDashboard/>} />
        <Route path="/ColaboratorsDashboard" element={<ColaboratorsDashboard/>} />
        <Route path="/ChatDashboard" element={<ChatDashboard/>} />
        <Route path="/ColabDashboard" element={<ColabDashboard/>} />
        <Route path="/" element={<LoginSignup />} />
        <Route path="/CreateSongForm" element={<CreateSongForm />} />
        {/* <Route path="/Landing" element={<Landing />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
