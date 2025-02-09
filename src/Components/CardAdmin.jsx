import React, { useState } from "react";
import { MapPin, Trash2, Edit2 } from "lucide-react";
import { motion } from "framer-motion";

const CardAdmin = ({ property, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState({ ...property });
  const [newImageFile, setNewImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editedProperty.title);
    formData.append("location", editedProperty.location);
    formData.append("description", editedProperty.description);
    formData.append("no_hp", editedProperty.no_hp);
    formData.append("price", editedProperty.price);
    formData.append("specs", editedProperty.specs);
    if (newImageFile) {
      formData.append("image", newImageFile);
    }

    await onEdit(property.id, formData);
    setIsEditing(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 p-4">
        <motion.img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-md mb-4"
          whileHover={{ scale: 1.05 }}
        />

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="title"
              value={editedProperty.title}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Judul Properti"
            />
            <input
              type="text"
              name="location"
              value={editedProperty.location}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Lokasi"
            />
            <input
              type="text"
              name="no_hp"
              value={editedProperty.no_hp}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nomor HP"
            />
            <textarea
              name="description"
              value={editedProperty.description}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Deskripsi"
            />
            <input
              type="number"
              name="price"
              value={editedProperty.price}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Harga (Rp)"
            />
            <input
              type="text"
              name="specs"
              value={editedProperty.specs}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Spesifikasi"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
              Simpan
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditedProperty({ ...property });
                setNewImageFile(null);
              }}
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
            >
              Batal
            </button>
          </form>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2" />
              {property.location}
            </div>
            <p className="text-gray-600">{property.specs}</p>
            <p className="text-xl font-bold text-blue-600">{formatPrice(property.price)}</p>

            <div className="flex mt-4 space-x-2">
              <motion.button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-orange-600 text-white p-2 rounded flex items-center justify-center hover:bg-orange-700 transition"
                whileHover={{ scale: 1.05 }}
              >
                <Edit2 size={18} className="mr-2" /> Edit
              </motion.button>
              <motion.button
                onClick={() => onDelete(property.id)}
                className="flex-1 bg-red-600 text-white p-2 rounded flex items-center justify-center hover:bg-red-700 transition"
                whileHover={{ scale: 1.05 }}
              >
                <Trash2 size={18} className="mr-2" /> Hapus
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CardAdmin;
