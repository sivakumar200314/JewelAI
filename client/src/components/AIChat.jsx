import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaImage,
  FaHeart,
  FaMicrophone,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AIChat({
  cart,
  setCart,
  wishlist,
  setWishlist,
}) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

    const [listening, setListening] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm JewelAI Assistant. Ask me anything about jewellery.",
    },
  ]);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop =
        chatBodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // ==========================
  // SEND MESSAGE
  // ==========================

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");

    setLoading(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

     const res = await axios.post(
  "https://jewelai-backend-1.onrender.com/api/ai/chat",
  {
    message: currentMessage,
  }
);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.reply,
          products: res.data.products || [],
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ AI Server Error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
// VOICE INPUT
// ==========================

const startListening = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  setListening(true);

  recognition.start();

  recognition.onresult = (event) => {

    const transcript =
      event.results[0][0].transcript;

    setMessage(transcript);

  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.onerror = () => {
    setListening(false);
  };
};

  // ==========================
  // IMAGE SEARCH
  // ==========================

  const sendImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        image: imagePreview,
      },
    ]);

    setImage(null);
    setImagePreview("");

    setLoading(true);

    try {
     const res = await axios.post(
  "https://jewelai-backend-1.onrender.com/api/ai/image-search",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.message,
          products: res.data.products || [],
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Image Search Error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // ADD TO CART
  // ==========================

  const addToCart = (product) => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    setCart([
      ...cart,
      {
        ...product,
        qty: 1,
      },
    ]);

    alert(`${product.name} added to cart`);
  };

  // ==========================
  // ADD TO WISHLIST
  // ==========================

  const addToWishlist = (product) => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    setWishlist([
      ...wishlist,
      product,
    ]);

    alert(
      `${product.name} added to wishlist`
    );
  };
  return (
  <>
    {/* Floating Button */}
    <button
      onClick={() => setOpen(!open)}
      className="fixed bottom-6 right-6 bg-black text-white w-16 h-16 rounded-full shadow-xl z-50"
    >
      {open ? <FaTimes size={24} /> : <FaRobot size={26} />}
    </button>

    {open && (
      <div className="fixed bottom-24 right-6 w-[390px] h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-black text-white p-4">
          <h2 className="font-bold text-lg">
            🤖 JewelAI Assistant
          </h2>
          <p className="text-sm text-gray-300">
            Ask about jewellery or upload an image.
          </p>
        </div>

        {/* Messages */}
        <div
          ref={chatBodyRef}
          className="flex-1 overflow-y-auto bg-gray-100 p-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black shadow"
                }`}
              >
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="Uploaded"
                    className="w-40 rounded-lg"
                  />
                ) : (
                  <p>{msg.text}</p>
                )}

                {msg.products?.length > 0 && (
                  <div className="mt-4 space-y-4">

                    {msg.products.map((product) => (

                      <div
                        key={product._id}
                        className="bg-white border rounded-xl p-3 shadow"
                      >

                        <img
                          src={`https://jewelai-backend-1.onrender.com/uploads/products/${product.image}`}
                          alt={product.name}
                          className="w-full h-44 object-cover rounded-lg"
                        />

                        <h3 className="font-bold text-lg mt-3">
                          {product.name}
                        </h3>

                        <p className="text-yellow-600 font-bold text-lg">
                          ₹ {product.price}
                        </p>

                        <p className="text-gray-500 text-sm mt-1">
                          {product.category}
                        </p>

                        <div className="flex gap-2 mt-3">

                          <button
                            onClick={() =>
                              addToCart(product)
                            }
                            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                          >
                            🛒 Add to Cart
                          </button>

                          <button
                            onClick={() =>
                              addToWishlist(product)
                            }
                            className="bg-pink-500 text-white px-4 rounded-lg hover:bg-pink-600"
                          >
                            <FaHeart />
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-xl px-4 py-3 shadow">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:200ms]"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:400ms]"></span>
                </div>
              </div>
            </div>
          )}
        </div>
                {/* Image Preview */}
        {imagePreview && (
          <div className="px-3 py-2 border-t bg-white">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Footer */}
        <div className="border-t bg-white p-3 flex items-center gap-2">

          {/* Upload Image */}
          <label className="cursor-pointer">
            <FaImage
              size={22}
              className="text-gray-600 hover:text-blue-500"
            />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) return;

                setImage(file);
                setImagePreview(
                  URL.createObjectURL(file)
                );
              }}
            />
          </label>

          {/* Message Input */}
          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask JewelAI..."
            className="flex-1 border rounded-lg px-3 py-2 text-black outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                image ? sendImage() : sendMessage();
              }
            }}
          />

          {/* Send Button */}
          <button
  onClick={startListening}
  className={`px-3 py-2 rounded-lg ${
    listening
      ? "bg-red-500 text-white"
      : "bg-blue-500 text-white"
  }`}
>
  <FaMicrophone />
</button>
          <button
            disabled={loading}
            onClick={
              image ? sendImage : sendMessage
            }
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            <FaPaperPlane />
          </button>

        </div>

      </div>
    )}
  </>
);

}

export default AIChat;