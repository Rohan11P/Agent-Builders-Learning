import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: JSON.parse(localStorage.getItem("userData")) || null
    },
    reducers:{
        setUserData:(state, action) => {
            state.userData = action.payload
            if(action.payload){
                localStorage.setItem("userData", JSON.stringify(action.payload))
            } else {
                localStorage.removeItem("userData")
            }
        }
    }
})

export const {setUserData}  = userSlice.actions
export default userSlice.reducer

