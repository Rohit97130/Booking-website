const express = require('express');

const Theatre = require('../model/Theatre.js');


const router = express.Router();

router.post('/add-theatre',async(req,res)=>{
     
    try{
      const new_theatre = new Theatre(req.body);
      await new_theatre.save();
      res.send({
        success:true,
        message:"New theatre has been Added!"
      })
    }
    catch(err){
       res.status(400).send({
         success:false,
         message:'Error has been Occured',
         error: err
       });
    }
             

})


//update the Theatre


router.put('/update-theatre',async(req,res)=>{
     

  try{
      //  const {theatreId, ...updatedvalue} = req.body;
        await Theatre.findByIdAndUpdate(req.body.theatreId,req.body,{name:true});
        res.send({
          success:true,
          message:"Updation has been  done !"
        })
      }catch(err){
          res.status(404);
      }
} )


//deletion the Theatre

router.delete('/delete-theatre/:id', async(req,res)=>{
      
   try{
       await Theatre.findByIdAndDelete(req.params.id);
       res.send({
          success: true,
          message : "Deletion  has been successfull!"
       })
   }
   catch(err){
      res.status(401);
   }
})


//get the theatre data for admin route
router.get('/getall-theatre',async(req,res)=>{
     
    try{
        const allTheatre =  await Theatre.find().populate('owner');
         res.send({
           success:true,
           message: "Data fetching Successfull",
           data:allTheatre
         })
    }
    catch{
        res.status(400);
    }
})


//Get all the theatres of a specific owner

router.get('/get-all-theatres-by-owner/:id' , async(req,res)=>{
      try{
        const ownerId = req.params.id;
        const allTheatre = await Theatre.find({owner: ownerId}).populate('owner');
         res.send({
           success:true,
           message: "All theatres fetched Successfully!",
           data:allTheatre
         })
      }
       catch(err){
        res.status(400).send({
           success:false,
           message:"Error occurred while fetching theatres",
           error: err.message
        });
    }
})


module.exports = router;



