import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
function Loader() {
  let [loading, setLoading] = useState(true);
  return (
    <div
    style={{
      display: "flex",         // Flexbox for centering
      justifyContent: "center", // Centers horizontally
      alignItems: "center",     // Centers vertically
      marginTop: 0              // Remove margin if centering vertically
    }}
  >

      <div className="sweet-loading text-center">
        <HashLoader
          color="#DB7093"
          loading={loading}
          css=""
          size={80}
          
        />
      </div>
    </div>
  );
}

export default Loader;
