import { createSlice } from "@reduxjs/toolkit";

const initialState:any = null;

const userSlicer = createSlice({
    initialState:initialState,
    name:"user",
    reducers: {
        setUser:(_,action) => {
           return action.payload
        },
        setAccessToken:(state, action) => {
            // state.AccessToken = action.payload;
            // console.log("Access Token : ", action.payload);
            console.log("State : ", state);
            return state
        },
        clearUser:() => {
            return null;
        }
    }
})

export const { setUser, clearUser, setAccessToken } = userSlicer.actions;
export default userSlicer.reducer;