import React from 'react'
import {useEffect , useState } from 'react'
import { showLoading , hideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { getAllBookings } from '../../apicalls/booking';
import moment from 'moment'
import {Input,Row,Col,Card,message,Button} from 'antd';
import {Link} from 'react-router-dom'


function Booking() {
    const [bookings , setBookings] = useState([]);
    const dispatch = useDispatch();

    const getdata = async()=>{
        dispatch(showLoading());
         const response = await getAllBookings();
         if(response.success){
             setBookings(response.data);
             console.log('My Booking->' ,response.data);
         }else{
            message.error('some erroe');
         }
        dispatch(hideLoading());
    }

   useEffect(()=>{
       getdata();
   },[]);

  return (
     <>
        {bookings && <Row gutter={24}>
           
           {bookings.map((booking)=>{
              return <Col key={booking._id} xs = {{span:24}} lg={{span:12}}>
                      <Card className='mb-3'>
                         <div className="">
                            <div className="flex-shrink-0" > <img src = {booking.show.movie.poster} alt="Movie Poster"  style={{width:'100px',height:'150px',objectFit:'cover'}}/></div>
                            <div className="show-details flex-1">
                             <h3 className="mt-0 mb-0">{booking.show.movie.title}</h3>
                             <p>Theatre: <b>{booking.show.theatre.name}</b></p>
                             <p>Seats: <b>{booking.seats.join(", ")}</b></p>
                              <p>Date & Time: <b>{moment(booking.show.date).format('DD-MM-YYYY')}{' '}{moment(booking.show.time , 'HH:mm').format('hh:mm A')}</b></p>
                              <p>TicketPrice: <b>{booking.show.ticketPrice * booking.seats.length}</b>
                              <p>Booking Id: <b>{booking.transactionId}</b></p>
                              </p>
                         </div>
                         </div>
                        
                      </Card>
                    </Col>
           })}

        </Row>
 
        }

         {!bookings.length && <div className="text-center pt-3">
                    <h1>You've not booked any show yet!</h1>
                    <Link to="/"><Button type="primary">Start Booking</Button></Link>
                </div>}
     </>
  )
}

export default Booking