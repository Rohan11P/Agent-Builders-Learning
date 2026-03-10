import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
function Dashboard() {
  const {userData} = useSelector(state=>state.user);
  const navigate = useNavigate();
  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* back button */}
      <div className="absolute top-4 left-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
          <FaArrowLeftLong className="w-5 h-5" />
        </button>
      </div>
      <div className= 'w-full px-6 py-10 bg-gray-50 space-y-10'>
        {/* main section */}
        <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6'>
          <img src={userData?.photoUrl || userData?.name.slice(0,1).toUpperCase()} alt="Educator"
          className='w-28 h-28 rounded-full object-cover border-2 border-gray-300' />
          {/* user info */}
          <div className="text-center md:text-left space-y-1">
            <h1 className='text-2xl font-bold text-gray-800'>Welcome, {userData?.name || "Educator"} 👋</h1>
            <h1 className='text-xl font-semibold text-gray-800'>Total Earning : 0</h1>
            <p className='text-gray-600 text-sm'>{userData?.description || "Start Creating Courses for your Students"}</p>
            <h1 onClick={() => navigate("/courses")} className='px-[20px] py-[10px] border-2 border-white text-white bg-black
                          rounded-[10px] text-[18px] font-light cursor-pointer
                          transition-all duration-300
                          hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20 item-center justify-center text-center'>My Courses</h1>
          </div>
        </div>

        {/* graph section */}
        <div>

        </div>
      </div>

    </div>
  )
}

export default Dashboard