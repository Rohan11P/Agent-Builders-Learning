import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img from "../../assets/empty.jpg"
import { TiEdit } from "react-icons/ti";
function Courses() {
    const navigate = useNavigate();
    const { creatorCourseData } = useSelector(state=>state.course)
    
    // Ensure it's always an array (handles old localStorage format)
    const courses = Array.isArray(creatorCourseData) ? creatorCourseData : [];
    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            {/* Header section with back button and create course button */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 relative'>
                {/* Back button */}
                <div className="flex items-center">
                    <button 
                        onClick={() => navigate("/dashboard")} 
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
                    >
                        <FaArrowLeftLong className="w-5 h-5" />
                        <span className="hidden sm:inline">Back to Dashboard</span>
                    </button>
                </div>
                
                {/* Create Course button */}
                <button 
                    className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200 cursor-pointer'
                    onClick={() => navigate("/createcourse")}
                >
                    Create Course
                </button>
            </div>

            {/* Main content area */}
            <div className='flex flex-col gap-6'>
                <span className='text-2xl font-bold text-gray-800'>My Courses</span>
                {/* For large screen table */}
                <div className='hidden md:block bg-white rounded-xl shadow-md p-4 overflow-x-auto'>
                    <table className='min-w-full text-sm'>
                        <thead className='border-b bg-gray-50'>
                            <tr>
                                <th className='text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider'>Course</th>
                                <th className='text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                                <th className='text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                <th className='text-left py-3 px-4 font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>


                            {courses.map((course, index) => (

                            <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                                <td className='py-3 px-4 flex items-center gap-2'>
                                    {course?.thumbnail ? <img src={course.thumbnail} className='w-25 h-14 rounded-md object-cover' alt="" /> : <img src={img} className='w-25 h-14 rounded-md object-cover' alt="" />}<span>{course?.title}</span>
                                </td>
                                {course?.price ? <td className='py-3 px-4'>₹ {course.price}</td> : <td className='py-3 px-4'>₹ NA</td>}

                                <td className='px-4 py-3'><span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{course.isPublished ? "Published" : "Draft"}</span>

                                </td>
                                <td className='py-3 px-4'>
                                    <div className='flex items-center gap-2'>
                                        <button className='text-gray-600 hover:text-blue-800 cursor-pointer' onClick={()=>navigate(`/editcourse/${course._id}`)}><TiEdit className='w-5 h-5'/></button>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className='text-gray-500 text-center mt-4'>A list of your recent courses.</p>
                </div>

                {/* For small screen cards */}
                <div className='md:hidden space-y-3'>
                    {courses.map((course, index) => (
                        <div key={index} className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200'>
                            <div className='flex'>
                                {/* Course Image - Smaller on mobile */}
                                <div className='w-24 h-24 flex-shrink-0'>
                                    {course?.thumbnail ? (
                                        <img src={course.thumbnail} className='w-full h-full object-cover' alt="Course" />
                                    ) : (
                                        <img src={img} className='w-full h-full object-cover' alt="Course" />
                                    )}
                                </div>
                                
                                {/* Card Content */}
                                <div className='flex-1 p-3 flex flex-col justify-between'>
                                    {/* Top Section: Title and Status */}
                                    <div className='flex justify-between items-start gap-2 mb-2'>
                                        <h3 className='text-base font-semibold text-gray-800 line-clamp-2 flex-1'>
                                            {course?.title || 'Untitled Course'}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${course.isPublished ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                            {course.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </div>
                                    
                                    {/* Bottom Section: Price and Edit */}
                                    <div className='flex justify-between items-center'>
                                        <div className='text-sm'>
                                            <span className='text-gray-500 text-xs'>Price: </span>
                                            <span className='font-semibold text-gray-900'>
                                                {course?.price ? `₹ ${course.price}` : '₹ NA'}
                                            </span>
                                        </div>
                                        <button className='text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1' onClick={()=>navigate(`/editcourse/${course._id}`)}>
                                            <TiEdit className='w-5 h-5'/>
                                            <span className='text-sm font-medium'>Edit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <p className='text-gray-500 text-center text-xs py-2'>A list of your recent courses.</p>
                </div>
            </div>
        </div>
    )
}

export default Courses
