import React, { useState } from 'react'
import {Table,Button, message} from 'antd';
import MovieForm from './MovieForm';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import {getallMovies,deletemovie} from '../../apicalls/movie';
import { useEffect } from 'react';
import moment from 'moment';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import DeleteModal from './DeleteModal';


function Movies() {
  
     const[isModel, setIsmodel] = useState(false);
     const [movies , setMovies] = useState([]);
     
     const [Selectmovie , setSelectmovie]  = useState(null);
    //  console.log('our sele',Selectmovie);
     const[formType , setFormType] = useState('add');
     const[isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);

    //Static data for testing
      
      const dispatch  = useDispatch();
      const getData = async()=>{
          dispatch(showLoading());

          const response = await  getallMovies();
          const  allMovies = response.data;
          setMovies(allMovies.map((item)=>{
             return {...item,key:`movie${item._id}`}
          }))

           console.log('Our movie' , allMovies);
          //  console.log('Our movie2' , allMovies);
          dispatch(hideLoading());
      }
   
      //dummy datasource
    //   const datasource = [
    //     {
    //         key:1,
    //         poster:'Image1',
    //         name: "mass",
    //         description:'best Movie ',
    //         duration:  '12hrs',
    //         genre: 'action',
    //         language: 'english',
    //         releaseDate: 25-34-2003
    //     }
    //   ]



    const tableHeading = [
        {
            title: 'poster',
            dataIndex:'poster',
            render:(data)=>{
               return <img src= {data} alt="image" style={{width:75,height: 115,objectFit:"cover"}} />
            }
           
        },
        {
            title: 'Movies Name',
            dataIndex:'title'
        },
        {
            title: 'Description',
            dataIndex:'description'
        },
        {
            title: 'Duration',
            dataIndex:'duration',
            render:(text)=>{
              return `${text} min`
            }
        },
        {
            title: 'Genre',
            dataIndex:'genre'
        },
        {
            title: 'Release Date',
            dataIndex:'releaseDate',
            render : (data)=>{
                return moment(data).format("MM-DD-YYYY");
            }
        },
         {
          title:'Language',
          dataIndex:'language'
        },
        {
            title: 'Action',
            render:(text,data)=>{
              return <div><button onClick={()=>{
                setIsmodel(true);
                setSelectmovie(data);
                
                setFormType('edit');
              }}><EditOutlined/></button>

                      <button onClick={()=>{
                        // deletem(data._id);
                        setSelectmovie(data);
                        setIsDeleteModalOpen(true);
                        }}><DeleteOutlined/></button>
              </div>
             
            }
        },
       
    ]

    useEffect(()=>{
      getData();
    },[])
  return (
    <>
      <div>
        <Button onClick={()=>{
           setIsmodel(true);
           setFormType('add')}
          }>Add Movies</Button>
      </div>
     <div><Table dataSource={movies} columns={tableHeading}/></div>
     {isModel && <MovieForm open={isModel} setIsmodel= {setIsmodel} Selectmovie={Selectmovie} setSelectmovie={setSelectmovie} formType={formType} updation={getData} />}
     {isDeleteModalOpen && (<DeleteModal  isDeleteModalOpen= {isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} Selectmovie={Selectmovie} getData={getData}/>)}
</>
   
    
  )
}

export default Movies