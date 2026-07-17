import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      const res = await axios.post(
        "https://jewelai-backend-1.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.token) {
        // Save token
        localStorage.setItem("token", res.data.token);

        // Save user details
       localStorage.setItem(
        "userName",
        res.data.name
         );

         localStorage.setItem(
          "userEmail",
           res.data.email
            );

        alert("Login Successful");

        navigate("/");
      } else {
        alert(res.data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-10 rounded-2xl w-[400px] shadow-2xl">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white outline-none"
        />

        <button
          onClick={loginUser}
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300"
        >
          Login
        </button>

        <p className="text-center text-white mt-5">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-400 cursor-pointer ml-2"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;