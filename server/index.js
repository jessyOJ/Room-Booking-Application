
import express from "express"
import cors from "cors"
import connectDB from "./dbConnect.js"
const app = express()
app.use(cors());
connectDB()
import rooms from './router/rooms.js'
import user from './router/User.js'
import bookings from './router/BookingDetails.js'

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())
app.use('/api/hotel-booking', rooms);
app.use('/api/hotel-booking', user);
app.use('/api/hotel-booking', bookings);
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('server has started on port 3000...')
})