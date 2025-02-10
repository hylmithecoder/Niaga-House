import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = process.env.REACT_APP_API_URL || "https://endpoint-niaga-production.up.railway.app";

const AddProperty = () => { 
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    description: "",
    no_hp: "",
    price: "",
    specs: "",
    image: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/login"); // Redirect jika tidak ada username di localStorage
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProperty({ ...newProperty, image: e.target.files[0] });
  };

  const handleSave = async () => {
    setError("");

    // Validasi input
    if (!newProperty.title || !newProperty.location || !newProperty.description || !newProperty.no_hp || !newProperty.price || !newProperty.specs) {
      setError("Semua field harus diisi kecuali gambar.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newProperty.title);
    formData.append("location", newProperty.location);
    formData.append("description", newProperty.description);
    formData.append("price", newProperty.price);
    formData.append("no_hp", newProperty.no_hp);
    formData.append("specs", newProperty.specs);
    formData.append("image", newProperty.image);

    const response = await fetch(`${API_URL}/properties`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      navigate(`/admin/${username}`);
    } else {
      console.error("Failed to save property");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Tambah Properti</h2>
        
        <p className="text-center text-gray-600 mb-4">Admin: <span className="font-semibold">{username}</span></p>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">
          <span className="text-gray-700">Judul:</span>
          <input
            type="text"
            name="title"
            value={newProperty.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Lokasi:</span>
          <input
            type="text"
            name="location"
            value={newProperty.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">No WhatsApp:</span>
          <input
            type="text"
            name="no_hp"
            value={newProperty.no_hp}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Deskripsi:</span>
          <textarea 
            name="description" 
            value={newProperty.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Harga:</span>
          <input
            type="text"
            name="price"
            value={newProperty.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Spesifikasi:</span>
          <input
            type="text"
            name="specs"
            value={newProperty.specs}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Gambar:</span>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <div className="flex justify-between mt-4">
          <motion.button
            onClick={() => navigate(`/admin/${username}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Kembali
          </motion.button>
          <motion.button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tambah Properti
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProperty;
