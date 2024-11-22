import React from "react";
import {Link} from 'react-router-dom'
function Navbar() {
  function logout(){
    localStorage.removeItem('currentUser')
    window.location.href='/'
  }
  
  const user =JSON.parse(localStorage.getItem('currentUser'))
  return (
    <div>
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/home">
          Jessy Room Booking Service
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" ><i class="fa fa-hamburger"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mr-3" >
            {user ? (<>
              <div class="dropdown">
  <Link class="btn btn-secondary dropdown-toggle"style={{ color: "MistyRose",backgroundColor:'black' }}  to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="fa fa-user"></i> {user.name}
  </Link>

  <ul class="dropdown-menu">
    <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
    {user.isAdmin &&(<li><Link class="dropdown-item" to="/admins">Admin</Link></li>)}
    <li><Link class="dropdown-item" to="/" onClick={logout}>Logout</Link></li>
 
  </ul>
</div></>):(<>
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to="/register">
                Register
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">
                Login
              </Link>
            </li>
           </>)}
          </ul>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default Navbar;
