import { createSlice } from "@reduxjs/toolkit";
const initialUserState = {
  Username: "",
  FavoriteMovies: [], // Ensure this is an array
  
};

const userSlice = createSlice({
name: "user",
initialState: {user:null},
reducers: {
setUser: (state= initialUserState, action) => {
state.user = action.payload,
action.payload.FavoriteMovies || []
}
}
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;