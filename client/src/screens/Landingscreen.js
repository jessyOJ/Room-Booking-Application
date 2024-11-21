import React from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

// ..
AOS.init(
    {duration:2000}
);

function Landingscreen() {
  return (
    <div className="container-fluid landing">
      <div className="row justify-content-center">
        <div className="col-md-10 text-center" style={{borderRight:'8px solid palevioletred'}}>
          <h1 data-aos="zoom-in"style={{ color: "palevioletred", fontSize: "105px" }}>
            JessyRoom Booking Service</h1>
          <h2 data-aos="fade-up" data-aos-offset="0"data-aos-duration="1000" data-aos-once="true" style={{ color: "palevioletred" }}>
           " Your comfort is our priority!"
</h2>
          <Link to='/home'>
            <button
              className="btn btn primary mt-2"
              style={{ backgroundColor: "palevioletred" }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landingscreen;
