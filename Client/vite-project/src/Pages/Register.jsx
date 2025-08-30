import React from "react";
import { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Button, Form, Input, message, Radio } from "antd";
import '@ant-design/v5-patch-for-react-19'; 
import RegisterUser from '../apicalls/users';



function Register() {

  const onSubmit = async(values)=>{
      try{
          const response = await RegisterUser(values);
          console.log(response);
          
          if(response.success){
             message.success(response.message);
          }
          else{
             message.error(response.message);
          }
      }
      catch(err){
         console.log(err);   
      }
  }
   
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
        navigate('/');
    } 
  }, []);

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
           <section className="left-section">
            <h1>Register to BookMyShow</h1>
           </section>

          <section className="right-section">

            <Form layout="vertical" onFinish={onSubmit}>
              <Form.Item 
            
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
               rules={[{required: true, message: "Please input your name!"}]}>
                <Input    type="text"   id ="text"placeholder="input placeholder"/>
              </Form.Item>


              <Form.Item 
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
               rules={[{required: true, message: "Please input your email!"}]}>
              <Input placeholder="Enter your Email" />


              </Form.Item>
              <Form.Item 
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
               rules={[{required: true, message: "Please input your password!"}]}>
                <Input  type="password"  id="password" placeholder="Enter your Password" />
              </Form.Item>


                 <Form.Item
                label="Register as a Admin"
                htmlFor="role"
                name="isAdmin"
                className="d-block text-center"
                initialValue={false}
                rules={[{ required: true, message: "Please select an option!" }]}
              >
                <div className="d-flex">
                  <Radio.Group
                    name="radiogroup"
                    className="flex-start"
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>

              <Form.Item
              >
                <Button block type="primary" htmlType="submit" style={{fontSize: '1rem', fontWeight:600}}>Register</Button>
              </Form.Item>
            </Form>
        <div>
          <p>Already a user? <Link to="/login"> login now</Link> </p>
        </div>
          </section>

        </main>
       
      </header>


    </>
  );
}

export default Register;
