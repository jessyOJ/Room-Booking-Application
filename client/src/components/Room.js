import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

// ..
AOS.init(
    {duration:1000}
);

function Room({ room ,fromDate,toDate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row  bs " data-aos="zoom-out-up" >
      <div className=" col-md-4 ">
        <img src={room.imgUrl[0]} className="smallimg" />
      </div>
      <div className="col-md-7 text-left">
        <h2>{room.name}</h2>
        <b>
          <p>Max count : {room.maxCount}</p>
          <p>Phonenumber : {room.phoneNumber}</p>
          <p>Type : {room.type} </p>
          <p>Price: NGN {room.rentPerDay}/day</p>
        </b>
        <div style={{ float: "right" }}>
          {(fromDate && toDate) &&(     <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
  <button
    className="btn btn-primary m-2"
    style={{ backgroundColor: "palevioletred" }}
   
  >
    Book Now
  </button>
</Link>)}
   

          <button
            className="btn btn-primary m-2"
            onClick={handleShow}
            style={{ backgroundColor: "palevioletred" }}
          >
            View Details
          </button>
        </div>
      </div>

      <Modal    show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Carousel>
            {room.imgUrl.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ backgroundColor: "palevioletred" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
