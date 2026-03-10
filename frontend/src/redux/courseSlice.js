import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        creatorCourseData: JSON.parse(localStorage.getItem("creatorCourseData")) || null,
        courseData: null
    },
    reducers:{
        setCreatorCourseData:(state, action) => {
            state.creatorCourseData = action.payload
            if(action.payload){
                localStorage.setItem("creatorCourseData", JSON.stringify(action.payload))
            } else {
                localStorage.removeItem("creatorCourseData")
            }
        },
        setCourseData:(state, action) => {
            state.courseData = action.payload
            if(action.payload){
                localStorage.setItem("courseData", JSON.stringify(action.payload))
            } else {
                localStorage.removeItem("courseData")
            }
        }
    }
})

export const {setCreatorCourseData, setCourseData}  = courseSlice.actions
export const {selectCourseData} = courseSlice.actions
export default courseSlice.reducer

