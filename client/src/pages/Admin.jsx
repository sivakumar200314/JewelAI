import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {



const [products, setProducts] = useState([]);
const [search, setSearch] = useState("");
const [image, setImage] = useState(null);

useEffect(() => {
fetchProducts();
}, []);

const  [product, setProduct] = useState({
  name: "",
  category: "",
  subCategory: "",
  brand: "JewelAI",
  description: "",
  price: "",
  originalPrice: "",
  discount: 0,
  stock: 20,
  image: "",
  weight: "",
  purity: "22K",
  material: "Gold",
  gender: "Women",
  occasion: "Daily Wear",
  rating: 4.5,
  reviews: 0,
  featured: false,
  newArrival: false,
  bestseller: false,
}); 
 const fetchProducts = async () => {
try {
const res = await axios.get("https://jewelai-backend-1.onrender.com/api/products");


  setProducts(res.data);
} catch (error) {
  console.log(error);
}


};

const handleChange = (e) => {
setProduct({
...product,
[e.target.name]: e.target.value,
});
};

const addProduct = async () => {
try {
const formData = new FormData();

formData.append("name", product.name);
formData.append("category", product.category);
formData.append("description", product.description);
formData.append("price", product.price);
formData.append("stock", product.stock);

formData.append("image", image);

await axios.post(
  "https://jewelai-backend-1.onrender.com/api/products/add",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);


  alert("Product Added");
setProduct({
  name: "",
  category: "",
  subCategory: "",
  brand: "JewelAI",
  description: "",
  price: "",
  originalPrice: "",
  discount: 0,
  stock: 20,
  image: "",
  weight: "",
  purity: "22K",
  material: "Gold",
  gender: "Women",
  occasion: "Daily Wear",
  rating: 4.5,
  reviews: 0,
  featured: false,
  newArrival: false,
  bestseller: false,
});
  fetchProducts();

} catch (error) {
  console.log(error);
}


};

const deleteProduct = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

   await axios.delete(
  `https://jewelai-backend-1.onrender.com/api/products/${id}`
);
    alert("Product Deleted Successfully!");

    fetchProducts();

  } catch (error) {
    console.log(error);
  }
};

return ( <div className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-5xl font-bold text-yellow-500 mb-8">
  💎 JewelAI Admin Dashboard
</h1>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

  <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
    <p className="text-gray-400">Total Products</p>
    <h2 className="text-4xl font-bold text-yellow-400">
      {products.length}
    </h2>
  </div>

  <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
    <p className="text-gray-400">Orders</p>
    <h2 className="text-4xl font-bold text-green-400">
      0
    </h2>
  </div>

  <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
    <p className="text-gray-400">Users</p>
    <h2 className="text-4xl font-bold text-blue-400">
      0
    </h2>
  </div>

  <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
    <p className="text-gray-400">Revenue</p>
    <h2 className="text-4xl font-bold text-pink-400">
      ₹0
    </h2>
  </div>

</div>

  <div className="max-w-2xl bg-slate-900 p-8 rounded-2xl">

    <input
      type="text"
      placeholder="Product Name"
      name="name"
      value={product.name}
      onChange={handleChange}
      className="w-full p-4 mb-5 rounded-lg bg-slate-800"
    />

    <input
      type="number"
      placeholder="Price"
      name="price"
      value={product.price}
      onChange={handleChange}
      className="w-full p-4 mb-5 rounded-lg bg-slate-800"
    /> 
  <input
  type="file"
  accept="image/*"
  className="w-full p-4 mb-5 rounded-lg bg-slate-800"
  onChange={(e) => setImage(e.target.files[0])}
/>

{image && (
  <img
    src={URL.createObjectURL(image)}
    alt="Preview"
    className="w-40 h-40 object-cover rounded-xl mb-5"
  />
)}


   <select
  name="category"
  value={product.category}
  onChange={handleChange}
  className="w-full p-4 mb-5 rounded-lg bg-slate-800"
>
  <option value="">Select Category</option>
<option value="Gold Rings">Gold Rings</option>
<option value="Diamond Rings">Diamond Rings</option>
 <option value="Watches">Watches</option>
<option value="Necklaces">Necklaces</option>
<option value="Chains">Chains</option>
<option value="Bracelets">Bracelets</option>
<option value="Bangles">Bangles</option>
<option value="Earrings">Earrings</option>
<option value="Pendants">Pendants</option>
<option value="Mangalsutras">Mangalsutras</option>
<option value="Nose Pins">Nose Pins</option>
<option value="Anklets">Anklets</option>
<option value="Bridal Collection">Bridal Collection</option>
<option value="Men">Men</option>
<option value="Kids">Kids</option>
<option value="Silver">Silver</option>
<option value="Coins">Coins</option>
</select>


    <textarea
      placeholder="Description"
      name="description"
      value={product.description}
      onChange={handleChange}
      className="w-full p-4 mb-5 rounded-lg bg-slate-800"
    />
    <label>
  <input
    type="checkbox"
    checked={product.featured}
    onChange={(e) =>
      setProduct({
        ...product,
        featured: e.target.checked,
      })
    }
  />
  Featured
</label>

<label>
  <input
    type="checkbox"
    checked={product.newArrival}
    onChange={(e) =>
      setProduct({
        ...product,
        newArrival: e.target.checked,
      })
    }
  />
  New Arrival
</label>

<label>
  <input
    type="checkbox"
    checked={product.bestseller}
    onChange={(e) =>
      setProduct({
        ...product,
        bestseller: e.target.checked,
      })
    }
  />
  Bestseller
</label>

    <button
      onClick={addProduct}
      className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold"
    >
      Add Product
    </button>

  </div>  <input
  type="text"
  placeholder="🔍 Search Product..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 mb-6"
/>
  
  <h2 className="text-4xl font-bold mt-12 mb-6">
    Product List
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    {products
           .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
                  )
                    .map((item) => (

      <div
        key={item._id}
        className="bg-slate-900 p-5 rounded-2xl"
      >

       <img
  src={`https://jewelai-backend-1.onrender.com/uploads/products/${item.image}`}
  alt={item.name}
  className="w-full h-52 object-cover rounded-xl"
/>

        <h3 className="text-2xl font-bold mt-4">
          {item.name}
        </h3>

        <p className="mt-2">
          ₹{item.price}
        </p>

        <p className="mt-2 text-gray-400">
          {item.category}
        </p>

        <button
          onClick={() =>
            deleteProduct(item._id)
          }
          className="bg-red-500 px-5 py-2 rounded-lg mt-4"
        >
          Delete
        </button>

      </div>

    ))}

  </div>

</div>


);
}

export default Admin;
