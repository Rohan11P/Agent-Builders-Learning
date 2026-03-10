import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setCreatorCourseData } from '../../redux/courseSlice';

function CreatCourses() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { creatorCourseData } = useSelector(state => state.course);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateCourse = async () =>  {
      setLoading(true);
      try {
        const result = await axios.post(serverUrl+"/api/course/create", {title, category}, {withCredentials: true})
        if(result.data){
          // Update Redux state with the new course
          const newCourse = result.data.course;
          const updatedCourses = creatorCourseData ? [...creatorCourseData, newCourse] : [newCourse];
          dispatch(setCreatorCourseData(updatedCourses));
          
          toast.success("course created successfully");
          navigate("/courses");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
        <div className='max-w-xl w-[600px] mx-auto p-6 bg-white rounded-lg shadow-md relative'>
            <FaArrowLeftLong className='w-5 h-5 absolute top-4 left-4 cursor-pointer' onClick={() => navigate("/courses")}/>
            <h2 className='text-2xl font-semibold mb-6 text-center'>Create Course</h2>
            <form className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
                <div>
                    <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Course Title</label>
                    <input type="text" id="title" placeholder='Enter your course title' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black' onChange={(e) => setTitle(e.target.value)} value={title}/>
                </div>
                <div>
                    <label htmlFor="cat" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
                    <select id="cat" placeholder='Select Category' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black' onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Web Development">Web Development</option>
                    </select>
                </div>
                <button className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer' disabled={loading} onClick={handleCreateCourse}>{loading ? "Creating..." : "Create Course"}</button>
            </form>
        </div>
    </div>
  )
}

export default CreatCourses