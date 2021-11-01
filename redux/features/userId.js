import { createSlice } from '@reduxjs/toolkit';

export const userIdSlice = createSlice({
  name: "userId", //needs to be name of state
  initialState: { value: '' }, 
  reducers: {
     addUserId: (state, action) => {
       state.value = action.payload;
     }, 
     removeUserId: (state, action) => {
          state.value = '';
          }
  }
})

export const { addUserId, removeUserId } = userIdSlice.actions;
export default userIdSlice.reducer;



  