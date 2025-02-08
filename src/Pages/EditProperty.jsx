import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const savedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    const selectedProperty = savedProperties.find((prop) => prop.id === parseInt(id));

    if (selectedProperty) {
      setProperty(selectedProperty);
    } else {
      navigate("/admin"); // Redirect ke admin jika ID tidak ditemukan
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const savedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    const updatedProperties = savedProperties.map((prop) =>
      prop.id === parseInt(id) ? property : prop
    );

    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    navigate("/admin"); // Redirect kembali ke Admin Panel
  };

  if (!property) return <p className="text-center mt-10">Memuat data...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Properti</h2>

        <label className="block mb-2">
          <span className="text-gray-700">Judul:</span>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Lokasi:</span>
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Harga:</span>
          <input
            type="text"
            name="price"
            value={property.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Spesifikasi:</span>
          <input
            type="text"
            name="specs"
            value={property.specs}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Kembali
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
