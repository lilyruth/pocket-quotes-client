import { createSlice } from '@reduxjs/toolkit';

export const quoteSlice = createSlice({
  name: 'quote', //needs to be name of state
  initialState: { value: '' }, 
  reducers: {
     addQuote: (state, action) => {
       state.value = action.payload;
     }, 
  }
})

export const { addQuote } = quoteSlice.actions;
export default quoteSlice.reducer;



  