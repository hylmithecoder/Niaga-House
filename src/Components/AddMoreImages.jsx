import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const AddMoreImages = ({ additionalDescriptions, onAdd, onRemove }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleAdd = () => {
    if (selectedFiles.length === 0) return;

    // Membuat array of newItems, satu untuk setiap file
    selectedFiles.forEach(file => {
      const newItem = {
        description: "", // Kosong karena kita mengabaikan field ini
        image: file
      };
      onAdd(newItem);
    });

    // Reset state dan input
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // const checkImagesData = () => {
    // console.log("Selected Files:", selectedFiles);
    // console.log("Additional Descriptions:", additionalDescriptions);
    // console.log("Total images selected:", selectedFiles.length);
    // console.log("Total images in array:", additionalDescriptions.length);
    
    // Cek detail setiap file yang dipilih
    // selectedFiles.forEach((file, index) => {
    //   console.log(`Selected File ${index + 1}:`, {
    //     name: file.name,
    //     type: file.type,
    //     size: `${(file.size / 1024).toFixed(2)} KB`
    //   });
    // });

    // Cek detail setiap gambar di additionalDescriptions
  //   additionalDescriptions.forEach((item, index) => {
  //     console.log(`Stored Image ${index + 1}:`, {
  //       hasImage: !!item.image,
  //       description: item.description,
  //       imageName: item.image ? item.image.name : 'No image',
  //       imageType: item.image ? item.image.type : 'No type',
  //       imageSize: item.image ? `${(item.image.size / 1024).toFixed(2)} KB` : '0 KB'
  //     });
  //   });
  // };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Tambahkan Gambar</h3>

      {/* Input Gambar */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border rounded-md mb-2"
          accept="image/*"
          multiple
        />

        {/* Preview gambar yang baru dipilih */}
        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tombol Tambah dan Cek */}
      <div className="flex gap-2">
        <motion.button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tambah
        </motion.button>

        {/* <motion.button
          onClick={checkImagesData}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cek Data
        </motion.button> */}
      </div>

      {/* Daftar Gambar yang Sudah Ditambahkan */}
      {additionalDescriptions.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Gambar yang Ditambahkan:</h4>
          <div className="grid grid-cols-3 gap-4">
            {additionalDescriptions.map((item, index) => (
              <div key={index} className="relative group">
                {item.image && (
                  <img
                    src={URL.createObjectURL(item.image)}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <motion.button
                  onClick={() => onRemove(index)}
                  className="absolute top-2 right-2 bg-red-500 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMoreImages;