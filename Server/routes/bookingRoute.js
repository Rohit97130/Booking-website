const booking = require('../model/bookingModel');
const  router = require('express').Router();
const stripe = require('stripe')(process.env.stripe_key);

const Show = require('../model/ShowModel')
const authmiddleware = require('../middlewares/Authmiddleware');
  




router.post('/book-show',async(req,res)=>{
    try{
        const { show, user, seats, totalPrice, paymentId, transactionId } = req.body;
        
        // Create new booking record
        const newBooking = new booking({
            show,
            user,
            seats,
            totalPrice,
            paymentId,
            transactionId,
            bookingStatus: 'confirmed',
            bookingTime: new Date()
        });

        await newBooking.save();
  
        //updation of booking seat
        const Myshow = await Show.findById(show).populate('movie');
        const updatedBookingSeats = [...Myshow.bookedSeats, ...seats];
        await Show.findByIdAndUpdate(show,{bookedSeats:updatedBookingSeats});


        res.send({
            success: true,
            message: "Booking successful!",
            data: newBooking
        });
    }
    catch(err){
         res.send({
            success: false,
            message: err.message
        });
    }
})


router.get('/get-all-bookings',authmiddleware,async(req,res)=>{
    try{
         const bookings = await booking.find({user:req.userId})
         .populate("user")
         .populate("show")
             .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies"
                }
             })
              .populate({
                  path:"show",
                  populate:{
                     path: "theatre",
                     model: 'theatre'
                  }
              });


            res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings
        })

    }
    catch(err){
         res.status(404).send({
            success: false,
            message: err.message
        })
    }
})


module.exports = router;