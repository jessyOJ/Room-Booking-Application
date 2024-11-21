import React ,{useState}from 'react'
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success"
function Registerscreen() {
const [name,setName] = useState('')
const [email,setEmail]= useState('')
const[password,setPassword]= useState('')
const [cpassword,setCpassword]=useState('')
const [loading, setLoading] = useState(false);
const[error,setError]=useState(false)
const[success,setSuccess]=useState(false)

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
      const response = (await axios.post('/api/hotel-booking/register',user)).data
  
                  // document.getElementById('result').innerText = `Registration successful: ${result.message || 'Welcome!'}`;
        setLoading(false) 
        setSuccess(true)  
    

        setName('')
        setEmail('')
        setPassword('')
        setCpassword('')

     
        
        
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
    <div>
      {loading &&(<Loader/>)}
        <div className='row justify-content-center mt-5'>
            <div className='col-4 md-9'>
                <div className='bs'style={{backgroundColor:"MistyRose" }} >
                {error && <Error message={error} />}
                {success &&(<Success message='Registration successful'/>)}
                <h2 className='h2'style={{textAlign:'center'}}>Register</h2>
                <input type='text' className='form-control mb-2'placeholder='name'
                 value={name} onChange={(e)=>{setName(e.target.value)}}/> 
                 <input type='text' className='form-control mb-2' placeholder='email'
                 value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                 <input type='text' className='form-control mb-2' placeholder='password'
                 value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                 <input type='text' className='form-control mb-2' placeholder='confirm Password'
                 value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}/>


        
           <button className='btn btn-primary mt-3' 
              style={{ backgroundColor: "palevioletred" }} 
              onClick={register}>
              Register
            </button>
           
          <div className='mt-3'style={{ textAlign: 'right' }}>
          <p><a href='/login'  style={{ textDecoration: 'none' }}>sign in</a></p>
          </div>
                </div>
                
            </div>

        </div>
        </div>
  )
}

export default Registerscreen