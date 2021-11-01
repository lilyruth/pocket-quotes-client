import { configureStore } from "@reduxjs/toolkit";
import  userIdSliceReducer  from './features/userId';
import signedInSliceReducer from './features/signedIn';
import quoteSliceReducer from './features/quote';
import newColorSliceReducer from './features/color';


const store =  configureStore({
 reducer: {
   userId: userIdSliceReducer, // favorites is the state
   signedIn: signedInSliceReducer,
   quote: quoteSliceReducer,
   newColor: newColorSliceReducer,

 },
})

export default store;