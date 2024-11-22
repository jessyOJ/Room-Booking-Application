import React, { useState,useEffect } from 'react'
import { Tabs } from 'antd';
import { Bookings } from '../AdminComponents/Bookings';
import Rooms from '../AdminComponents/Rooms';
import Users from '../AdminComponents/Users';
import AddRooms from '../AdminComponents/AddRooms';
import { useNavigate } from 'react-router-dom';
const { TabPane } = Tabs;
function Adminscreen() {
  const navigate =useNavigate()
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
  
    // Check if the user exists in localStorage
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
  
      // Check if isAdmin exists and is false
      if (!parsedUser.isAdmin) {
        navigate('/home')
      }
    } else {
      // Redirect to login if currentUser is not found
      navigate('/login')
    }
  }, []);
  
  
  return (
    <div className='mt-3 mr-3 ml-3 bs'>
        <h2 className='text-center'style={{fontSize:'30px'}}>Admin Panel</h2>
        <Tabs defaultActiveKey="1" >
    <TabPane tab="booking" key="1">
      <Bookings/>
    </TabPane>
    <TabPane tab="rooms" key="2">
      <Rooms/>
    </TabPane>
    <TabPane tab="add rooms" key="3">
     <AddRooms/>
    </TabPane>
    <TabPane tab="users" key="4">
     <Users/>
    </TabPane>
  </Tabs>
    </div>
  )
}

export default Adminscreen


