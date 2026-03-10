import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';
function EditProfile() {
    const {userData} = useSelector(state=>state.user)
    const navigate = useNavigate();
    const [name,setName] = useState(userData?.name || "")
    const [bio,setBio] = useState(userData?.description || "")
    const [photoUrl,setPhotoUrl] = useState(null)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleEditProfile = async () => {
      const formData = new FormData();
      formData.append("name",name);
      formData.append("description",bio);
      if(photoUrl){ // Only append if photoUrl is selected
         formData.append("photoUrl",photoUrl);
      }

      try {
         setLoading(true);
         const result = await axios.post(serverUrl + "/api/user/profile",formData, {withCredentials:true})
         dispatch(setUserData(result.data))
         setLoading(false);
         navigate("/");
         toast.success("Profile updated successfully")
      } catch (error) {
        setLoading(false);
        console.log(error)
        toast.error(error.response.data.message);
      }
    }

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
            <div className='absolute top-4 left-4 cursor-pointer' onClick={()=>navigate("/profile")}>
                        <FaArrowLeft/>
            </div>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Edit Profile</h2>
            <form action="" className='space-y-5' onSubmit={(e) => e.preventDefault()}>
                <div className='flex flex-col items-center text-center'>
                {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-[black]' alt="" /> :
                 <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
                  {userData?.name.slice(0,1).toUpperCase()}
                  </div>}
                </div>
             <div>
                <label htmlFor="image" className='text-gray-700 font-semibold cursor-pointer'>Select Avtar</label>
            
                <input id='image' className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 hover:border-gray-800 hover:ring-gray-800 w-full cursor-pointer' type="file" accept="image/*" onChange={(e)=>setPhotoUrl(e.target.files[0])}/>
                
             </div>

             <div>
                <label htmlFor="name" className='text-gray-700 font-semibold cursor-pointer'>Name</label>
                <input id='name' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your Name' className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full' />
             </div>
    
             <div>
                <label htmlFor="email" className='text-gray-700 font-semibold cursor-pointer'>Email</label>
                <input id='email' type="email" value={userData?.email} readOnly  placeholder='Enter your Email' className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 bg-gray-100 text-gray-500 focus:ring-gray-500 w-full cursor-not-allowed'/>
             </div>

             <div>
                <label htmlFor="bio" className='text-gray-700 font-semibold cursor-pointer'>Description</label>
                <textarea id='bio' value={bio} onChange={(e)=>setBio(e.target.value)} placeholder='Write something about yourself...' className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full h-24 resize-none'/>
             </div>

             <button className='w-full bg-black text-white py-2 rounded-lg font-semibold text-lg hover:bg-gray-800 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' onClick={handleEditProfile} disabled={loading}>{loading ? <ClipLoader size={30} color='white' /> : "Save Changes"}</button>
            </form>
             
        </div>

    </div>
  )
}

export default EditProfile