const express = require("express");

const User = require("../model/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const  authMiddleware  = require("../middlewares/Authmiddleware");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: false,
        message: "User already registered!",
      });
      return; // Stop further execution
    }

    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    const hashpwd = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashpwd;
    const newUser = new User(req.body);

    await newUser.save();



    res.send({
      success: true,
      message: "You have been registered successfully! Please login now",
    });

    
  } 
  
  catch (err) {
    console.log(err);
    throw err; // This will make the caller's catch run
  }
});


router.post('/login',async(req,res)=>{
    try{
      const user = await User.findOne({email: req.body.email});
      
      if(!user){
         res.send({
         sucess:false,
          message:"User is not register"
         });
         return;
      }
       
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if(!validPassword){
        res.send({
         sucess:false,
          message:"Sorry , Invalid Password Entered"
         })
      }

        const token = jwt.sign({userId: user._id}, process.env.secret_key_jwt, {expiresIn:"1d"});

        res.send({
         sucess:true,
          message:"Congrats! you have been Logged in",
          token : token
         })
       
    }
    catch(err){
       console.log(err);
       throw err;
    }
     
})


//router level middleware

router.get('/get-current-user',authMiddleware , async(req,res)=>{
   
     const user = await User.findById(req.userId).select("-password");
     
    res.send({
       success:true,
       message:'You are authorized to  go the protected route!',
       data:user
    })

})

module.exports = router;
