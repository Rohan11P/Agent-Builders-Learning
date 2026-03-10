import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
function ExploreCourses() {
  const navigate = useNavigate()
  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>
        {/* left Top div */}
        <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] py-[20px]'>
            <span className='text-[35px] font-semibold'>Explore</span>
            <span className='text-[35px] font-semibold'>Our Courses</span> 
            <p className='text-[17px]'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </p>
            <button className='px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={()=>navigate("/allcourses")}>Explore Courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white'/></button>
        </div>

        {/* right or botom div */}
        <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>

            <div className='w-[100px] h-[130px] font-light text-[13px]
            flex flex-col gap-3 text-center'>

                <div className='w-[100px] h-[90px] bg-[#fbd9fb]
                rounded-lg flex items-center justify-center '>

                <TbDeviceDesktopAnalytics className='w-[30px] h-[30px]'/>

                </div>

                <span>Web Development</span>

            </div>
            <div className='w-[100px] h-[130px] font-light text-[13px]
            flex flex-col gap-3 text-center'>

                <div className='w-[100px] h-[90px] bg-[#fbd9fb]
                rounded-lg flex items-center justify-center '>

                <FaDatabase className='w-[25px] h-[25px]'/>

                </div>

                <span>Data Science</span>

            </div>
            <div className='w-[100px] h-[130px] font-light text-[13px]
            flex flex-col gap-3 text-center'>

                <div className='w-[100px] h-[90px] bg-[#fbd9fb]
                rounded-lg flex items-center justify-center '>

                <LuBrainCircuit className='w-[30px] h-[30px]'/>

                </div>

                <span>Machine Learning</span>

            </div>
         </div>
    </div>
  )
}

export default ExploreCourses