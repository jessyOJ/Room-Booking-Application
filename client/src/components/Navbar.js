import React from "react";
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('currentUser');
    navigate('/');
  }

  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Jessy Room Booking Service
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"><i className="fa fa-hamburger"></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mr-3">
              {user ? (
                <>
                  <div className="dropdown">
                    <Link className="btn btn-secondary dropdown-toggle" style={{ color: "MistyRose", backgroundColor: 'black' }} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa fa-user"></i> {user.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                      {user.isAdmin && (<li><Link className="dropdown-item" to="/admins">Admin</Link></li>)}
                      <li><Link className="dropdown-item" to="/" onClick={logout}>Logout</Link></li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
