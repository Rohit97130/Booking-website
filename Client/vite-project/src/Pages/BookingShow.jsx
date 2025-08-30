
import React, { useEffect, useState } from "react";
import {getShowById} from '../apicalls/show'
import {Card , message, Row, Col, Button} from 'antd'
import { useNavigate, useParams } from "react-router-dom";
import { showLoading,hideLoading } from "../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import { bookshow } from "../apicalls/booking";
import StripeProvider from '../components/StripeProvider';
import CheckoutForm from '../components/CheckoutForm';


function BookingShow(){
   const {user} =  useSelector((state)=> state.User);
   const [show ,  setShow] = useState();
   const [selectedSeats, setSelectedSeats] = useState([]);
   const [showPaymentForm, setShowPaymentForm] = useState(false);
   const param = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();



   
   const getdata = async()=>{
          
        dispatch(showLoading());
        const response = await getShowById({showId:param.id});
        if(response.success){
            setShow(response.data);
        }
        else{
            message.error(response.message);
        }
        dispatch(hideLoading());
   }

const getSeats = ()=>{
    let columns = 12;
    let rows = Math.ceil(show.totalSeats/columns);

    return (
        <div  className="d-flex flex-column align-items-center">
            <div  className="w-100 max-width-600 mx-auto mb-25px">
                <p className="text-center mb-10px">
                       Screen this side, you will be watching in this direction
                </p>
                <div className="screen-div"></div>
            </div>
          
            <ul className="seat-ul justify-content-center">
                {Array.from(Array(rows).keys()).map((row)=>{
                    return Array.from(Array(columns).keys()).map((column)=>{
                        let seatNumber = row*columns + column + 1;
                        

                        let seatClass = 'seat-btn'
                        if(selectedSeats.includes(seatNumber)){
                            seatClass +=' selected'
                        }
                        
                        if(show.bookedSeats.includes(seatNumber)){
                           seatClass += ' booked'
                        }
                        
                        if(seatNumber<=show.totalSeats){
                              return(
                                  <li key={seatNumber}>
                                    <button 
                                      onClick={()=>{
                                         if(selectedSeats.includes(seatNumber)){
                                              setSelectedSeats(
                                                 selectedSeats.filter((Current_seat)=> Current_seat!==seatNumber)
                                              )
                                         }else{
                                            setSelectedSeats([...selectedSeats,seatNumber]);
                                         }
                                      }}
                                     className={seatClass}
                                     disabled={show.bookedSeats.includes(seatNumber)}
                                    >
                                         {seatNumber}
                                    </button>
                                  </li>
                                )
                        } 
                    })
                })}
            </ul>


          <div  className="  bottom-card  w-100 max-width-600 mx-auto mb-25px mt-3">
              <div className="">
                 Selected Seat: <span>{selectedSeats.join(", ")}</span>
              </div >
              <div className="">
                 Total Price: {' '}
                <span>Rs.{selectedSeats.length* show.ticketPrice}</span>
              </div>
          </div>
        </div>
    )
}

    
const onPaymentSuccess = async (paymentData) => {
    dispatch(showLoading());
    try {
        // Create booking payload
        const bookingPayload = {
            show: show._id,
            user: user._id,
            seats: selectedSeats,
            totalPrice: selectedSeats.length * show.ticketPrice,
            paymentId: paymentData.paymentMethodId,
            transactionId: paymentData.paymentMethodId
        };
        
        console.log('Booking payload:', bookingPayload);
        
        const response = await bookshow(bookingPayload);
        
        if (response.success) {
            message.success('Booking successful!');
            navigate('/profile');
        } else {
            message.error(response.message || 'Booking failed');
        }
    } catch (err) {
        console.error('Booking error:', err);
        message.error('Booking failed. Please try again.');
    }
    dispatch(hideLoading());
};


    

   useEffect(()=>{
       getdata();
   },[]);

    return(
        <>
           {show && (
            <Row gutter={24}>
                <Col span={24}>
                    <Card
                       title={
                         <div className="movie-title-details">
                            <h1>{show.movie.title}</h1>
                             <p>
                                Theatre: {show.theatre.name},{show.theatre.address}
                             </p>
                         </div>
                         
                       }
                        extra = {
                            <div>
                               <h3>
                                  <span>Show Name:</span> {show.name}
                               </h3>
                               <h3>
                                 <span>Date & Time :</span>
                                 {moment(show.date).format('YYYY-MM-DD')}{" "}
                                 {moment(show.time ,"HH:mm").format('hh:mm A')}
                               </h3>
                               <h3>
                                 <span>Ticket Price:</span>
                                 {show.ticketPrice}/-
                               </h3>
                               <h3>
                                 <span>Total seats:</span> {show.totalSeats}
                                 <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                                  {show.totalSeats - show.bookedSeats.length} {" "}
                               </h3>
                            </div>
                        }
                         style={{ width: "100%" }}
                    >
                       {getSeats()}


                       {selectedSeats.length > 0 && !showPaymentForm && (
                         <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
                            <Button 
                               type="primary" 
                               shape="round" 
                               size="large" 
                               style={{width:'25%'}}
                               onClick={() => setShowPaymentForm(true)}
                            >
                                Proceed to Pay
                            </Button>
                         </div>
                       )}

                       {showPaymentForm && selectedSeats.length > 0 && (
                         <div style={{ marginTop: 20, padding: '20px', border: '1px solid #d9d9d9', borderRadius: '8px' }}>
                           <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Complete Your Payment</h3>
                           <StripeProvider>
                             <CheckoutForm
                               amount={show.ticketPrice * selectedSeats.length * 100}
                               onPaymentSuccess={onPaymentSuccess}
                               selectedSeats={selectedSeats}
                               show={show}
                             />
                           </StripeProvider>
                           
                           <div style={{display:'flex', justifyContent:'center', marginTop:15}}>
                             <Button 
                               onClick={() => setShowPaymentForm(false)}
                               style={{marginRight: 10}}
                             >
                               Back to Seat Selection
                             </Button>
                           </div>
                         </div>
                       )}
                       
                    </Card>
                </Col>
            </Row>
           )}

          
        </>
    )
}

export default BookingShow;