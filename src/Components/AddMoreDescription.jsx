import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const AddMoreDescription = ({ additionalDescriptions, onAdd, onRemove }) => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [fileKey, setFileKey] = useState(Date.now()); // Key unik untuk reset input file

    const handleAdd = () => {
    if (description.trim() === "" && !image) return;

    const newItem = { description, image };
    onAdd(newItem);

    setDescription("");
    setImage(null);
    setFileKey(Date.now()); // Ubah key untuk reset input file
    };    
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Tambahkan Deskripsi & Gambar</h3>
      
      {/* Input Deskripsi */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Tambahkan deskripsi tambahan..."
        className="w-full px-3 py-2 border rounded-md mb-2"
      />

      {/* Input Gambar */}
      <input
        key={fileKey} // Reset otomatis saat key berubah
        type="file"
        multiple
        onChange={handleImageChange}
        className="w-full px-3 py-2 border rounded-md mb-2"
    />


      {/* Tombol Tambah */}
      <motion.button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Tambah
      </motion.button>

      {/* Daftar Deskripsi Tambahan */}
      {additionalDescriptions.length > 0 && (
        <div className="mt-4">
            <h4 className="font-semibold mb-2">Deskripsi Tambahan:</h4>
            {additionalDescriptions.map((item, index) => (
            <div key={index} className="flex items-center justify-between border p-2 rounded-md mb-2">
                <div>
                <span className="text-gray-700">{item.description}</span>
                {item.image && (
                    <img 
                    src={URL.createObjectURL(item.image)} 
                    alt="Preview" 
                    className="w-16 h-16 object-cover rounded mt-2"
                    />
                )}
                </div>
                <motion.button 
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                <Trash2 size={20} />
                </motion.button>
            </div>
            ))}
        </div>
        )}
    </div>
  );
};

export default AddMoreDescription;
