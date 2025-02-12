import React, { useState, useEffect } from 'react';

const EditMoreDescription = ({ existingDescriptions, onSave }) => {
  const [descriptions, setDescriptions] = useState(existingDescriptions || []);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newDescriptions = [...descriptions];
      newDescriptions[index] = {
        ...newDescriptions[index],
        image: file,
        imagePreview: URL.createObjectURL(file) // Tambah preview untuk file baru
      };
      setDescriptions(newDescriptions);
      onSave(newDescriptions);
    }
  };

  const handleAddMore = () => {
    setDescriptions([...descriptions, { description: '', image: null }]);
  };

  const handleRemoveImage = (index) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = {
      ...newDescriptions[index],
      image: null,
      imagePreview: null
    };
    setDescriptions(newDescriptions);
    onSave(newDescriptions);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = {
      ...newDescriptions[index],
      description: value
    };
    setDescriptions(newDescriptions);
    onSave(newDescriptions);
  };

  const handleRemoveDescription = (index) => {
    const newDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(newDescriptions);
    onSave(newDescriptions);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Deskripsi Tambahan</h3>
      
      {descriptions.map((desc, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Deskripsi #{index + 1}</span>
            <button
              onClick={() => handleRemoveDescription(index)}
              className="text-red-500 hover:text-red-700"
            >
              Hapus
            </button>
          </div>

          <textarea
            value={desc.description || ''}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Tambahkan deskripsi..."
            rows="3"
          />

          <div className="space-y-2">
            {/* Preview gambar yang sudah ada atau baru diupload */}
            {(desc.image || desc.imagePreview) && (
              <div className="relative w-full max-w-md">
                <img
                  src={desc.imagePreview || desc.image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}

            {/* Input file untuk upload gambar */}
            <div className="flex items-center space-x-2">
              <input
                type="file"
                onChange={(e) => handleImageChange(index, e)}
                accept="image/*"
                className="hidden"
                id={`image-upload-${index}`}
              />
              <label
                htmlFor={`image-upload-${index}`}
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {desc.image ? 'Ganti Gambar' : 'Upload Gambar'}
              </label>
              {desc.image && (
                <span className="text-sm text-gray-500">
                  {desc.image instanceof File ? desc.image.name : 'Gambar tersimpan'}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddMore}
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
      >
        + Tambah Deskripsi
      </button>
    </div>
  );
};

export default EditMoreDescription;