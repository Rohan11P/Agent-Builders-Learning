import React, { useState } from "react";
import logo from "../assets/logo.png";
import { IoPersonCircle, IoMenu, IoClose } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
function Nav() {
  const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const  { userData } = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const [show, setshow] = useState(false);
    const handleLogOut = async () => {
        try {
          const result = await axios.post(serverUrl + "/api/auth/logout", {}, {withCredentials:true});
          console.log(result);
          dispatch(setUserData(null));
          setshow(false);
          toast.success(result.data.message);
          localStorage.removeItem("token");
          
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message);
        }
    }
  return (
    <>
      {/* Navbar */}
      <div className="w-full h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] backdrop-blur-md z-20">
        
        {/* Logo */}
        <div className="lg:w-[20%] w-[50%] lg:pl-[50px]">
          <img
            src={logo}
            alt="logo"
            className="w-[55px] sm:w-[60px] rounded-[5px] border-2 border-white cursor-pointer" onClick={() => (navigate("/"))}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center gap-4">
          {!userData && <IoPersonCircle className="w-[45px] h-[45px] fill-black cursor-pointer" onClick={()=>setshow(!show)} />}
        {userData?.photoUrl && <img src={userData?.photoUrl} className="w-[60px] h-[60px] rounded-full cursor-pointer" alt=""onClick={()=>setshow(!show)} />}
        {userData && !userData?.photoUrl && <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
        onClick={()=>setshow(!show)}>
        {userData?.name.slice(0,1).toUpperCase()}
        </div>}
          {/* Dashboard */}
          {userData?.role ===  "educator" && <div className="px-[20px] py-[10px] border-2 border-white text-white bg-black
                          rounded-[10px] text-[18px] font-light cursor-pointer
                          transition-all duration-300
                          hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20" onClick={() => {navigate("/dashboard")}}>
            Dashboard
          </div>}

          {/* Login */}
          {!userData ? <span className="px-[20px] py-[10px] border-2 border-white text-white
                            rounded-[10px] text-[18px] font-light cursor-pointer
                            bg-[#000000d5]
                            transition-all duration-300
                            hover:bg-[#1AB0A4] hover:border-[#1AB0A4] hover:text-black
                            hover:shadow-lg hover:shadow-[#1AB0A4]/40" onClick={() => navigate("/login")}>
            Login
          </span> : 

        <span className="px-[20px] py-[10px] bg-white text-black
                            rounded-[10px] text-[18px] font-light cursor-pointer
                            shadow-sm shadow-black
                            transition-all duration-300
                            hover:bg-red-500 hover:text-white
                            hover:shadow-lg hover:shadow-red-500/40"
                            onClick={handleLogOut}>                            
            Logout
          </span>}
          {show && <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white text-black px-[15px] py-[10px] border-2 border-black shadow-lg z-50 hover:bg-black hover:text-white transition-colors duration-200">
            <span className="cursor-pointer hover:text-[#1AB0A4] font-medium transition-colors duration-200" onClick={() => navigate("/profile")}>My Profile</span>
            <span className="w-full h-[1px] bg-gray-300"></span>
            <span className="cursor-pointer hover:text-[#1AB0A4] font-medium transition-colors duration-200">My Courses</span>
          </div>}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <IoClose className="w-8 h-8 text-white" />
            ) : (
              <IoMenu className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="fixed top-[70px] left-0 w-full bg-black/90 backdrop-blur-md z-10 lg:hidden">
          <div className="flex flex-col items-center gap-6 py-6">

             {/* Profile Section for Mobile */}
             {/* Profile Section for Mobile */}
             {userData && (
              <div className="flex flex-col items-center gap-2">
                 {userData?.photoUrl ? (
                    <img src={userData?.photoUrl} className="w-[60px] h-[60px] rounded-full object-cover border-2 border-white" alt="" />
                 ) : (
                    <div className="w-[60px] h-[60px] rounded-full text-white flex items-center justify-center text-[24px] border-2 bg-black border-white">
                        {userData?.name.slice(0,1).toUpperCase()}
                    </div>
                 )}
                 
                <span className="text-white text-lg font-medium">{userData.name}</span>
                 <div className="flex flex-col items-center gap-2 text-gray-300 mt-2">
                    <span className="cursor-pointer hover:text-[#1AB0A4] transition-colors" onClick={() => {navigate("/profile"); setOpen(false);}}>My Profile</span>
                    <span className="cursor-pointer hover:text-[#1AB0A4] transition-colors">My Courses</span>
                 </div>
              </div>
            )}

            {userData?.role === "educator" && (
                <div className="text-white text-lg cursor-pointer hover:text-[#1AB0A4] transition" onClick={() => {navigate("/dashboard"); setOpen(false);}}>Dashboard</div>
            )}


            {!userData ? (
                <div className="px-8 py-2 rounded-lg border border-white text-white
                                hover:bg-[#1AB0A4] hover:text-black transition cursor-pointer"
                                onClick={() => {navigate("/login"); setOpen(false);}}>
                Login
                </div>
            ) : (
                <div className="px-8 py-2 rounded-lg border border-red-500 text-red-400
                                hover:bg-red-500 hover:text-white transition cursor-pointer"
                                onClick={() => {handleLogOut(); setOpen(false);}}>
                Logout
                </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
