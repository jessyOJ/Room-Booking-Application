import React from 'react'

function MyProfile() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="col-md-6 bs">
    <h1>My Profile</h1>
    <h2>Name: {user?.name}</h2>
    <h2>Email: {user?.email}</h2>
    <h2>isAdmin: {user?.isAdmin ? "Yes" : "No"}</h2>
  </div>
  )
}

export default MyProfile