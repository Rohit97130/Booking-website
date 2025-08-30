const mongoose = require('mongoose');

console.log('Dburl from env:', process.env.Dburl); 

mongoose.connect(process.env.Dburl).then(()=>{
    console.log('Connection has been made');
}).catch((err)=>{
    console.log('Connection failed');
    console.log(err); 
})