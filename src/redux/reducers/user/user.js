import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
name: "user",
initialState: null,
reducers: {
setUser: (state, action) => {
state.user = action.payload
},
logoutUser:(state)=>{
  return null;
},
}
});
export const { setUser ,logoutUser} = userSlice.actions;
export default userSlice.reducer;