import React, { useState } from "react";
import { MapPin, Trash2, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { CertificateTypeSelect, PropertyTypeSelect, PropertyConditionSelect, FurnitureConditionSelect } from "./IconSelect";
import EditMoreDescription from "./EditMoreDescription";

const CardAdmin = ({ property, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState(() => {
    return {
      ...property,
      additionalDescriptions: Array.isArray(property?.additionalDescriptions) 
        ? property.additionalDescriptions 
        : []
    };
  });
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
    formData.append("type", editedProperty.type);
    formData.append("title", editedProperty.title);
    formData.append("surface_area", editedProperty.surface_area);
    formData.append("surface_area_unit", editedProperty.surface_area_unit);
    formData.append("building_area", editedProperty.building_area);
    formData.append("building_area_unit", editedProperty.building_area_unit);
    formData.append("bed_count", editedProperty.bed_count);
    formData.append("bath_count", editedProperty.bath_count);
    formData.append("floor", editedProperty.floor);
    formData.append("certificate_type", editedProperty.certificate_type);
    formData.append("property_condition", editedProperty.property_condition);
    formData.append("furniture_condition", editedProperty.furniture_condition);
    formData.append("location", editedProperty.location);
    formData.append("description", editedProperty.description);
    formData.append("no_hp", editedProperty.no_hp);
    formData.append("price", editedProperty.price);
    formData.append("specs", editedProperty.specs);
    if (newImageFile) {
      formData.append("image", newImageFile);
    }

    try {
      // Pastikan additionalDescriptions ada dan berbentuk array
      const descriptions = editedProperty.additionalDescriptions || [];
      
      if (Array.isArray(descriptions) && descriptions.length > 0) {
        const processedDescriptions = descriptions.map((desc, index) => {
          // Validasi setiap item
          if (!desc) return { description: '', image: '' };
  
          // Handle jika ada file gambar baru
          if (desc.image instanceof File) {
            formData.append(`additionalImage_${index}`, desc.image);
            return {
              description: desc.description || '',
              image: ''
            };
          }
  
          // Handle jika gambar existing (URL) atau tidak ada gambar
          return {
            description: desc.description || '',
            image: desc.image || ''
          };
        });
  
        // Log untuk debugging
        console.log('Processed descriptions:', processedDescriptions);
        
        formData.append('additionalDescriptions', JSON.stringify(processedDescriptions));
      } else {
        // Jika tidak ada descriptions, kirim array kosong
        formData.append('additionalDescriptions', JSON.stringify([]));
      }
  
      // Log final FormData
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      await onEdit(property.id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error processing additionalDescriptions:', error);
      // Fallback: kirim array kosong jika terjadi error
      formData.append('additionalDescriptions', JSON.stringify([]));
      await onEdit(property.id, formData);
      setIsEditing(false);
    }

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
            <div className="mb-4">
                <span className="text-gray-700 block mb-2">Tipe Properti</span>
                <PropertyTypeSelect
                selectedType={editedProperty.type}
                onChange={handleChange}
                />
            </div>
            <span className="text-gray-700">Judul:</span>
            <input
              type="text"
              name="title"
              value={editedProperty.title}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Judul Properti"
            />
            <span className="text-gray-700">Luas Tanah:</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="surface_area"
                value={editedProperty.surface_area}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <select
                name="surface_area_unit"
                value={editedProperty.surface_area_unit}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
              >
                <option value="m²">m²</option>
                <option value="km²">km²</option>
              </select>
              </div>
            <span className="text-gray-700">Luas Bangunan:</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="building_area"
                value={editedProperty.building_area}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <select
                name="building_area_unit"
                value={editedProperty.building_area_unit}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
              >
                <option value="m²">m²</option>
                <option value="km²">km²</option>
              </select>
            </div>

            <span className="text-gray-700">Kamar Tidur:</span>
            <input
              type="number"
              name="bed_count"
              value={editedProperty.bed_count}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />

            <span className="text-gray-700">Kamar Mandi:</span>
            <input
              type="number"
              name="bath_count"
              value={editedProperty.bath_count}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />

            <span className="text-gray-700">Jumlah Lantai:</span>
            <input
              type="number"
              name="floor"
              value={editedProperty.floor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />

            <span className="text-gray-700">Sertifikat:</span>
              <CertificateTypeSelect
              selectedType={editedProperty.certificate_type}
              onChange={handleChange}
            />

            <span className="text-gray-700">Kondisi Property:</span>
            <PropertyConditionSelect
              selectedCondition={editedProperty.property_condition}
              onChange={handleChange}
            />

            <span className="text-gray-700">Kondisi Perabotan:</span>
              <FurnitureConditionSelect
                selectedCondition={editedProperty.furniture_condition}
                onChange={handleChange}
            />
            <span className="text-gray-700">Lokasi:</span>
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
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
            <span className="text-gray-700">Thumbnail:</span>
            <input
              type="text"
              name="specs"
              value={editedProperty.specs}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Spesifikasi"
            />
            
            {/* Edit More Description */}
            <EditMoreDescription
              existingDescriptions={editedProperty.additionalDescriptions}
              onSave={(newDescriptions) => {
                setEditedProperty(prev => ({
                  ...prev,
                  additionalDescriptions: newDescriptions
                }));
              }}
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
