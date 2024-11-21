import React from "react";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from 'sweetalert2'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
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

  const from = moment(fromDate, "DD-MM-YYYY");
  const to = moment(toDate, "DD-MM-YYYY");

  // Calculate the total days
  const totalDays = to.diff(from, "days") + 1;

  useEffect(() => {
    
    const user= JSON.parse(localStorage.getItem('currentUser'))

    if(!user || user.name===''){
      window.location.href='/login'
      
    }
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = (
          await axios.post("/api/hotel-booking/getRoomsById", {
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
        window.location.href='/bookings'
      })
     
    } catch (err) {
      setError(true);
      Swal.fire('Oops','An error occurred ,Try again later','error')
    }
  }

  return (
    <div className="m-3 mb-5"  data-aos='flip-left'>

      {loading ? (
        <Loader />
      ) : room ? (
        <div className="row justify-content-center mt-1 bs">
          <div className="col-md-6">
            <h2 className="text-center">{room.name}</h2>
            <img src={room.imgUrl[0]} className="bigimg" />
          </div>
          <div className="col-md-6 ">
            <hr />

            <div style={{ textAlign: "right" }}>
              <b>
                <h2>Booking Details</h2>
                <p>
                  name:{JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>from date: {fromDate}</p>
                <p>to date: {toDate}</p>
                <p> Max Count = {room.maxCount}</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <b>
                <h2>Amount</h2>
                <hr />
                <p>Total per day: {totalDays}</p>
                <p>Rent per day :{room.rentPerDay}</p>
                <p>Total Amount:{totalAmount}</p>
              </b>
            </div>
            <div style={{ float: "right" }}>
              <StripeCheckout
                amount={totalAmount * 100}
                currency="NGN"
                token={onToken}
                stripeKey="pk_test_51QAULeGgyEOrbDfLMpnTQ4RzttjmyZpnqNCzF72325rE5DLPiHFaZfL7wkH7OBw7Zea8GA16d8lLqEmNpvlhLy9w004ZvpQGqf"
              >
                <button
                  className="btn btn-primary m-2"
                  style={{ backgroundColor: "palevioletred" }}
                >
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
