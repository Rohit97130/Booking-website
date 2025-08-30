const express = require("express");

const Movies = require("../model/MoviesModel.js");


const router = express.Router();


router.post('/add-movie', async(req,res)=>{
   
     try{
       const newMovie =  new Movies(req.body);
        await newMovie.save();
        res.send({
            success:true,
            message:"New Movie have been Added!"
        })
     }
     catch(err){
       console.log(err);
         res.status(500).send({
            success:false,
            message:"Somethinng wrong happen"
        })
     }
})

//update the movie, delete the moveie , get all movies,

//update movie

router.put('/update-movies',async(req,res)=>{
     
  try{
    const Movie = await Movies.findByIdAndUpdate(req.body.movieId,req.body,{name:true});
    res.send({
      success: true,
      message: "Updation has been successfully done",
      movie: Movie
    })
  }
  catch(err){
     res.status(404).send({
      success: false,
      message: "some error happen"
    })
  }
   
})



//get the movies

router.get('/get-all-movies',async(req,res)=>{
    
    try{
         const allmovies = await Movies.find();

         res.send({
           success:true,
           message: "ALL Movies has been found",
           data: allmovies
         })
    }
    catch(err){
        res.status(404).send({
           success:false,
           message: err.message ,
         })
    }

})




//delet the Movies

router.delete('/delete-movie/:id',async(req,res)=>{
  
    try{
       const delete_item = await Movies.findByIdAndDelete(req.params.id);
        res.send({
          success:true,
          message:"Movie has been successfully deleted"
       })
    }
    catch(err){
        res.status(404);
    }

})


//fetch  a particular movie with the help  of Id

router.get('/movie/:id', async(req,res)=>{
   
    try{
           const data  = await Movies.findById(req.params.id);
           res.send({
            success:true,
            message:"Successfully Fetched!",
            data: data
           })
    }
    catch(err){
        res.status(404);
    }
})



module.exports = router;
