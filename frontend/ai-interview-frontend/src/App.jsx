import { useState } from 'react'
import './App.css'
import {Routes,Route} from"react-router-dom";
import  Register  from "./pages/auth/register.jsx";
import Login from './pages/auth/login.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import ProtectedRoute from './components/auth/protectedRoute.jsx';
import Layout from './components/Layout.jsx';
import Profile from './pages/sidebarFeatures/profile.jsx';
import ResumeManagement from './pages/sidebarFeatures/ResumeManagement.jsx';
import ResumeReviewPage from './pages/sidebarFeatures/ResumeReviewPage.jsx';

function App() {
  return (
    <Routes>
       <Route path="/register" element={<Register/>}/>;
       <Route path="/login" element={<Login/>}/>;
       <Route path="/dashboard" element={<ProtectedRoute> <Layout> <Dashboard/> </Layout></ProtectedRoute>}/>;
       <Route path="/profile" element={<ProtectedRoute> <Layout><Profile/></Layout> </ProtectedRoute>}/>
       {/* <Route path="/resume/upload" element={<ProtectedRoute> <Layout><UploadResume/></Layout> </ProtectedRoute>}/> */}
        <Route path="/resume/resumemanager" element={<ProtectedRoute> <Layout><ResumeManagement/></Layout> </ProtectedRoute>}/>
         <Route path="/resume/review/:resumeId" element={<ProtectedRoute> <Layout><ResumeReviewPage/></Layout> </ProtectedRoute>}/>





    </Routes>
  )
}

export default App
