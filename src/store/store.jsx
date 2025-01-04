import {configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dummyjsonApi } from "../services/dummyjsonApi";
import authReducer from "../auth/authSlice"


export const store = configureStore({
    reducer:{
        auth: authReducer,
        [dummyjsonApi.reducerPath] : dummyjsonApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware()
        .concat(dummyjsonApi.middleware)
     

    }
        
});

setupListeners(store.dispatch); 
