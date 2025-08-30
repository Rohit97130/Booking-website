const mongoose = require('mongoose');


const theatreSchema = new mongoose.Schema({

     name:{
        type: String,
        required:true
     },
     address:{
        type: String,
        required: true
     },
     phone:{
        type:Number,
        required:true,
     },
     email:{
        type:String,
        required:true,
     },
     owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
     },
     isActive:{
        type:Boolean,
         // required: true
         default:false
     },     

},{timeStamps:true});

const theatre_model =   mongoose.model('theatre',theatreSchema);

module.exports = theatre_model;