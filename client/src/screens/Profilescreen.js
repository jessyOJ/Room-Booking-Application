import React, {useEffect } from "react";
import { Tabs } from "antd";
import MyBookings from "../components/MyBookings";
import MyProfile from "../components/MyProfile";
import { useNavigate } from "react-router-dom";
import "../resources/profilescreen.css"
function Profilescreen() {
  const { TabPane } = Tabs;
  const navigate =useNavigate()
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      return (navigate ("/login"));
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Profile" key="1">
          <MyProfile />
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}


export default Profilescreen;



