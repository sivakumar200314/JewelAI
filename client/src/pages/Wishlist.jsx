function Wishlist({ wishlist, setWishlist, cart, setCart }) {

  const removeItem = (index) => {
    const updated = wishlist.filter((_, i) => i !== index);
    setWishlist(updated);
  };

  const moveToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white">

      <h1 className="text-6xl font-bold mb-10 text-pink-500">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (

        <h2 className="text-3xl text-gray-400">
          Wishlist is Empty
        </h2>

      ) : (

        <div className="grid md:grid-cols-3 gap-8">

          {wishlist.map((item, index) => (

            <div
              key={index}
              className="bg-white text-black rounded-3xl overflow-hidden"
            >

             <img
  src={`http://localhost:5000/uploads/products/${item.image}`}
  alt={item.name}
  className="w-full h-72 object-cover"
/>

              <div className="p-5">

                <h2 className="text-3xl font-bold">
                  {item.name}
                </h2>

                <p className="text-2xl mt-2">
                  {item.price}
                </p>

                <div className="flex gap-4 mt-5">

                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-black text-white px-5 py-3 rounded-xl flex-1"
                  >
                    Move to Cart
                  </button>

                  <button
                    onClick={() => removeItem(index)}
                    className="bg-red-500 text-white px-5 py-3 rounded-xl"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;