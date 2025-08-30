const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
   show:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'show',
      required: true
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required: true
   },
   seats:{
     type:Array,
     required:true
   },
   totalPrice:{
     type: Number,
     required: true
   },
   paymentId:{
     type: String,
     required: true
   },
   transactionId:{
     type:String,
     required:true
   },
   bookingStatus:{
     type: String,
     default: 'confirmed',
     enum: ['pending', 'confirmed', 'cancelled']
   },
   bookingTime:{
     type: Date,
     default: Date.now
   }
}, {
   timestamps: true
})

module.exports = mongoose.model('bookings',bookingSchema);