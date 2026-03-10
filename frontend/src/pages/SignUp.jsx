import React from "react";
import logo from "../assets/logo.png";
import google from "../assets/google.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import {ClipLoader} from "react-spinners"
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../../utils/firebase";

function SignUp(){
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleSignup = async () => {
    setLoading(true)
    try {
        const result =await axios.post(serverUrl + "/api/auth/signup", {name,password,email,role}, {withCredentials: true})
        console.log(result.data)
        dispatch(setUserData(result.data)) // comes from /redux/userSlice
        setLoading(false)
        navigate("/")
        toast.success("Signup Successfully")
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };
  const googelSignUp = async () =>{
    try {
      const response = await signInWithPopup(auth,provider)
      let user = response.user
      let name = user.displayName
      let email = user.email

      const result = await axios.post(serverUrl + "/api/auth/googleauth", {name, email, role}, {withCredentials: true})
        dispatch(setUserData(result.data)) // comes from /redux/userSlice
        navigate("/")
        toast.success("Signup Successfully")
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  }
  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form className="w-[90%] md:w-175 h-130 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden" onSubmit={(e)=>e.preventDefault()}>
        {/* left div */}
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">
              let's get started
            </h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full h-8.75 border border-[#e7e6e6] text-sm px-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22292E]"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="w-full h-8.75 border border-[#e7e6e6] text-sm px-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22292E]"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full h-8.75 border border-[#e7e6e6] text-sm px-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22292E]"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              minLength={8}
            />
          </div>
          <div className="flex w-[70%] md:w-[50%] items-center justify-between">
            <span
              className={`px-2.5 py-1.25 border-2 rounded-2xl cursor-pointer hover:border-black ${
                role === "student" ? "border-black" : "border-[#e7e6e6]"
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-2.5 py-1.25 border-2 rounded-2xl cursor-pointer hover:border-black ${
                role === "educator" ? "border-black" : "border-[#e7e6e6]"
              }`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>
          <button className="w-[80%] h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" onClick={handleSignup} disabled={loading}>
            {loading ? <ClipLoader size={30} color="white"/>: "SignUp"}
          </button>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div className="w-[80%] h-10 border border-black rounder-[5px] flex items-center justify-center" onClick={googelSignUp}>
            <img src={google} className="w-6.25" alt="" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <div className="text-[#6f6f6f]">
            already have an account
            <span
              className="underline underline-offset-1 text-black ml-1"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>

        {/* right div */}
        <div className="hidden md:flex md:w-1/2 h-full rounded-r-2xl bg-[#22292E] items-center justify-center flex-col">
          <img
            src={logo}
            alt="AgentBuilders logo"
            className="w-32 shadow-2xl"
          />
          <span className="text-2xl text-white">AgentBuilders Learning</span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
