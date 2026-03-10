import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import img from "../../assets/empty.jpg"
import { TiEdit } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { serverUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';

function EditCourses() {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const { courseId } = useParams()
  const thumb = useRef();
  const [selectCourse, setSelectCourse] = useState(null)
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState("")
  const [frontendImage, setForntendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch()
  const {courseData} = useSelector(state=>state.course)
  const handleThumbnail = (e)=>{
    const file = e.target.files[0];
    if(file){
      setForntendImage(URL.createObjectURL(file));
      setBackendImage(file);
    }
  }

  const getCourseById = async()=>{
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, {withCredentials:true})
      setSelectCourse(result.data.course)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(()=>{
    if(selectCourse){
      setTitle(selectCourse.title || "")
      setSubtitle(selectCourse.subtitle || "")
      setDescription(selectCourse.description || "")
      setCategory(selectCourse.category || "")
      setLevel(selectCourse.level || "")
      setPrice(selectCourse.price || "")
      setForntendImage(selectCourse.thumbnail || img)
      setIsPublished(selectCourse?.isPublished)
    }
  },[selectCourse])

  useEffect(()=>{
    getCourseById()
  },[])

  const handleEditCourse = async () => {
    //use form data to send the data to the backed
    //formData is used because of image, image will not pass directly
    setLoading(true)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subtitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("isPublished", isPublished);
    formData.append("thumbnail", backendImage);
    try {
      const result = await axios.put(serverUrl + `/api/course/editcourse/${courseId}`, formData, {withCredentials:true})
      console.log(result.data)

      const updateData = result.data
      if(updateData.isPublished){
        const updateCourse = courseData.map(c => c._id === courseId ? updateData : c)
        if(!courseData.some(c => c._id === courseId)){
          updateCourse.push(updateData)   // if course is not in courseData then add it(during update mainly this line is for)
        }
        dispatch(setCourseData(updateCourse))
      }
      else{
        const filterCourse = courseData.filter(c => c._id !== courseId)
        dispatch(setCourseData(filterCourse))  // if course is not published then remove it from courseData
      }
      setLoading(false)
      navigate("/courses")
      toast.success("Course updated successfully")
    } catch (error) {
      console.log("Error updating course:", error)
      console.log("Error response:", error.response?.data)
      setLoading(false)
      toast.error(error.response?.data?.message || "Failed to update course")
    }
  }
  const handleRemoveCourse = async () => {
    setLoading1(true)
    try {
      const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`, {withCredentials:true})
      console.log(result.data)
      const filterCourse = courseData.filter(c => c._id !== courseId) 
      dispatch(setCourseData(filterCourse)) // remover course from courseData and update the courseData using filter
      setLoading1(false)
      navigate("/courses")
      toast.success("Course deleted successfully")
    } catch (error) {
      console.log("Error deleting course:", error)
      console.log("Error response:", error.response?.data)
      setLoading1(false)
      toast.error(error.response?.data?.message || "Failed to delete course")
    }
  }
  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      {/* top bar */}
      <div className='flex items-center justify-center gap-[20px] md:justify-between mb-6 relative'>
        <button className='absolute top-0 left-0 text-gray-600 hover:text-gray-800 cursor-pointer' onClick={()=>navigate("/courses")}>
          <FaArrowLeftLong className='w-5 h-5'/>
        </button>
        <h2 className='text-xl md:text-2xl font-semibold pl-10 md:pl-[60px] text-center md:text-left'>Add Detail Information regarding the Course</h2>
        <div className='space-x-2 space-y-2'>
          <button className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer'>
            Go to Lecture Page
          </button>
        </div>
      </div>

      {/* form details */}
      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-xl font-semibold mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'>
          {isPublished ? <button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1 cursor-pointer hover:bg-red-600 hover:text-white' onClick={()=>setIsPublished(prev=>!prev)}>Click to Unpublish</button> : <button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border-1 cursor-pointer hover:bg-green-600 hover:text-white' onClick={()=>setIsPublished(prev=>!prev)}>Click to Publish</button>}
          <button className='bg-red-600 text-white px-4 py-2 rounded-md border-1 cursor-pointer hover:bg-red-600 hover:text-white' onClick={handleRemoveCourse}>Remove Course</button>
        </div>
        <form className='space-y-6' onSubmit={e=>e.preventDefault()}>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input type="text" id='title' className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black' placeholder='Enter Course Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>

          <div>
            <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
            <input type="text" id='subtitle' className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black' placeholder='Enter Course Subtitle' value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea type="text" id='description' className='w-full border border-gray-300 rounded-md h-24 resize-none p-2 focus:outline-none focus:ring-2 focus:ring-black' placeholder='Enter Course Description' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
          </div>
          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
            {/*for category */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
              <select name="" id="" className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 bg-white focus:ring-black' onChange={(e)=>setCategory(e.target.value)} value={category}>
                <option value="">Select Category</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Development">Web Development</option>
              </select>
            </div>

            {/*for level */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select name="" id="" className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 bg-white focus:ring-black' onChange={(e)=>setLevel(e.target.value)} value={level}>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/*for price */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Price (INR)</label>
              <input type="number" id="" className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 bg-white focus:ring-black' placeholder='₹' value={price} onChange={(e)=>setPrice(e.target.value)} />
            </div>
            
          </div>
          <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Thumbnail</label>
            <input type="file" id="" hidden ref={thumb} accept='image/*'onChange={handleThumbnail}/>
          </div>

          <div className='relative w-[300px] h-[170px]'>
            <img src={frontendImage} alt="" className='w-[100%] h-[100%] border-1 border-black rounded-[5px]' onClick={()=>thumb.current.click()}/>
            <TiEdit className='w-[20px] h-[20px] absolute top-2 right-2 cursor-pointer' onClick={()=>thumb.current.click()}/>
          </div>
          <div className='flex items-center justify-end gap-2'>
            <button className='bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer hover:border-1 hover:border-black hover:bg-red-300 hover:text-white' onClick={()=>navigate("/courses")}>Cancel</button>
            <button className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer' onClick={handleEditCourse}>{loading ? <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />: "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCourses