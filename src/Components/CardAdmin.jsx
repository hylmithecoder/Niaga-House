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

    // Siapkan FormData untuk mengirim data dan gambar
    const formData = new FormData();
    formData.append("title", editedProperty.title);
    formData.append("location", editedProperty.location);
    formData.append("Description", editedProperty.description);    
    formData.append("no_hp", editedProperty.no_hp);
    formData.append("price", editedProperty.price);
    formData.append("specs", editedProperty.specs);
    if (newImageFile) {
      formData.append("image", newImageFile);
    }

    // Panggil fungsi onEdit dengan FormData
    await onEdit(property.id, formData);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-4">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover mb-4"
      />

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="title"
            value={editedProperty.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            value={editedProperty.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input 
            type="text" 
            name="no_hp"
            value={editedProperty.no_hp}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            />
          <textarea 
            name="description" 
            // value={editedProperty.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {editedProperty.description}
          </textarea>
          <input
            type="text"
            name="price"
            value={editedProperty.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="specs"
            value={editedProperty.specs}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
            Simpan
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditedProperty({ ...property });
              setNewImageFile(null);
            }}
            className="bg-gray-500 text-white p-2 rounded w-full"
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
          <p className="text-xl font-bold text-blue-600">Rp{property.price}</p>
          
          <div className="flex mt-2 space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-orange-600 text-white p-2 rounded flex items-center justify-center"
            >
              <Edit2 size={18} className="mr-2" /> Edit
            </button>
            <button
              onClick={() => onDelete(property.id)}
              className="flex-1 bg-red-600 text-white p-2 rounded flex items-center justify-center"
            >
              <Trash2 size={18} className="mr-2" /> Hapus
            </button>
          </div>
        </>
      )}
    </div>
    </motion.div>
  );
};

export default CardAdmin;
