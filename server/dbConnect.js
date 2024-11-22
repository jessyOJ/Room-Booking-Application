import mongoose from 'mongoose'
const URL="mongodb+srv://jessy123:1234567890@cluster0.xk4co.mongodb.net/hotel-booking"

async function connectDB(){
    mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("connected to the data base successfully")
    }).catch((e)=>{
        console.log("unable to connect to the database",e)
    })
}
connectDB()
export default connectDB