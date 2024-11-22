import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config.js"
import Loader from "../components/Loader";
import Error from "../components/Error";
export const Bookings = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setloading] = useState("");
  const [error, seterror] = useState("");
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true);
        const response = await axios.get(`${BASE_URL}/api/hotel-booking/getAllBookings`);
        const bookings = response.data;
        setBooking(bookings);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col md-10">
        <h2>My Bookings</h2>
        {loading && <Loader />}
        <table className="table table-striped table-light">
          <thead className="bs">
            <tr className="table-success">
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {booking.length &&
              booking.map((booking) => {
                return (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
