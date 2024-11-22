import {BrowserRouter,Route,Link, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      

    <BrowserRouter>
      <Navbar/>
    <Routes>
    <Route path='/home' element={<Homescreen/>}/>
    <Route path='/book/:id/:fromDate/:toDate' element={<Bookingscreen/>}/>
    <Route path='/login' element={<Loginscreen/>}/>
    <Route path='/register' element={<Registerscreen/>}/>
    <Route path='/profile' element={<Profilescreen/>}/>
    <Route path='/admins'  element={<Adminscreen/>}/>
    <Route path='/' element={<Landingscreen/>}/>
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
