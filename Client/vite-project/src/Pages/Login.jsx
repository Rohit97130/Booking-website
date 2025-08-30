import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import { Button, Form, Input, Radio,message } from "antd";
import {LoginUser} from '../apicalls/users';
import { useEffect } from 'react';


function Login() {
  const navigate = useNavigate();
  const onSubmit = async (values)=>{

    try {
      const response = await LoginUser(values);
      console.log(response);
      
      if (response.sucess) {
        message.success(response.message);
        localStorage.setItem('token',response.token);
        navigate('/');
      } else {
        message.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
            <h1>Login to BookMyShow</h1>
           </section>

          <section className="right-section">
           <Form layout='vertical' onFinish={onSubmit} >

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
                <Input   id ="password" type="password" placeholder="Enter your Password" />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit" style={{fontSize: '1rem', fontWeight:600}}>Login</Button>
              </Form.Item>
            </Form>
        <div>
          <p>New user? <Link to="/register" >Register Now</Link> </p>
        </div>
          </section>

        </main>
       
      </header>
      </>
  );
}

export default Login