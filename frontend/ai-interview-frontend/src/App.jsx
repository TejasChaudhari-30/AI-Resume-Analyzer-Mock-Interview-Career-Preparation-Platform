import { useEffect } from 'react'
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
import InterviewManagement from './pages/sidebarFeatures/InterviewManagement.jsx';
import InterviewSession from './pages/Interview/InterviewSession.jsx';
import InterviewResult from './pages/Interview/InterviewResult.jsx';
import InterviewHistoryPage from './pages/Interview/InterviewHistoryPage.jsx';
import ResumeHistoryPage from './pages/resume/ResumeHistoryPage.jsx';
import { applyTheme, getStoredTheme } from './theme/theme.js';
import  Home from  "./pages/Home.jsx";
import About from './pages/About.jsx';

function App() {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>;
      <Route path="about" element={<About/>}/>;
       <Route path="/register" element={<Register/>}/>;
       <Route path="/login" element={<Login/>}/>;
       <Route path="/dashboard" element={<ProtectedRoute> <Layout> <Dashboard/> </Layout></ProtectedRoute>}/>;
       <Route path="/profile" element={<ProtectedRoute> <Layout><Profile/></Layout> </ProtectedRoute>}/>
       {/* <Route path="/resume/upload" element={<ProtectedRoute> <Layout><UploadResume/></Layout> </ProtectedRoute>}/> */}
        <Route path="/resume/resumemanager" element={<ProtectedRoute> <Layout><ResumeManagement/></Layout> </ProtectedRoute>}/>
         <Route path="/resume/review/:resumeId" element={<ProtectedRoute> <Layout><ResumeReviewPage/></Layout> </ProtectedRoute>}/>
          <Route path="/interview/interviewmanager" element={<ProtectedRoute> <Layout><InterviewManagement/></Layout> </ProtectedRoute>}/>
          <Route
    path="/interview/session/:sessionId"
    element={ <ProtectedRoute><InterviewSession/></ProtectedRoute>}
/>

             <Route path="/interview/result/:sessionId" element={<ProtectedRoute> <Layout><InterviewResult/></Layout> </ProtectedRoute>}/>
              <Route path="/interviews/history" element={<ProtectedRoute> <Layout><InterviewHistoryPage/></Layout> </ProtectedRoute>}/>
             <Route path="/resume/history" element={<ProtectedRoute> <Layout><ResumeHistoryPage/></Layout> </ProtectedRoute>}/>





    </Routes>
  )
}

export default App
