import { message } from "antd";
import axiosInstance from "./index.js";
import axios from "axios";



export const addTheatre = async(payload)=>{
        
    try{
        console.log('my payload' , payload);
        
        const response = await axiosInstance.post('/api/theatre/add-theatre',payload);
        return response.data;
    }
    catch(err){
        console.log(err);    
       return {success:false,message:"some error has been Occured!"};
    }


}

//Updation 
export const updateTheatre = async(payload)=>{
       
    try{
         const response = await axiosInstance.put('/api/theatre/update-theatre',payload);
         return response.data;
    }
    catch(err){
      console.log(err);
      return {success:false,message:"Some error has been Occurred!"}; 
    }
}

//deletion 

export const DeleteTheatre = async(id)=>{
       
    try{
         const response = await axiosInstance.delete(`/api/theatre/delete-theatre/${id}`);
         return response.data;
    }
    catch(err){
      console.log(err);
      return {success:false,message:"Some error has been Occurred!"}; 
    }
}

//GETTING THE DATA for Admin
export const gettheatre_detail_ForAdmin = async()=>{
       
    try{
         const response = await axiosInstance.get(`/api/theatre/getall-theatre`);
         return response.data;
    }
    catch(err){
      console.log(err);
      return {success:false,message:"Some fetching Error has been Occurred!"}; 
    }
}


//get the particular data for particular Id 

export const gettheatre_byId = async(ownerId)=>{
  try{
      
     const response  = await axiosInstance.get(`/api/theatre/get-all-theatres-by-owner/${ownerId}`);
      return response.data;
  }
  catch(err){
    console.log(err);
    return {success:false , message:"Some error has been Occurred"};
  }
}

