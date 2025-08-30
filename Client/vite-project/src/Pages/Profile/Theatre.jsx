import React, { useContext, useEffect } from 'react'
import { Table,Button,message} from 'antd'
import { useState } from 'react';
import The_form from './The_form';
import { gettheatre_detail_ForAdmin,gettheatre_byId} from '../../apicalls/theatre';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading,hideLoading } from '../../redux/loaderSlice';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import Delete_Theatre_Modal from './Delete_Theatre_Modal';
import ShowModel from './ShowModel';


function Theatre() {
  const [isForm, setIsForm] = useState(false);
  const [formtype , setFormType] = useState("add");
  const [selectedTheatre , setselectedTheatre] = useState(null);
  const [theatreInfo, settheatreInfo] = useState(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
   const[isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);

    const {user} = useSelector((state)=>state.User);

    console.log('my user ->', user);
    
    console.log('theatre Info', theatreInfo);
    

   const dispatch = useDispatch();

   const getdata = async()=>{
         
             dispatch(showLoading());
             const response = await gettheatre_byId(user._id);
              if(response.success){
            const allTheatres = response.data;
            settheatreInfo(
                allTheatres.map(function(item){
                return {...item, key: `theatre${item._id}`}
              })
            );
          }else{
            message.error(response.message)
          }
        
             dispatch(hideLoading());
   }



  const tableHeading= [
    {
      title:'Name',
      dataIndex:'name',
       key: 'name'
    },
    {
        title:'Address',
         dataIndex:'address',
           key: 'address',
    },
    {
        title:'Phone Number',
         dataIndex:'phone',
          key: 'phone',
    },
    {
        title:'Email',
         dataIndex:'email',  
         key: 'email'
    },
    {
        title:'Status',
        dataIndex:'status',
        key:'status',
         render:(status,data)=>{
           if(data.isActive){
            return `Approved`
           }else{
            return `Pending/Blocked`
           }
        }
    },
    {
        title:'Action',
        dataIndex:'Action',
        key:'Action',
        render:(text,data)=>{
          return <div className='d-flex align-items-center gap-10'>
              <button
                onClick={()=>{
                  setFormType('edit');
                   setIsForm(true)
                   setselectedTheatre(data);
                }}
              ><EditOutlined/></button>
              <button 
                 onClick={()=>{
                  setIsDeleteModalOpen(true);
                  
                  setselectedTheatre(data);
               }}
            ><DeleteOutlined/></button>

            {data.isActive && <button style={{margin:'2%'}} onClick={()=>{
               setIsShowModalOpen(true); 
                setselectedTheatre(data);
            }}>+ Show</button>}
          </div>
        }
        
    },
  ]

   useEffect(()=>{
       if(user && user._id) {
       getdata();
   }
   },[user]);
  return (
      <>
      <div>
        <Button type="primary"
          onClick={()=>{
            setIsForm(true);
            setFormType('add');
            setselectedTheatre(null);
          }}
        >Add Theatre</Button>
      </div>

        <div>
            <Table dataSource={theatreInfo} columns={tableHeading} />
        </div>

            {isForm && <The_form setIsForm={setIsForm} isForm ={isForm}  formtype={formtype} selectedTheatre={selectedTheatre} getdata={getdata}/>}
          {isDeleteModalOpen && <Delete_Theatre_Modal open={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} selectedTheatre={selectedTheatre} getdata={getdata}/>}
 
          {isShowModalOpen && <ShowModel isShowModalOpen={isShowModalOpen} setIsShowModalOpen={setIsShowModalOpen} selectedTheatre={selectedTheatre}/>}
      </>
  )
}

export default Theatre