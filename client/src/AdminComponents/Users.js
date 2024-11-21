import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState("");
  const [error, seterror] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setloading(true);
        const response = await axios.get("/api/hotel-booking/getAllUsers");
        const users = response.data;
        setUsers(users);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="row">
      <div className="col md-10">
        <h2>My Users</h2>
        {loading && <Loader />}
        <table className="table table-striped table-light">
          <thead className="bs">
            <tr className="table-success">
              <th>User Id</th>
              <th> Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
