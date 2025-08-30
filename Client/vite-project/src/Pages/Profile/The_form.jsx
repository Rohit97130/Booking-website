
import React from 'react'

import { useDispatch } from 'react-redux';
import { Col, Modal, Row, Form,  Input, Button, message} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { showLoading,hideLoading } from '../../redux/loaderSlice';
import { useSelector } from 'react-redux';
import { addTheatre } from '../../apicalls/theatre';
import { updateTheatre } from '../../apicalls/theatre';


function The_form({setIsForm,isForm,formtype,selectedTheatre,getdata}) {
     
   const {user} = useSelector((state)=>state.User);
    
    const dispatch = useDispatch();
     const onFinish = async(value)=>{
             dispatch(showLoading());
             let response = null;
             
              if(formtype==='add'){
                response = await addTheatre({...value, owner:user._id});
              }else{         
        value.theatreId = selectedTheatre._id;
        response = await updateTheatre(value);
          }

             if(response.success){
                 message.success("Theatre has been added");
             }
             else{
              message.error(response.message);
             }
             dispatch(hideLoading());
             getdata();
             setIsForm(false);  
     }

   
    const handleCancle = ()=>{
        setIsForm(false);
    }
  return (
    <>
        <Modal 
         title = {formtype==='add'?'Add Form':'Edit Form'}
        centered open={isForm} onCancel={handleCancle}
        width={'800'}
        footer={null} >
           <Form layout='vertical' style={{width: '100%'}} initialValues={selectedTheatre?selectedTheatre:{}} onFinish={onFinish}>
                <Row gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}>
              <Col span={24}>
              <Form.Item label="Theatre Name" htmlFor='name' name="name" className='d-block' rules={[{required: true, message: "Theatre name is required!"}]}>
                <Input id="name" type="text" placeholder='Enter the theatre name'></Input>
              </Form.Item>
            </Col>

             <Col span={24}>
              <Form.Item label="Theatre Address" htmlFor='address' name="address" className='d-block' rules={[{required: true, message: "Theatre name is required!"}]}>
                <TextArea id="address" rows="3" placeholder='Enter the theatre name'></TextArea>
              </Form.Item>
            </Col>

             <Col span={24}>
             <Row gutter={{
               xs:6,
               sm:10,
               md:12,
               lg:16
             } }>
              
               <Col span={12}>
                  <Form.Item label="Email" htmlFor='email' name="email" className='d-block' rules = {[{required:true,message:"Email is required!"}]} >
                     <Input id="email" type="email" placeholder='Enter the Email'></Input>
                  </Form.Item>
               </Col>
               <Col span={12}>
                <Form.Item  label="Phone Number" htmlFor='phone' name="phone" className='d-block' rules={[{required: true, message: "Phone number is required!"}]}>
                    <Input id="phone" type="number" placeholder='Enter the phone number'></Input>
                </Form.Item>                
              </Col> 
              </Row>
            </Col> 
            </Row>

              <Form.Item>
              <Button block type="primary" htmlType='submit' style={{fontSize: "1rem", fontWeight: "600"}}>Submit the Data</Button>
              <Button className='mt-3' block onClick={handleCancle}>Cancel</Button>
          </Form.Item>
        
           </Form>
        </Modal>
    </>
  )
}

export default The_form;