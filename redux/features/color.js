import { createSlice } from '@reduxjs/toolkit';

export const newColorSlice = createSlice({
  name: 'newColor', //needs to be name of state
  initialState: { value: 'white' }, 
  reducers: {
     addNewColor: (state, action) => {
       state.value = action.payload;
     }, 
  }
})

export const { addNewColor } = newColorSlice.actions;
export default newColorSlice.reducer;



  