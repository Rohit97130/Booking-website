import React from 'react'
import { Modal , message} from 'antd';
import {DeleteTheatre} from '../../apicalls/theatre';

function Delete_Theatre_Modal({open,setIsDeleteModalOpen,selectedTheatre,getdata}) {

   const handleOk = async()=>{
        const response = await DeleteTheatre(selectedTheatre._id);
        if(response.success){
            message.success(response.message)
        }else{
           message.error(response.message);
        }
        getdata();
        setIsDeleteModalOpen(false);
      }

   function onCancel(){
      setIsDeleteModalOpen(false);
   }
  return (
   <>
    <Modal 
     title= "Delete Theatre?"
    open={open} onCancel={onCancel} onOk={handleOk}>
       <p className="pt-3 fs-18">
          Are you sure you want to delete this theatre?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this theatre data.
        </p>
    </Modal>

   </>
  )
}

export default Delete_Theatre_Modal;