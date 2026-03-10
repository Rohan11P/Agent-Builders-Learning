import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
export const serverUrl = "http://localhost:8000"
import {ToastContainer} from "react-toastify"
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Courses from './pages/Educator/Courses'
import Dashboard from './pages/Educator/Dashboard'
import CreatCourses from './pages/Educator/CreatCourses'
import EditCourses from './pages/Educator/EditCourses'
import getCreatorCourse from './customHooks/getCreatorCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'
function App() {
    getCurrentUser()
    getCreatorCourse()
    getPublishedCourse()
    // through userData securing Routes
    
    const {userData} = useSelector(state=>state.user)
  return (
    <>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={!userData ?<SignUp/> : <Navigate to="/"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="profile" element={userData ?<Profile/> : <Navigate to="/signup"/>}/>
        <Route path="/forget" element={userData ? <ForgetPassword/> : <Navigate to="/signup"/>} />
        <Route path="/editprofile" element={userData ? <EditProfile/> : <Navigate to="/signup"/>} />
        <Route path="/allcourses" element={userData ? <AllCourses/> : <Navigate to="/signup"/>} />
        {/* Educator Routes */}
        <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard/> : <Navigate to="/signup"/>} />
        <Route path="/courses" element={userData?.role === "educator" ? <Courses/> : <Navigate to="/signup"/>} />
        <Route path="/createcourse" element={userData?.role === "educator" ? <CreatCourses/> : <Navigate to="/signup"/>} />
        <Route path="/editcourse/:courseId" element={userData?.role === "educator" ? <EditCourses/> : <Navigate to="/signup"/>} />
      </Routes>
    </>
  )
}

export default App