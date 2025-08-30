import React from 'react'
import { Modal ,message} from 'antd'
import {deletemovie} from '../../apicalls/movie';
import { showLoading,hideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';

function DeleteModal({isDeleteModalOpen ,setIsDeleteModalOpen,Selectmovie,getData}) {
    
     const dispatch = useDispatch();
      const deletem = async(id)=>{
                
               dispatch(showLoading);
               const response = await deletemovie(id);
               console.log(response);
                console.log('d',id);
               if(response.success){
                  message.success(response.message);
                  getData();
               }
               else{
                   message.error(response.message);
               }
                dispatch(hideLoading);   
           }


    const handleOk = async()=>{
        await deletem(Selectmovie._id);
         setIsDeleteModalOpen(false);
    }

    const handleCancel = ()=>{
        setIsDeleteModalOpen(false);
    }

  return (
     <>
      <Modal title="Delete Movie?" open={isDeleteModalOpen} onOk={handleOk} onCancel={handleCancel}>
           <p className='pt-3 fs-18'>Are you sure you want to delete this movie?</p>
            <p className='pb-3 fs-18'>This action can't be undone and you'll lose this movie data.</p>
      </Modal>
     </>
  )
}

export default DeleteModal