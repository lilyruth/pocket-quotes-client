import { createSlice } from '@reduxjs/toolkit';



export const signedInSlice = createSlice({
  name: "signedIn", //needs to be name of state
  initialState: { value: null }, 
  reducers: {
     signedIn: (state, action) => {
       let signedIn = state.value;
       state.value = action.payload;
     }, 
     signedOut: (state, action) => {
          state.value = null;
          }
  }
})

export const { signedIn, signedOut } = signedInSlice.actions;
export default signedInSlice.reducer;



  