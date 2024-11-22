import React,{useState} from 'react'
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success"
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
function Loginscreen() {
const [email,setEmail]= useState('')
const[password,setPassword]= useState('')
const [loading, setLoading] = useState(false);
const[error,setError]=useState()
const[success,setSuccess]=useState()
const navigate = useNavigate()
async function login(){
setError('')
setSuccess(false)
    const user ={
    
        email,
        password,
    }
    try{
        setLoading(true)
        const response = await axios.post('/api/hotel-booking/login',user)
        const result =response.data
        message.success('login successful')
        setLoading(false)
        setSuccess(true)

     
            localStorage.setItem('currentUser', JSON.stringify(result));
            navigate('/home')
       

    }catch(error){
        setLoading(false)
        setError(true)
if(error.response && error.response.status===400){
    const errorMessage = error.response.data.error || error.response.data
    setError(errorMessage)
}
    }

 }
 

  return (
    <div>
        {loading &&(<Loader/>)}
        <div className='row justify-content-center mt-5'>
            <div className='col-4 md-9'>  
                <div className='bs'style={{backgroundColor:"MistyRose" }} >
                {error && (<Error message={error}/>)}
                {success && (<Success message='Login Sucessfully'/>)}
                <h2 className='h2'style={{textAlign:'center'}}>Login</h2>
                
                 <input type='text' className='form-control mb-2' placeholder='email'
                 value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                 <input type='text' className='form-control mb-2' placeholder='password'
                 value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                


            <button className='btn btn-primary mt-3' 
              style={{ backgroundColor: "palevioletred" }} 
              onClick={login}>
              Login
            </button>
            <div className="mt-3" style={{ textAlign: 'center' }}>
                            <p>Don't have an account? <a href="/register"  style={{ textDecoration: 'none' }}>Register here</a></p>
                        </div>
                </div>
                
            </div>

        </div>
        </div>
  )
}
 

export default Loginscreen