import React from 'react'
import {message, Table , Button} from 'antd';
import Title from 'antd/es/skeleton/Title';

import { gettheatre_detail_ForAdmin,updateTheatre } from '../../apicalls/theatre';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../../redux/loaderSlice';
import { useEffect } from 'react';



function Theatres() {
  
  const [theatres , setTheatres] = useState([]);
  const dispatch = useDispatch();

 
   const getdata = async()=>{
            dispatch(showLoading());
            const response= await gettheatre_detail_ForAdmin();
            if(response.success){
               
              const allTheatre = response.data;
              setTheatres(allTheatre.map(function(item){
               return {...item, key: `theatre${item._id}`}
              }));
            }
            else{
              message.error(response.message);
            }
            dispatch(hideLoading());
    }

    const handleStatusChange = async(theatre)=>{
          dispatch(showLoading()); 
        

        const value = {...theatre,theatreId: theatre._id , isActive:!theatre.isActive};
       
        
        const response = await updateTheatre(value);
        console.log('my  value - > ',response);
         
        if(response.success){
           message.success(response.message);
           getdata();  
        }
        else{
          message.error(response.error);
        }

          dispatch(hideLoading());
    }
   
 
    useEffect(()=>{
        getdata();
    },[]);

  const columns = [
    {
       title: 'Name',
       dataIndex: 'name',
       key: 'name'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key:'address'
    },
    {
      title: 'Owner',
      key: 'owner',
      render:(text,data)=>{
         return data.owner && data.owner.name;
      }
    },
    {
      title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone '
    },
    {
      title:'Email',
      dataIndex: 'email',
      key: 'email'
    },
      {
      title:'Status',
      dataIndex: 'status',
      key: 'status',
      render:(status,data)=>{
         if(data.isActive){
           return 'Approved'
         }else{
           return 'Pending/Blocked'
         }
      }
    },
    {
      title:'Action',
      dataIndex: 'action',
      render:(status,data)=>{
          return (
              <div className='d-flex align-items-center gap-10'>
                { data.isActive ? <Button onClick={() => handleStatusChange(data)}>Block</Button> : <Button onClick={() => handleStatusChange(data)}>Approve</Button>  }
              </div>
          )
      }
    },
  ]

  return (
    <div>
        <Table dataSource={theatres}  columns={columns} />
    </div>
  )
}

export default Theatres