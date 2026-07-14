import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-10 rounded-2xl w-[400px] shadow-2xl">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

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
          onClick={registerUser}
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300"
        >
          Register
        </button>

        <p className="text-center text-white mt-4">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 cursor-pointer ml-2"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;