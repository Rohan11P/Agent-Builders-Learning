import React, { useState, useEffect } from 'react'
import Nav from '../component/Nav'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ai from "../assets/SearchAi.png"
import { useSelector } from 'react-redux'
import Card from '../component/Card'

function AllCourses() {
    const navigate = useNavigate()
    const {courseData} = useSelector(state=>state.course)
    const [category, setCategory] = useState([])
    const [filterCourse, setFilterCourses] = useState([])

    const toggleCategory = (e) => {
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(c => c !== e.target.value))
        }else{
            setCategory(prev => [...prev, e.target.value])
        }
    }
    const applyFilter = () =>{
        if(!courseData) return
        if(category.length === 0){
            setFilterCourses(courseData) // no filter selected → show all
        } else {
            const filtered = courseData.filter(c => category.includes(c.category))
            setFilterCourses(filtered)
        }
    }
    useEffect(()=>{
        setFilterCourses(courseData)
    },[courseData])
    useEffect(()=>{
        applyFilter()
    },[category])
  return (
    <div className='flex min-h-screen bg-gray-50'>
        <Nav/>

        {/* sideBar */}
        <aside className='w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform overflow-hidden duration-300 z-5'>
            <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'><FaArrowLeftLong className='text-white cursor-pointer' onClick={()=>navigate("/")}/>Filter by Category</h2>

            <form action="" className='space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl' onSubmit={(e)=>e.preventDefault()}>
                <button className='px-[10px] py-[10px] text-[15px] bg-black text-white rounded-full font-light flex items-center justify-center gap-2 cursor-pointer'>Search with AI <img src={ai} alt="" className='w-[30px] h-[30px] rounded-full'/></button>

                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition-colors duration-200'>
                    <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'Web Development'}/> Web Development
                </label>
                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition-colors duration-200'>
                    <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'AI/ML'}/> AI/ML
                </label>
                <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition-colors duration-200'>
                    <input type="checkbox" className='accent-black w-4 h-4 rounded-md' onChange={toggleCategory} value={'Data Science'}/> Data Science
                </label>
            </form>
        </aside>

        <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]'>
            {
                filterCourse?.map((course, index)=>(
                    <Card key={index} thumbnail = {course.thumbnail} title={course.title} description={course.description} price={course.price} id={course._id}/>
                ))
            }

        </main>
    </div>
  )
}

export default AllCourses