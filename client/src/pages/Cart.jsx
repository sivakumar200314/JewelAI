import axios from "axios";

function Cart({ cart, setCart }) {

const increaseQty = (index) => {
const updated = [...cart];
updated[index].qty += 1;
setCart(updated);
};

const decreaseQty = (index) => {
const updated = [...cart];


if (updated[index].qty > 1) {
  updated[index].qty -= 1;
  setCart(updated);
}


};

const removeItem = (index) => {
const updated = cart.filter((_, i) => i !== index);
setCart(updated);
};

const subtotal = cart.reduce(
  (total, item) =>
    total + item.qty * Number(item.price),
  0
);

const gst = subtotal * 0.18;
const delivery = 99;
const grandTotal = subtotal + gst + delivery;

const checkout = async () => {
if (cart.length === 0) {
alert("Your cart is empty");
return;
}


try {
  const userEmail =
    localStorage.getItem("userEmail");

  for (const item of cart) {
    await axios.post(
      "http://localhost:5000/api/orders/add",
      {
        userEmail: userEmail,
        productName: item.name,
        price: Number(item.price),
        quantity: item.qty,
        status: "Ordered",
      }
    );
  }

  alert("Order Placed Successfully");

  setCart([]);
} catch (error) {
  console.log(error);
  alert("Failed to save order");
}


};

return ( <div className="p-10 bg-black min-h-screen text-white">


  <h1 className="text-6xl font-bold mb-10">
    Shopping Cart
  </h1>

  <div className="grid md:grid-cols-3 gap-10">

    <div className="md:col-span-2 space-y-6">

      {cart.length === 0 ? (
        <div className="text-3xl">
          Your Cart is Empty
        </div>
      ) : (
        cart.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-3xl p-5 flex gap-5"
          >
           <img
  src={`http://localhost:5000/uploads/products/${item.image}`}
  alt={item.name}
  className="w-40 h-40 object-cover rounded-2xl"
/>

            <div className="flex-1">

              <h2 className="text-3xl font-bold">
                {item.name}
              </h2>

              <p className="text-2xl mt-3">
                  ₹{item.price}
                  </p>

              <div className="flex items-center gap-5 mt-5">

                <button
                  onClick={() => decreaseQty(index)}
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  -
                </button>

                <span className="text-2xl">
                  {item.qty}
                </span>

                <button
                  onClick={() => increaseQty(index)}
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  +
                </button>

              </div>

              <button
                onClick={() => removeItem(index)}
                className="mt-5 bg-red-500 text-white px-5 py-3 rounded-xl"
              >
                Remove
              </button>

            </div>
          </div>
        ))
      )}

    </div>

    <div className="bg-white text-black rounded-3xl p-8 h-fit">

      <h2 className="text-4xl font-bold mb-8">
        Order Summary
      </h2>

      <div className="space-y-5 text-2xl">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span>₹{gst.toFixed(0)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{delivery}</span>
        </div>

        <div className="flex justify-between font-bold text-3xl pt-5 border-t">
          <span>Total</span>
          <span>₹{grandTotal.toFixed(0)}</span>
        </div>

      </div>

      <button
        onClick={checkout}
        className="w-full mt-10 bg-black text-white py-4 rounded-2xl text-2xl hover:bg-gray-800"
      >
        Place Order
      </button>

    </div>

  </div>

</div>


);
}

export default Cart;
