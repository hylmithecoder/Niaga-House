import React, { useState, useEffect } from 'react';

const EditMoreDescription = ({ existingDescriptions = [], onSave }) => {
    const [descriptions, setDescriptions] = useState(existingDescriptions || []);
    const [items, setItems] = useState(() => {
        return Array.isArray(existingDescriptions) ? existingDescriptions : [];
      });

    useEffect(() => {
        // Pastikan existingDescriptions adalah array
        const validDescriptions = Array.isArray(existingDescriptions) 
            ? existingDescriptions 
            : [];
        
        // Set initial state
        setItems(validDescriptions);
    }, [existingDescriptions]);

    useEffect(() => {
        // console.log('existingDescriptions:', existingDescriptions);
        // console.log('items before:', items);
        const validDescriptions = Array.isArray(existingDescriptions) 
            ? existingDescriptions 
            : [];
        // console.log('validDescriptions:', validDescriptions);
        setItems(validDescriptions);
    }, [existingDescriptions]);
    
    useEffect(() => {
        // console.log('items after update:', items);
    }, [items]);

  const addNewItem = () => {
    const newItem = { description: '', image: '' };
    const newItems = [...items, newItem];
    setItems(newItems);
    onSave(newItems);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onSave(newItems);
  };

  const updateItem = (index, field, value) => {
    if (!Array.isArray(items)) return;

    const newItems = [...items];
    if (!newItems[index]) {
      newItems[index] = { description: '', image: '' };
    }
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    onSave(newItems);
  };
  

  const handleFileChange = (e, index) => {
    if (e.target.files?.[0]) {
      updateItem(index, 'image', e.target.files[0]);
    }
  };
  
  // Di EditMoreDescription.jsx
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`New image selected for index ${index}:`, file);
      const newDescriptions = [...descriptions];
      newDescriptions[index] = {
        ...newDescriptions[index],
        image: file
      };
      setDescriptions(newDescriptions);
      onSave(newDescriptions); // Pastikan ini dipanggil
    }
  };

  return (
    <div className="space-y-4 border-t pt-4 mt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Tambah Deskripsi</h3>
        <h5 className="text-lg font-medium text-yellow-500">Kalau Mau Tambah Gambar Semua nya harus Di Upload Ulang Lagi</h5>
        <button
          type="button"
          onClick={addNewItem}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add New
        </button>
      </div>

      {Array.isArray(items) && items.map((item, index) => (
            <div key={index} className="p-4 border rounded-md space-y-3">
          <div className="flex justify-between">
            <h4 className="font-medium">Item {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <div className="space-y-2">
            <textarea
              value={item.description || ''}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter description"
              rows="3"
            />
          </div>

          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index)}
              className="w-full"
            />
            {item.image && typeof item.image === 'string' && (
              <img
                src={item.image}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditMoreDescription;