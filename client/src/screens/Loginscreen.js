import React,{useState} from 'react'
import axios from 'axios'
import BASE_URL from "../config.js"
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success"
import { useNavigate, Link } from 'react-router-dom';
import { message } from 'antd';
import "../resources/loginscreen.css"
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
        const response = await axios.post(`${BASE_URL}/api/hotel-booking/login`,user)
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
    <div className="login-container">
      {loading && <Loader />}
      <div className="login-box">
        <div className="form-container">
          {error && <Error message={error} />}
          {success && <Success message="Login Successfully" />}
          <h2 className="login-header">Login</h2>
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
          <button className="btn btn-primary login-btn" onClick={login}>
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <Link href="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen