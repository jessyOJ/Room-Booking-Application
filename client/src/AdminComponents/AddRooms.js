import axios from 'axios'
import BASE_URL from "../config.js"
import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
function AddRooms() {
  const navigate =useNavigate()
const [name,setName]= useState('')
const [type,setType]= useState('')
const [maxCount,setMaxCount]= useState('')
const [rentPerDay,setRentPerday]= useState('')
const [phoneNumber,setPhoneNumber]= useState('')
const [img1,setImg1]= useState('')
const [img2,setImg2]= useState('')
const [img3,setImg3]= useState('')
const [description,setDescription]= useState('')
const [loading, setLoading] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);


  async function CreateRoom () {
    const rooms = { name, type, maxCount, rentPerDay, phoneNumber, imgUrl:[img1, img2, img3], description };
    console.log(rooms)
    try {
      setError(false);
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/hotel-booking/createRoom`,rooms);
      const room = response.data;
      setLoading(false);
      Swal.fire('Congratulations', 'Room created successfully', 'success').then(() => {
        navigate('/admins')
      });

    } catch (error) {
      setError(true);
      setLoading(false);
      Swal.fire('Oops', 'Error in creating a room', 'error');
    }
  };
  return (
    <div className='row'>
      {loading&&(<Loader/>)}
      <div className='col-5 md-5'>
        <input type='text' className='form-control mb-2' placeholder='Name'
        value={name} onChange={(e)=>{setName(e.target.value)}} />
        <select type='text' className='form-control mb-2'placeholder='Type' 
        value={type} onChange={(e)=>{setType(e.target.value)}}>
          <option value="dulexe">Dulexe</option>
          <option value="non-dulexe">Non-Dulexe</option>
        </select>
        <input type='text' className='form-control mb-2' placeholder='Max Count'
        value={maxCount} onChange={(e)=>{setMaxCount(e.target.value)}} />
        <input type='text' className='form-control mb-2' placeholder='Rent per Day'
        value={rentPerDay} onChange={(e)=>{setRentPerday(e.target.value)}} />
        <input type='text' className='form-control mb-2' placeholder='Phone Number'
        value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} />
      </div>
      <div className='col-5 md-5'>
      <input type='text' className='form-control mb-2' placeholder='image URL1'
      value={img1} onChange={(e)=>{setImg1(e.target.value)}} />
        <input type='text' className='form-control mb-2' placeholder='image URL2'
        value={img2} onChange={(e)=>{setImg2(e.target.value)}} />
        <input type='text' className='form-control mb-2' placeholder='image URL3' 
        value={img3} onChange={(e)=>{setImg3(e.target.value)}}/>
        <input type='text' className='form-control mb-2' placeholder='Description'
        value={description} onChange={(e)=>{setDescription(e.target.value)}} />
<div style={{float:'right'}}>
<button className='btn btn-primary mt-3'style={{ backgroundColor: "palevioletred" }} onClick={CreateRoom}>Create Room</button>
</div>
      </div>

    </div>
  )
}

export default AddRooms