import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Phone, ArrowLeft, Home, Ruler, BedDouble, Bath, Info } from "lucide-react";
import { motion } from "framer-motion";

const API_URL = process.env.REACT_APP_API_URL || "https://endpoint-niaga-production.up.railway.app";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(0);

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

  // Loading state with skeleton animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg mb-8" />
            <div className="h-8 bg-gray-300 w-3/4 rounded mb-4" />
            <div className="h-4 bg-gray-300 w-1/2 rounded mb-8" />
            <div className="space-y-4">
              <div className="h-20 bg-gray-300 rounded" />
              <div className="h-20 bg-gray-300 rounded" />
              <div className="h-20 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state with improved UI
  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
            <Info className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Properti Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Properti yang Anda cari tidak tersedia."}
          </p>
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold w-full"
            onClick={() => navigate("/")}
          >
            Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Kembali</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="relative h-[500px]">
            <motion.img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Property Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold text-white mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center text-white/90 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">
                    {formatPrice(property.price)}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Property Details */}
          <div className="p-8">
            {/* Key Features */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Home className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm text-gray-600">Tipe Properti</span>
                <p className="font-semibold text-gray-900">Rumah</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Ruler className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm text-gray-600">Luas</span>
                <p className="font-semibold text-gray-900">{property.specs}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <BedDouble className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm text-gray-600">Kamar Tidur</span>
                <p className="font-semibold text-gray-900">3</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Bath className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm text-gray-600">Kamar Mandi</span>
                <p className="font-semibold text-gray-900">2</p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi</h2>
              <p className="text-gray-600 leading-relaxed">
                {property.Description}
              </p>
            </motion.div>

            {/* Contact Button */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => window.open(`https://wa.me/+62${property.no_hp}`, "_blank")}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-5 h-5" />
                Hubungi via WhatsApp
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetail;