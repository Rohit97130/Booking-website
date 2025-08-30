import React, { useEffect, useState } from 'react'
import {message, Input,Row, Col,Divider} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getmovie } from '../apicalls/movie';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/loaderSlice';
import {getAllTheatresByMovie} from '../apicalls/show';


import moment from 'moment';
import { CalendarOutlined } from '@ant-design/icons';



function SingleMovie() {
   
    const [movie , setMovie] = useState([]);
    const [theatres , setTheatres] = useState([]);
    const [date , setDate] = useState(moment().format("YYYY-MM-DD"));
    
   
    

    const param = useParams()
    const navigate = useNavigate();
    console.log('my movie', movie);
    const dispatch = useDispatch();


    const getdata = async()=>{
          dispatch(showLoading());
         const response = await getmovie(param.id);
         if(response.success){
             setMovie(response.data);
             console.log(response.data);
         }else{
            message.error(response.message);
         }
          dispatch(hideLoading());
    }


     
    const getAlltheatres = async()=>{
          
      dispatch(showLoading());
      const response = await getAllTheatresByMovie({movie:param.id,date});

       if(response.success){
            setTheatres(response.data);
            console.log('my theatre-->' , response.data);
            
       }
       else{
         message.error(response.message);
       }

      dispatch(hideLoading());
         
    }


    const handleDate = (e)=>{
         setDate(e.target.value);
          navigate(`/movie/${param.id}?date=${e.target.value}`);
    }

    useEffect(()=>{
         getdata();
    },[]);

    useEffect(()=>{
        getAlltheatres();
    },[date]);


  return (
     <>
        <div className='inner-container'>
         {movie && (
            <div className="single-movie-div">

                <div className="flex-Shrink-0 me-3 single-movie-img">
                  <img src={movie.poster} alt="Movie Poster" 
                       style={{
                       width:'100px',
                       height:'150px',
                       borderRadius:'5px',
                       objectFit:'cover'
                    }}
                  />
                </div>

                <div>
                   <h1 className='mt-0'>{movie.title}</h1>
                     <p className="movie-data">
                Language: <span>{movie.language}</span>
              </p>
              <p className="movie-data">
                Genre: <span>{movie.genre}</span>
              </p>
              <p className="movie-data">
                Release Date:{" "}
                <span>{moment(movie.date).format("MMM Do YYYY")}</span>
              </p>
              <p className="movie-data">
                 Duration: {" "}
                 <span>{movie.duration} Minutes</span>
              </p>
              <hr />

                </div>


                <div className="d-flex flex-column-mob align-items-center mt-3">
                  <label htmlFor="" className="me-3 flex-shrink-0"> Choose the date:</label>
                   <Input
                    onChange={handleDate}
                    type='date'
                    className='max-width-300 mt-8px-mob'
                    value={date}
                     placeholder="default size"
                    prefix ={<CalendarOutlined/>}
                   />
                </div>


             </div>
         )}


         {theatres.length===0 && 
             <div className="pt-3">
               <h2 className="blue-clr">
                   Currently, no theatres available for this movie!
               </h2>
             </div>
         }

         {theatres.length>0 && (
              <div className="theatre-wrapper">
                <h2>Theatres</h2>
                {theatres.map((theatre)=>{
                    return (
                        <div key={theatre._id}>
                            <Row gutter={24} key={theatre._id}>
                              <Col xs={{span:24}} lg={{span:8}}>
                                <h3>{theatre.name}</h3>
                                <p>{theatre.address}</p>
                              </Col>
                              <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                                 <ul className='show-ul'>

                                     {theatre.shows
                                      .sort(
                                         (a, b) =>
                                        moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                                      )
                                      .map((singleShow)=>{
                                         return (
                                             <li
                                key={singleShow._id}
                                onClick={() =>
                                  navigate(`/book-show/${singleShow._id}`)
                                }
                              >
                                {moment(singleShow.time, "HH:mm").format(
                                  "hh:mm A"
                                )}
                              </li>
                                         )
                                      })
                                     }



                                 </ul>
                              </Col>
                            </Row>
                          <Divider />
                        </div>
                    )
                })}


              </div>

         )}
          
        </div>
     </>
  )
}

export default SingleMovie