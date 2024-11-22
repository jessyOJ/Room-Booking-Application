
import mongoose  from 'mongoose'

const roomSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    maxCount:{
        type:String,
        required:true
    },
    rentPerDay:{
        type:String,
        required:true
    },
    
    phoneNumber:{
        type:String,
        required:true
    },
    imgUrl:[],
    currentBooking:[],
    description:{
        type:String,
        required:true
    }
},{timestamps:true}
)
const Rooms = mongoose.model('rooms',roomSchema)


export default Rooms
