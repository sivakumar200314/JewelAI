import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Account() {
const navigate = useNavigate();

const [orders, setOrders] = useState([]);

const name =
localStorage.getItem("userName") || "User";

const email =
localStorage.getItem("userEmail") || "No Email";

useEffect(() => {
axios
.get(
`http://localhost:5000/api/orders/${email}`
)
.then((res) => {
setOrders(res.data);
})
.catch((err) => {
console.log(err);
});
}, [email]);

const logoutUser = () => {
localStorage.removeItem("token");
localStorage.removeItem("userName");
localStorage.removeItem("userEmail");


navigate("/login");


};

return (
<div
style={{
background: "#0f0f0f",
minHeight: "100vh",
color: "white",
padding: "40px",
}}
>
<h1 style={{ marginBottom: "30px" }}>
My Account </h1>


  <div
    style={{
      background: "#1b1b1b",
      padding: "25px",
      borderRadius: "20px",
      marginBottom: "30px",
    }}
  >
    <h2>User Details</h2>

    <p>Name: {name}</p>
    <p>Email: {email}</p>
  </div>

  <div
    style={{
      background: "#1b1b1b",
      padding: "25px",
      borderRadius: "20px",
    }}
  >
    <h2>My Orders</h2>

    {orders.length === 0 ? (
      <p>No Orders Yet</p>
    ) : (
      orders.map((item, index) => (
        <div
          key={index}
          style={{
            background: "#2a2a2a",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "15px",
          }}
        >
          <p>
            Product: {item.productName}
          </p>

          <p>
            Price: ₹{item.price}
          </p>

          <p>
            Quantity: {item.quantity}
          </p>

          <p>
            Status: {item.status}
          </p>
        </div>
      ))
    )}
  </div>

  <button
    onClick={logoutUser}
    style={{
      marginTop: "20px",
      background: "red",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>


);
}

export default Account;
