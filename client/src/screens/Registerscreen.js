import React ,{useState}from 'react'
import axios from 'axios'
import BASE_URL from "../config.js"
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success"
import {useNavigate,Link}from  "react-router-dom"
import { message } from 'antd';
import "../resources/registerscreen.css"
function Registerscreen() {
const [name,setName] = useState('')
const [email,setEmail]= useState('')
const[password,setPassword]= useState('')
const [cpassword,setCpassword]=useState('')
const [loading, setLoading] = useState(false);
const[error,setError]=useState(false)
const[success,setSuccess]=useState(false)
const navigate=useNavigate()
async function register(){
 
  setError('');
  setSuccess(false);
 if(password===cpassword){
    const user ={
        name,
        email,
        password,
    }
    try {
      setLoading(true)
      const response = (await axios.post(`${BASE_URL}/api/hotel-booking/register`,user)).data
      message.success('Registration successful')
   
        setLoading(false) 
        setSuccess(true)  
   

        setName('')
        setEmail('')
        setPassword('')
        setCpassword('')
navigate('/login')
     
        
        
    } catch (error) {
      setLoading(false)
      setError(true)
      if(error.response && error.response.status===400){
        const errorMessage = error.response.data.error || error.response.data;
        setError(errorMessage);
       

      }
      else{
        setError('An unexpected error occurred.'); 
      }
      
    }
   
 }else{
  setError('Passwords do not match!');
    
 }

}
return (
  <div className="register-container">
    {loading && <Loader />}
    <div className="register-box">
      <div className="form-container">
        {error && <Error message={error} />}
        {success && <Success message="Registration successful" />}
        <h2 className="register-header">Register</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
        <button className="btn btn-primary register-btn" onClick={register}>
          Register
        </button>
        <div className="signin-link">
          <p>
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
}


export default Registerscreen