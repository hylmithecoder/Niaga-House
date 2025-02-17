import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CertificateTypeSelect, PropertyTypeSelect, PropertyConditionSelect, FurnitureConditionSelect } from "../Components/IconSelect";
import AutoResizeTextarea from "../Components/AutoResizeTextArea";
import AddMoreImages from "../Components/AddMoreImages";

const API_URL = process.env.REACT_APP_API_URL || "https://endpoint-niaga-production.up.railway.app";

const AddProperty = () => { 
  // console.log(API_URL);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [newProperty, setNewProperty] = useState({
    type: "",
    title: "",
    surface_area: "",
    surface_area_unit: "m²",
    building_area: "",
    building_area_unit: "m²",
    bed_count: "",
    bath_count: "",
    floor: "",
    certificate_type: "",
    property_condition: "",
    furniture_condition: "",
    location: "",
    description: "",
    no_hp: "",
    price: "",
    specs: "",
    image: null,
    additionalDescriptions: [] // Perbaikan: Array kosong untuk menyimpan deskripsi & gambar tambahan
  });
  
  const [error, setError] = useState("");
  
  useEffect(() => {
    // console.log("State additionalDescriptions:", newProperty.additionalDescriptions);
  }, [newProperty.additionalDescriptions]);
  
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
  
    // Validasi input utama
    if (!newProperty.type || !newProperty.title || !newProperty.surface_area || !newProperty.location || !newProperty.description || !newProperty.no_hp || !newProperty.price) {
      setError("Semua field harus diisi kecuali gambar.");
      return;
    }
  
    const formData = new FormData();
    formData.append("type", newProperty.type);
    formData.append("title", newProperty.title);
    formData.append("surface_area", newProperty.surface_area);
    formData.append("surface_area_unit", newProperty.surface_area_unit);
    formData.append("building_area", newProperty.building_area);
    formData.append("building_area_unit", newProperty.building_area_unit);
    formData.append("bed_count", newProperty.bed_count);
    formData.append("bath_count", newProperty.bath_count);
    formData.append("floor", newProperty.floor);
    formData.append("certificate_type", newProperty.certificate_type);
    formData.append("property_condition", newProperty.property_condition);
    formData.append("furniture_condition", newProperty.furniture_condition);
    formData.append("location", newProperty.location);
    formData.append("description", newProperty.description);
    formData.append("price", newProperty.price);
    formData.append("no_hp", newProperty.no_hp);
    formData.append("specs", newProperty.specs);

    // Pastikan hanya mengirim file jika image adalah File
    if (newProperty.image instanceof File) {
      formData.append("image", newProperty.image);
    }

    // Kirim deskripsi tambahan dalam JSON
    const descriptionsWithoutImages = newProperty.additionalDescriptions.map(({ description }) => ({ description }));
    formData.append("additionalDescriptions", JSON.stringify(descriptionsWithoutImages));

    // Tambahkan semua gambar tambahan ke FormData
    newProperty.additionalDescriptions.forEach((desc) => {
      if (desc.image instanceof File) {
        formData.append("additionalImages", desc.image);
      }
    });
 
  
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

  const handleAddMoreDescription = (newItem) => {
    // console.log("Diterima di handleAddMoreDescription:", newItem);
  
    setNewProperty((prev) => ({
      ...prev,
      additionalDescriptions: [...prev.additionalDescriptions, newItem],
    }));
  };
  
    
  const handleRemoveDescription = (index) => {
    setNewProperty((prev) => ({
      ...prev,
      additionalDescriptions: prev.additionalDescriptions.filter((_, i) => i !== index),
    }));
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

        <div className="mb-4">
          <span className="text-gray-700 block mb-2">Tipe Properti</span>
          <PropertyTypeSelect
            selectedType={newProperty.type}
            onChange={handleChange}
          />
        </div>

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
        <span className="text-gray-700">Luas Tanah:</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="surface_area"
            value={newProperty.surface_area}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <select
            name="surface_area_unit"
            value={newProperty.surface_area_unit}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md"
          >
            <option value="m²">m²</option>
            <option value="km²">km²</option>
          </select>
        </div>
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Luas Bangunan:</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="building_area"
            value={newProperty.building_area}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <select
            name="building_area_unit"
            value={newProperty.building_area_unit}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md"
          >
            <option value="m²">m²</option>
            <option value="km²">km²</option>
          </select>
        </div>
      </label>


        <label className="block mb-2">          
          <span className="text-gray-700">Kamar Tidur:</span>
          <input
            type="number"
            name="bed_count"
            value={newProperty.bed_count}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">          
          <span className="text-gray-700">Kamar Mandi:</span>
          <input
            type="number"
            name="bath_count"
            value={newProperty.bath_count}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">          
          <span className="text-gray-700">Jumlah Lantai:</span>
          <input
            type="number"
            name="floor"
            value={newProperty.floor}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">          
          <span className="text-gray-700">Sertifikat:</span>
          <CertificateTypeSelect
            selectedType={newProperty.certificate_type}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-2">          
          <span className="text-gray-700">Kondisi Property:</span>
          <PropertyConditionSelect
            selectedCondition={newProperty.property_condition}
            onChange={handleChange}
          />
        </label>
        
        <label className="block mb-2">          
          <span className="text-gray-700">Kondisi Perabotan:</span>
          <FurnitureConditionSelect
            selectedCondition={newProperty.furniture_condition}
            onChange={handleChange}
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
          <AutoResizeTextarea value={newProperty.description} onChange={handleChange}/>
          {/* <textarea 
            name="description" 
            value={newProperty.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          /> */}
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Harga:</span>
          <input
            type="number"
            name="price"
            value={newProperty.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Thumbnail:</span>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label>

        {/* <label className="block mb-2">
          <span className="text-gray-700">Spesifikasi:</span>
          <input
            type="text"
            name="specs"
            value={newProperty.specs}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </label> */}

        <AddMoreImages
          additionalDescriptions={newProperty.additionalDescriptions}
          onAdd={handleAddMoreDescription}
          onRemove={handleRemoveDescription}
        />

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
