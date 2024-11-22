import React from "react";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config.js"
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from 'sweetalert2'
import AOS from 'aos';
import { useNavigate } from "react-router-dom";
import 'aos/dist/aos.css'; 
import "../resources/bookingscreen.css"
AOS.init(
    {duration:1000}
);
function Bookingscreen() {
  const { id, fromDate, toDate } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
const navigate =useNavigate()
  const from = moment(fromDate, "DD-MM-YYYY");
  const to = moment(toDate, "DD-MM-YYYY");

  // Calculate the total days
  const totalDays = to.diff(from, "days") + 1;

  useEffect(() => {
    
    const user= JSON.parse(localStorage.getItem('currentUser'))

    if(!user || user.name===''){
      navigate('/login')
      
    }
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = (
          await axios.post(`${BASE_URL}/api/hotel-booking/getRoomsById`, {
            id:id,
          })
        ).data;
        setRoom(response);
        setTotalAmount(response.rentPerDay * totalDays);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    fetchRoom();
  }, [id, totalDays]);

  if(!localStorage.getItem('currentUser')){ // This ensures the component doesn't render before user is validated
    return null
  }

  async function onToken(token) {
    const bookingDetails = {
      room,
      userId: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalDays,
      totalAmount,
      token,
    };
    try {
      setLoading(true)
      const result = await axios.post(
        "/api/hotel-booking/bookings",
        bookingDetails
      );
      setLoading(false)
      Swal.fire('Congratulations','Room has been booked successfully','success').then((result)=>{
        navigate('/bookings')
      })
     
    } catch (err) {
      setError(true);
      Swal.fire('Oops','An error occurred ,Try again later','error')
    }
  }

  return (
    <div className="booking-container" data-aos="flip-left">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="row justify-content-center booking-wrapper">
          <div className="col-md-6 booking-image-section">
            <h2 className="text-center booking-title">{room.name}</h2>
            <img src={room.imgUrl[0]} className="booking-image" alt="Room" />
          </div>
          <div className="col-md-6 booking-details-section">
            <hr />
            <div className="booking-details">
              <b>
                <h2>Booking Details</h2>
                <p>Name: {JSON.parse(localStorage.getItem("currentUser")).name}</p>
                <p>From Date: {fromDate}</p>
                <p>To Date: {toDate}</p>
                <p>Max Count: {room.maxCount}</p>
              </b>
            </div>
            <div className="booking-amount">
              <b>
                <h2>Amount</h2>
                <hr />
                <p>Total Days: {totalDays}</p>
                <p>Rent per Day: NGN {room.rentPerDay}</p>
                <p>Total Amount: NGN {totalAmount}</p>
              </b>
            </div>
            <div className="booking-actions">
              <StripeCheckout
                amount={totalAmount * 100}
                currency="NGN"
                token={onToken}
                stripeKey="pk_test_51QAULeGgyEOrbDfLMpnTQ4RzttjmyZpnqNCzF72325rE5DLPiHFaZfL7wkH7OBw7Zea8GA16d8lLqEmNpvlhLy9w004ZvpQGqf"
              >
                <button className="btn btn-primary pay-now-btn" style={{float:"right"}}>
                  Pay Now
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}


export default Bookingscreen;
