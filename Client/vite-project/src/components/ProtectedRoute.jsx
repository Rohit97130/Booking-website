
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { Link, useNavigate } from "react-router-dom";
import { showLoading, hideLoading} from "../redux/loaderSlice"
import { useDispatch } from "react-redux";
import {Layout ,Menu}  from "antd"
const { Header, Footer, Sider, Content } = Layout;
import { HomeOutlined , LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { setUser } from "../redux/User";


function ProtectedRoute({ children }) {
      //reducer state
  const user = useSelector((state)=>state.User.user)


  // random check 
 const navItems = [
   {
     label: <span onClick={()=>navigate('/')}>Home</span>,
     icon : <HomeOutlined />
   },
   {
     label: `${user? user.name:'Login'}`,
     icon: <UserOutlined />,
     children: [
        {
          label: <span onClick={()=>user.isAdmin? navigate('/admin'):navigate('/profile')}>My Profile</span>,
          icon: <ProfileOutlined/>
        }, 
        {
          label: <Link to ='/login' onClick={()=>localStorage.removeItem('token')}>LogOut</Link>,
          icon: <LogoutOutlined/>
        }
     ]

   }
 ]


 


   const dispatchEvent = useDispatch();
   const navigate = useNavigate();

  //random check
  const getValidUser = async () => {
    try {
      //show Loader
      dispatchEvent(showLoading())
      const response = await GetCurrentUser();
      dispatchEvent(setUser(response.data));
      dispatchEvent(hideLoading());
      //hide Loader
      console.log("rrrr" , response);
    } 
    catch (error) {
       dispatchEvent(hideLoading());
       localStorage.removeItem("token");
       navigate("/login");
      console.error("Error fetching current user:", error);
      dispatchEvent(setUser(null));
    }
  };

 

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);


  
  return <div> 
     <>
      <Layout>
      <Header style={{
        backgroundColor: '#001529',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: "100%",
        display: 'flex',
        alignItems: 'center',
      }}>
        <h3 className="demo-logo text-white m-0" style={{color:  "white"}}> Book my Show</h3>
        <Menu theme="dark" mode="horizontal" items={navItems}/> 
        </Header>

    </Layout>
    <div style={{ paddingLeft: "24px" }}>
  {children}
</div>
     </>
      
       
  </div>;
}

export default ProtectedRoute;