import { message } from 'antd';
import axiosInstance from './index';


//get a Movie
export const  getallMovies = async()=>{

     try{
        const response =  await axiosInstance.get('/api/movies/get-all-movies');
        return response.data;
     }
     catch(err){
         console.log(err);
         return {success:false,message:'some error has been Occurred'};
     }

}



//Add a movie
export const Formdata = async(value)=>{

     try{
        const response =  await axiosInstance.post('/api/movies/add-movie',value);
        return response.data;
     }
     catch(err){
         console.log(err);
         return {success:false,message:'some error has been Occurred'};
     }

}



//UPDATE A MOVIE


export const updatedata = async(value)=>{
    try{

        const response = await axiosInstance.put('/api/movies/update-movies',value);
        return response.data;
    }
    catch(err){
       console.log(err);
       return {success:false,message:"Some error has been  Ocuurred"};
       
    }
    

}



//Delete the Movie 
export const deletemovie = async(id)=>{
       
    try{
        const response = await axiosInstance.delete(`/api/movies/delete-movie/${id}`);
         return response.data;

    }catch(err){
       return {success:false, message:"some error has been occured"};
    }
} 




//Get a Movie by Id
export const getmovie = async(id)=>{  
    try{
            const response = await axiosInstance.get(`/api/movies/movie/${id}`);
            return response.data;
    }
    catch(err){
         return {success:false,message:"some error has been Occured!"};
    }
}