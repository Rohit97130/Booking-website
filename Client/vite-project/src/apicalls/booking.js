import { withSuccess } from "antd/es/modal/confirm";
import axiosInstance from "./index";


export const bookshow = async(payload)=>{
     try{
       const response = await axiosInstance.post('/api/bookings/book-show', payload);
        console.log(response.data);
        return response.data;
     }
     catch(err){
          return err.response
     }
}


export const getAllBookings = async () => {
    try{
        const response = await axiosInstance.get('/api/bookings/get-all-bookings');
        return response.data;
    }catch(err){
        return {success:'false',message:'some error has been Occured!'};
    }
}