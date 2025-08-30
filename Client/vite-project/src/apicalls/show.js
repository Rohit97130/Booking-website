import axios from "axios";
import axiosInstance from "./index.js";

export const addshow = async(payload)=>{
          try{
              const response = await  axiosInstance.post('/api/shows/add-show',payload);
              return response.data;
          }
          catch(err){
              return {success:false,message:"Something wrong happen!"}
          }
}

export const updateshow = async(payload)=>{
    try{
            const updatedshow = await axiosInstance.put('/api/shows/update-show',payload);
            return updatedshow.data;
    }
    catch(err){
        return {success:false,message:"Something wrong happen!!!!!"}
    }
}


export const getShowsByTheatre = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-all-shows-by-theatre', payload);
        return response.data;
    }catch(err){
        return  {success:false,message:"Something wrong happen!"}
    }
}


export const deleteShow  = async(payload)=>{
    try{
         const response = await axiosInstance.post('/api/shows/delete-show',payload);
        return response.data;
    }
    catch(err){
        return  {success:false,message:"Something wrong happen!"}
    }
}


export const getAllTheatresByMovie = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-all-theatre-by-movie', payload);
        return response.data;
    }catch(err){
        return  {success:false,message:"Something wrong happen!"}
    }
}


export const getShowById = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-show-by-id', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}
