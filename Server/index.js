
const express = require('express');

require('dotenv').config();
console.log('Environment variables loaded:', process.env.Dburl);

require('./config/Db_conn.js');

const app = express();

const user_router = require('./routes/User_routes.js');
const form_router = require('./routes/MoviesRoute.js');
const Theatre_router = require('./routes/Theatre_Route.js');
const show_router = require('./routes/show_routes.js');
const booking_router = require('./routes/bookingRoute.js');
app.use(express.json());
app.use('/api/users' , user_router);
app.use('/api/movies' , form_router);
app.use('/api/theatre' , Theatre_router);
app.use('/api/shows',show_router);
app.use('/api/bookings',booking_router);






const PORT = 5000;
app.listen(PORT, ()=>{
    console.log("Server is running on port 5000");
})