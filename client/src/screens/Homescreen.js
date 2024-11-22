import React from "react";
import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import axios from "axios";
import BASE_URL from "../config.js"
import moment from "moment";
import Room from "../components/Room";
import Loader from "../components/Loader";
import "../resources/homescreen.css"
function Homescreen() {
  const { RangePicker } = DatePicker;
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [duplicateRoom, setDuplicateRoom] = useState([]);
  const[search,setSearch]=useState('')
  const[type,setType]=useState('all')
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = (await axios.get(`${BASE_URL}/api/hotel-booking/getRooms`)).data;
        setRooms(response);
        setDuplicateRoom(response);
        setloading(false);
      } catch (error) {
        seterror(true);
       
      }
    };

    fetchData(); // Call the async function
  }, []); // The empty dependency array ensures this runs once when the component mounts

  function filterDate(dates) {
    setFromDate(dates[0].format("DD-MM-YYYY"));
    setToDate(dates[1].format("DD-MM-YYYY"));

    var tempRoom = [];
    var availability = false;

    for (let rooms of duplicateRoom) {
      if (rooms.currentBooking.length > 0) {
        for (let bookings of rooms.currentBooking) {
          if (
            !moment(dates[0].format("DD-MM-YYYY")).isBetween(
              bookings.fromDate,
              bookings.toDate
            ) &&
            !moment(dates[1].format("DD-MM-YYYY")).isBetween(
              bookings.fromDate,
              bookings.toDate
            )
          ) {
            if (
              dates[0].format("DD-MM-YYYY") !== bookings.fromDate &&
              dates[0].format("DD-MM-YYYY") !== bookings.toDate &&
              dates[1].format("DD-MM-YYYY") !== bookings.fromDate &&
              dates[1].format("DD-MM-YYYY") !== bookings.toDate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || rooms.currentBooking.length === 0) {
        tempRoom.push(rooms);
      }
    }
    setRooms(tempRoom);
  }
function filterBySearch(){
  const tempRoom = duplicateRoom.filter(room=>room.name.toLowerCase().includes(search.toLowerCase()))
  setRooms(tempRoom)
}
function filterByType(e) {
  // Set the selected type
  setType(e);

  // Perform case-insensitive comparison
  if (e.trim().toLowerCase() !== 'all') {
    const tempRoom = duplicateRoom.filter(room =>
      room.type.trim().toLowerCase() === e.trim().toLowerCase()
    );
    setRooms(tempRoom);
  } else {
    // Reset to show all rooms if "All" is selected
    setRooms(duplicateRoom);
  }
}
return (
  <div className="home-container">
    <div className="filter-row">
      <div className="filter-item">
        <RangePicker format="DD-MM-YYYY" onChange={filterDate} />
      </div>
      <div className="filter-item">
        <input
          type="text"
          className="form-control"
          placeholder="Search rooms"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={filterBySearch}
        />
      </div>
      <div className="filter-item">
        <select
          className="form-control"
          value={type}
          onChange={(e) => filterByType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="dulexe">Dulexe</option>
          <option value="non-dulexe">Non-Dulexe</option>
        </select>
      </div>
    </div>
    <div className="rooms-container">
      {loading ? (
        <Loader />
      ) : (
        rooms.map((room, index) => (
          <div className="room-card" key={index}>
            <Room room={room} fromDate={fromDate} toDate={toDate} />
          </div>
        ))
      )}
    </div>
  </div>
);
}

export default Homescreen;
