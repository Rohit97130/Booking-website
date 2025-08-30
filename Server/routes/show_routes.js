const Show = require('../model/ShowModel');

const express = require('express');

const router = express.Router();



//Add show
router.post('/add-show',async(req,res)=>{
    try{
        
        const newShow = new Show(req.body);
        await newShow.save();

        res.send({
          success:true,
          message:"SuccessFullly Updation!"
        })
    }
    catch(err){
        res.status(404).send({
            success:false,
             message: err.message
        })
    } 
});


router.post('/get-all-shows-by-theatre',async(req,res)=>{
    try{
        const allShows =  await Show.find({theatre:req.body.theatreId}).populate('movie');
        res.send({
           success:true,
           message:"SuccessFul movie fetched!",
           data:allShows
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }

})


//!delete
router.post('/delete-show',async(req,res)=>{
    try{
        await Show.findByIdAndDelete(req.body.showId);
        res.send({
            success:true,
            message:"Deletion Successful!"
        })
    }
    catch(err){
        res.send({
            success:false,
            message:"Some error has been Occuredd!"
        })
    }
})


//!Update Show

router.put('/update-show',async(req,res)=>{
    try{
         const updateone = await Show.findByIdAndUpdate(req.body.showId,req.body,{name:true});

         res.send({
            success:true,
            message:"Updation Successfull!"
         })

    }
    catch(err){
        res.send({
            success:false,
            message: "some error has been Occured!"
        })
    }
})


//get all theatres by  movie which has some show

router.post('/get-all-theatre-by-movie',async(req,res)=>{
     
    try{
          const {movie,date} = req.body;
          const shows =  await Show.find({movie,date}).populate('theatre');


          //Filter out the Unique Theatre now
            let uniqueTheatres = [];
        shows.forEach(show => {
            let isTheatre = uniqueTheatres.find(theatre => theatre._id === show.theatre._id);
            if(!isTheatre){
                let showsOfThisTheatre = shows.filter(showObj => showObj.theatre._id == show.theatre._id);
                uniqueTheatres.push({...show.theatre._doc, shows: showsOfThisTheatre});
            }
        });


       

          res.send({
            success: true,
            message: 'All theatres fetched!',
            data: uniqueTheatres
        });
    }
    catch(err){

         res.status(404).send({
            success:false,
            message:"Fetching Unsuccessful"
         })
    }
})


router.post('/get-show-by-id',async(req,res)=>{
    try{
        const show = await Show.findById(req.body.showId).populate('movie').populate('theatre');
        res.send({
            success:true,
            message:"Successfully Fetched!",
            data:show
        })
    }
    catch(err){
        res.send({
            success:false,
            message: err.message
        })
    }
})


module.exports = router;





