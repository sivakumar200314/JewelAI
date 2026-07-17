import { useState } from "react";
import axios from "axios";

function AIImageSearch() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

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

      setResults(res.data.products);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">

      <h2>AI Image Search</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      <br />
      <br />

      {preview && (
        <img
          src={preview}
          width="250"
          alt="Preview"
        />
      )}

      <br />
      <br />

      <button onClick={uploadImage}>
        Search Similar Jewellery
      </button>

      {loading && <p>Searching...</p>}

      <div className="row mt-4">

        {results.map((item) => (

          <div
            className="col-md-3"
            key={item._id}
          >

            <img
  src={`https://jewelai-backend-1.onrender.com/uploads/products/${item.image}`}
  className="img-fluid"
  alt={item.name}
/>
            <h5>{item.name}</h5>

            <p>₹{item.price}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AIImageSearch;