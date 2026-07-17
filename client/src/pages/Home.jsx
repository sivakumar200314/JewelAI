import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home({
  cart,
  setCart,
  wishlist,
  setWishlist,
  search,
}) {
  const navigate = useNavigate();
  

  const [selectedCategory, setSelectedCategory] =
    useState("All"); 
       const [products, setProducts] = useState([]);
        useEffect(() => {
  axios
    .get("https://jewelai-backend-1.onrender.com/api/products")
    .then((res) => {
      setProducts(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

    
    const [reviews, setReviews] = useState({});
    const addReview = async (productId) => {
      const token = localStorage.getItem("token");

            if (!token) {
              alert("Please Login First");
              navigate("/login");
              return;
              }

  const comment = prompt("Enter your review");

  if (!comment) return;

  try {

    await axios.post(
      "https://jewelai-backend-1.onrender.com/api/reviews/add",
      {
        userName:
          localStorage.getItem("userName") ||
          "Guest",
        productId,
        rating: 5,
        comment,
      }
    );

    alert("Review Added");

  } catch (error) {

    console.log(error);

  }

};

  

  const filteredProducts = products.filter(
  (item) => {

    const categoryMatch =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const searchMatch =
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  }
);

  return (

    <div className="bg-black min-h-screen text-white">

      {/* HERO SECTION */}

      <div className="h-[350px] bg-gradient-to-r from-blue-700 to-black flex flex-col items-center justify-center">

        <h1 className="text-7xl font-bold text-yellow-400 mb-5">
          JewelAI
        </h1>

        <p className="text-3xl text-white">
          Luxury Jewellery Collections
        </p>

      </div>

      {/* CATEGORY BUTTONS */}

      <div className="flex gap-5 justify-center py-10 flex-wrap px-5">

        {[
          "All",
          "Rings",
          "Earrings",
          "Necklaces",
          "Bracelets",
          "Watches",
        ].map((category) => (

          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-6 py-3 rounded-full text-lg font-bold transition ${
              selectedCategory === category
                ? "bg-yellow-400 text-black"
                : "bg-white text-black"
            }`}
          >
            {category}
          </button>

        ))}

      </div>

      {/* PRODUCTS */}

      <div className="px-10 py-14">

        <h2 className="text-6xl font-bold text-center mb-14">
          Featured Jewellery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {filteredProducts.map((item) => (

            <div
              key={item._id}
              className="bg-white text-black rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 relative"
            >

              {/* BEST SELLER */}

              <div className="absolute top-5 left-5 bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
                BEST SELLER
              </div>
              <button
                onClick={() => navigate("/account")}
                 className="absolute top-5 right-20 bg-white p-4 rounded-full shadow-lg"
              >
                   <FaUser />
                    </button>

              {/* WISHLIST */}

              <button
               onClick={() => {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please Login First");
    navigate("/login");
    return;
  }

  setWishlist([
    ...wishlist,
    item,
  ]);

  alert(
    `${item.name} added to wishlist`
  );

}}
                className="absolute top-5 right-5 bg-white p-4 rounded-full shadow-lg"
              >
                <FaHeart />
              </button>

              {/* IMAGE */}

              <img
  src={`https://jewelai-backend-1.onrender.com/uploads/products/${item.image}`}
  alt={item.name}
  className="w-full h-[350px] object-cover"
  onError={(e) => {
    console.log("Image not found:", item.image);
  }}
/>

              {/* DETAILS */}

              <div className="p-6">

                <h3 className="text-4xl font-bold mb-3">
                  {item.name}
                </h3>

                <p className="text-3xl text-gray-700 mb-6">
                  {item.price}
                </p>

                {/* ADD TO CART */}

                <button
                  onClick={() => {

                    const token = localStorage.getItem("token");

                     if (!token) {
                     alert("Please Login First");
                     navigate("/login");
                     return;
                      }

                     setCart([
                      ...cart,
                      {
                       ...item,
                        qty: 1,
                        },
                        ]);

                         alert(
                         `${item.name} added to cart`
                        );

                           }}
                  className="bg-black text-white px-6 py-4 rounded-2xl w-full text-2xl hover:bg-gray-800"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addReview(item.id)}
                  className="bg-yellow-500 text-black px-6 py-4 rounded-2xl w-full text-2xl mt-3"
                  >
                   Add Review
                   
                    </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Home;