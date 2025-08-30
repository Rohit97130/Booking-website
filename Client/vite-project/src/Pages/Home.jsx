import React, { useEffect } from 'react'
import {getallMovies}  from '../apicalls/movie';
import { useState } from 'react';
import { message,Row,Col,Input} from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/loaderSlice';
import {useNavigate} from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

function Home() {
 
   const [movie, setMovie] = useState(null); 
   console.log('our moviee', movie);
   
   const [searchText,setSearchText]  =useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getdata = async()=>{
           
         dispatch(showLoading());
         const response  = await getallMovies();
         if(response.success){
            setMovie(response.data);
      }else{
         message.error(response.message)
      }
       dispatch(hideLoading());
  }

   const handleSearch = (e)=>{
       setSearchText(e.target.value);
       console.log(searchText);   
   }

   useEffect(()=>{
       getdata();
   },[]);

  return (
      <>
         <Row justify="center" style={{padding: '20px'}}>
            <Col  xs={{span:24}} lg = {{span:12}}>
              <Input
               placeholder = "Type here to search for movies"
               onChange={handleSearch}
                prefix = {<SearchOutlined/>}
              />
            </Col>
         </Row>

           <Row justify="center"
             gutter = {{
            xs:8,
            sm:16,
            md:24,
            lg:32,
           }}
           >
            
           {movie &&
               movie.filter((mov)=>
                 mov.title.toLowerCase().includes(searchText.toLowerCase())
               ).map((mov)=>(
                  <Col
                  key={mov._id}
                  span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
                  
                  >
                   <div className="text-center">
                       <img 
                        onClick={
                         ()=>{
                           navigate(`/movie/${mov._id}?date=${moment().format("YYYY-MM-DD")}`);
                         }

                       }

                       className='cursor-pointer'
                       src={mov.poster} alt="movie Poster"
                       style={{
                         width: '180px',
                         height: '230px',
                         objectFit: 'cover',
                         borderRadius: "8px"
                       }}
                       />

                       <h3
                          onClick={()=>{
                           navigate(`/movie/${mov._id}?date=${moment().format("YYYY-MM-DD")}`);
                          }}
                          className='cursor-pointer'
                       >
                         {mov.title}
                       </h3>
                   </div>          
                  </Col>
            ))}

         </Row>
      </>
  )
}

export default Home