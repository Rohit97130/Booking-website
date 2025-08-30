import React, { Children } from 'react'
import {Tabs} from 'antd'
import Theatre from './Theatre'
import Booking from './Booking'


function Profile() {
    
    const tabItems = [
      {
        key: '1',
        label: "Theatre",
        children:<Theatre/>

      },{
         key: '2',
        label: "Booking",
        children:  <Booking/>
      }
    ]
  return (
    <div>
        <h1>Profile Page</h1>

         <Tabs items={tabItems} defaultActiveKey="2"/>
    </div>
  )
}

export default Profile