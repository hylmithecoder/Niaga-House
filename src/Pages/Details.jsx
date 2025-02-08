import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Phone, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${API_URL}/properties/${id}`);
        if (!response.ok) {
          throw new Error("Properti tidak ditemukan");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <motion.h2
            className="text-4xl font-bold text-red-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Properti Tidak Ditemukan
          </motion.h2>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {error || "Properti yang Anda cari tidak tersedia."}
          </motion.p>
          <motion.button
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded text-white font-semibold"
            onClick={() => navigate("/")}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Kembali ke Beranda
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gambar Header */}
        <div className="relative">
          <motion.img
            src={property.image}
            alt={property.title}
            className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h1 
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {property.title}
            </motion.h1>
            <motion.div 
              className="flex items-center text-gray-300 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <MapPin size={20} className="mr-2" />
              {property.location}
            </motion.div>
          </div>
        </div>

        {/* Detail Properti */}
        <div className="p-8">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Detail Properti
          </motion.h2>

          <motion.div 
            className="mt-6 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="text-gray-700 text-lg font-semibold">Deskripsi</span>
              <span className="text-gray-900 font-medium">{property.Description}</span>
            </div>

            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="text-gray-700 text-lg font-semibold">Spesifikasi</span>
              <span className="text-gray-900 font-medium">{property.specs}</span>
            </div>

            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="text-gray-700 text-lg font-semibold">Harga</span>
              <span className="text-xl font-bold text-blue-600">{property.price}</span>
            </div>
          </motion.div>

          {/* Tombol Aksi */}
          <div className="mt-8 flex gap-4">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
              onClick={() => window.open(`https://wa.me/+62${property.no_hp}`, "_blank")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Phone size={18} />
              Hubungi Agen
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded transition"
              onClick={() => navigate(-1)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <ArrowLeft size={18} />
              Kembali
            </motion.button>
          </div>
        </div>
      </motion.div>      
      </div>
    <Footer/>
    </div>
  );
};

export default PropertyDetail;
