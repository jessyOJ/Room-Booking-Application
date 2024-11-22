import React,{useEffect,useState}from 'react'
import axios from "axios";
import BASE_URL from "../config.js"
import Loader from "../components/Loader";
import Error from "../components/Error";
function Rooms() {
const [rooms,setRooms]= useState([])
const [loading,setLoading]=useState('')
const[error,setError]=useState('')
useEffect(() => {
const fetchRooms = async()=>{
try {
    setLoading(true)
    const response = await axios.get(`${BASE_URL}/api/hotel-booking/getRooms`)
    const rooms = response.data
    setRooms(rooms)
    setLoading(false)
} catch (error) {
    setError(error)
    setLoading(false)
}
}
fetchRooms()
}, [])

  return (
    <div className='row'>
   <div className='col md-10 '>
    <h2>My Rooms</h2>
    {loading &&(<Loader/>)}
   
        <table className='table table-striped table-light'>
            <thead className='bs'>
                <tr className='table-success'>
                    <th>Room Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Rent per Day</th>
                    <th>Max Count</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
<tbody>
{rooms.length && (rooms.map(room=>{
   return (    <tr>
        <td>{room._id}</td>
        <td>{room.name}</td>
        <td>{room.type}</td>
        <td>{room.rentPerDay}</td>
        <td>{room.maxCount}</td>
        <td>{room.phoneNumber}</td>
    </tr>)
}))}

</tbody>
        </table>
    

   </div>
    </div>
  )
}

export default Rooms