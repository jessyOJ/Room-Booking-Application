import React from "react";
import "../resources/navbar.css"
import {Link}from "react-router-dom"
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
        <a class="navbar-brand" href="/home">
          Jessy Room Booking Service
        </a>
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
  <a class="btn btn-secondary dropdown-toggle"style={{ color: "MistyRose",backgroundColor:'black' }}  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="fa fa-user"></i> {user.name}
  </a>

  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="/profile">Profile</a></li>
    {user.isAdmin &&(<li><a class="dropdown-item" href="/admins">Admin</a></li>)}
    <li><a class="dropdown-item" href="/" onClick={logout}>Logout</a></li>
 
  </ul>
</div></>):(<>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/register">
                Register
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">
                Login
              </a>
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
