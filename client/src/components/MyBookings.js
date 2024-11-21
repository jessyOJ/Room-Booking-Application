import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Tag } from "antd";
function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookings, setBooking] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/hotel-booking/getBookingById", {
          userId: user._id,
        });
        const rooms = response.data;
        setBooking(rooms);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchBookings();
  }, []);
  async function cancelBooking(bookingId, roomId) {
    try {
      setLoading(true);
      const response = await axios.post("/api/hotel-booking/cancelBooking", {
        bookingId,
        roomId,
      });
      const result = response.data;
      console.log(result);
      setLoading(false);
      Swal.fire("congrats", "Booking successfully cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      Swal.fire("Oops", "unable to cancel booking", "error");
      setError(true);
      setLoading(false);
    }
  }
  return (
    <div className="row ">
    <div className="col-md-6">
     
      {error && <Error message="Error loading bookings" />}
      {loading && <Loader />}
      {bookings &&
        bookings.map((booking) => (
          <div key={booking._id} className="bs">
            <b>
              <h2>{booking.room}</h2>
            </b>
            <p>
              <b>BookingId:</b> {booking._id}
            </p>
            <p>
              <b>Check-In:</b> {booking.fromDate}
            </p>
            <p>
              <b>Check-Out:</b> {booking.toDate}
            </p>
            <p>
              <b>Amount :</b> {booking.totalAmount}
            </p>
            <p>
              <b>Status: </b>
              {""}
              {booking.status === "Cancelled" ? (
                <Tag color="red">Cancelled</Tag>
              ) : (
                <Tag color="green">Confirmed</Tag>
              )}
            </p>

            {booking.status !== "Cancelled" && (
              <div className="text-end">
                <button
                  className="btn btn-primary "
                  style={{ backgroundColor: "palevioletred" }}
                  onClick={() => {
                    cancelBooking(booking._id, booking.roomId);
                  }}
                >
                  CANCEL BOOKING
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  </div>
  )
}

export default MyBookings