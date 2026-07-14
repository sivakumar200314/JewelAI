import AIChat from "./components/AIChat";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AIImageSearch from "./components/AIImageSearch";

import {
  FaBars,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaUser,
} from "react-icons/fa";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";

function App() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");


  const token = localStorage.getItem("token");

  const checkLogin = (path) => {
    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    navigate(path);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    alert("Logged Out Successfully");

    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-6 py-5 bg-white text-black shadow-md">
        {/* LEFT SIDE */}

        <div className="flex items-center gap-5">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl"
          >
            <FaBars />
          </button>

          <Link to="/">
            <h1 className="text-4xl font-bold tracking-wide">
              JewelAI
            </h1>
          </Link>
        </div>

        {/* SEARCH BAR */}

        <div className="flex-1 mx-10">
          <div className="flex items-center bg-white border-2 border-gray-300 rounded-2xl px-5 py-3">
            <FaSearch className="text-gray-500 text-xl" />

            <input
           type="text"
           placeholder="Search for Jewellery..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="w-full ml-4 outline-none text-lg"
           />

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-8">
          {/* ACCOUNT */}

          <button
            onClick={() => checkLogin("/account")}
            className="relative"
          >
            <FaUser
              size={24}
              className="hover:text-blue-500"
            />
          </button>

          {/* WISHLIST */}

          <button
            onClick={() => checkLogin("/wishlist")}
            className="relative"
          >
            <FaHeart
              size={24}
              className="hover:text-red-500"
            />

            <span className="absolute -top-3 -right-3 bg-black text-white text-xs px-2 py-1 rounded-full">
              {wishlist.length}
            </span>
          </button>

          {/* CART */}

          <button
            onClick={() => checkLogin("/cart")}
            className="relative"
          >
            <FaShoppingCart size={26} />

            <span className="absolute -top-3 -right-3 bg-black text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          </button>
        </div>
      </nav>

      {/* SIDEBAR */}

      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-screen bg-white text-black shadow-2xl z-50 p-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-4xl mb-10"
          >
            ✕
          </button>

          <div className="flex flex-col gap-8 text-xl font-medium">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            {!token && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>

            <button
              onClick={() => {
                checkLogin("/wishlist");
                setMenuOpen(false);
              }}
              className="text-left"
            >
              Wishlist
            </button>

            <button
              onClick={() => {
                checkLogin("/cart");
                setMenuOpen(false);
              }}
              className="text-left"
            >
              Cart
            </button>

            <button
              onClick={() => {
                checkLogin("/account");
                setMenuOpen(false);
              }}
              className="text-left"
            >
              Account
            </button>

            {token && (
              <button
                onClick={logoutUser}
                className="text-left text-red-600 font-bold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* ROUTES */}

      <Routes>
        <Route
         path="/"
         element={
          <Home
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            search={search}
               />
             }
              />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route path="/ai-image-search" element={<AIImageSearch />} />

        <Route
          path="/account"
          element={<Account />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>
      <AIChat
  cart={cart}
  setCart={setCart}
  wishlist={wishlist}
  setWishlist={setWishlist}
/>
    </div>
  );
}

export default App;