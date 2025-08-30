import axiosInstance from "./index.js";

const RegisterUser = async(value)=>{
      
    try{
        const response = await axiosInstance.post('/api/users/register',value);
        console.log(response);
        return response.data;
    }
    catch(err){
      console.log(err );  
       return { success: false, message: "Registration failed. Please try again." };
    }
}
export default RegisterUser;




//!Login

export const  LoginUser = async(values)=>{
     try{
        const response = await axiosInstance.post('/api/users/login',values);
        return response.data;
     }
     catch(err){
        console.log(err); 
       return {sucess:false , message: 'Login failed. Please try again later' }
     }
}


//!Get current User from fronted

export const GetCurrentUser = async()=>{
    try{
      const response = await axiosInstance.get('/api/users/get-current-user');
      console.log("Yourfd ", response.data);
      return response.data;
    }
    catch(err){
      console.log('this is my error' + err);
      throw err;
    }

}



