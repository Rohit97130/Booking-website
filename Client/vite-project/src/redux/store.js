import {configureStore} from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import UserSlice from './User';

const store = configureStore({
    reducer:{
        loader: loaderReducer,
        User : UserSlice
  }  
})

export default store;

