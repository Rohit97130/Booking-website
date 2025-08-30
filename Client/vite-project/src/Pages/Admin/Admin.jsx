import React from 'react'
import {Tabs,Button } from 'antd';
import { RightCircleFilled } from '@ant-design/icons';
import Movies from './Movies';
import Theatres from './Theatres';
import MovieForm from './MovieForm';

function Admin() {
  const  tabItems = [
        {
            key:'1',
            label:'Movies',
            children : <Movies/>
        },
        {
            key:'2',
            label:'Theatres',
            children : <Theatres/>
        }
    ]
  return (
     <div>
        <h1>Admin Page</h1>
         
         <Tabs style={{paddingLeft: '20px'}} items={tabItems}/>
       
         
    </div>
  )
}

export default Admin