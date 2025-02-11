import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  ArrowLeft, 
  Home, 
  Ruler, 
  BedDouble, 
  Bath, 
  Info,
  FileText,
  Building,
  Sofa,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.REACT_APP_API_URL || "https://endpoint-niaga-production.up.railway.app";

const PropertyDetail = () => {
  // console.log(API_URL);
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Image gallery navigation
  const handleNextImage = () => {
    if (property?.additionalDescriptions?.length) {
      setSelectedImage((prev) => 
        prev === property.additionalDescriptions.length ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (property?.additionalDescriptions?.length) {
      setSelectedImage((prev) => 
        prev === 0 ? property.additionalDescriptions.length : prev - 1
      );
    }
  };

  // Get all images including main and additional
  const getAllImages = (property) => {
    if (!property) return [];
    return [
      property.image,
      ...(property.additionalDescriptions?.map(desc => desc.image) || [])
    ];
  };

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

  const allImages = getAllImages(property);

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
          {/* Image Gallery */}
          <div className="relative h-[500px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={allImages[selectedImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    selectedImage === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

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
                <div className="flex flex-wrap items-center text-white/90 gap-4">
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
                <p className="font-semibold text-gray-900">{property.type}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Ruler className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm text-gray-600">Luas Tanah</span>
                <p className="font-semibold text-gray-900">{property.surface_area} {property.surface_area_unit}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Ruler className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm text-gray-600">Luas Rumah</span>
                <p className="font-semibold text-gray-900">{property.building_area} {property.building_area_unit}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <BedDouble className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm text-gray-600">Kamar Tidur</span>
                <p className="font-semibold text-gray-900">{property.bed_count}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Bath className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm text-gray-600">Kamar Mandi</span>
                <p className="font-semibold text-gray-900">{property.bath_count}</p>
              </div>
            </motion.div>

            {/* Additional Features */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-500" />
                <div>
                  <span className="text-sm text-gray-600">Sertifikat</span>
                  <p className="font-semibold text-gray-900">{property.certificate_type}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                <Building className="w-6 h-6 text-blue-500" />
                <div>
                  <span className="text-sm text-gray-600">Kondisi</span>
                  <p className="font-semibold text-gray-900">{property.property_condition}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                <Sofa className="w-6 h-6 text-blue-500" />
                <div>
                  <span className="text-sm text-gray-600">Perabotan</span>
                  <p className="font-semibold text-gray-900">{property.furniture_condition}</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi</h2>
            <div className="relative">
              {/* Looping Additional Description */}
              {property.additionalDescriptions && property.additionalDescriptions.map((item, index) => (
                <div key={index} className={`mb-4 ${!showFullDescription && index > 3 ? 'hidden' : ''}`}>
                  {/* Gambar (jika ada) */}
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={`Deskripsi ${index + 1}`} 
                      className="w-full h-auto rounded-lg mb-2"
                    />
                  )}

                  {/* Teks Deskripsi */}
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}

              {/* Tombol Lihat Selengkapnya */}
              {property.additionalDescriptions?.length > 4 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-500 hover:text-blue-600 mt-2 font-medium"
                >
                  {showFullDescription ? 'Lihat lebih sedikit' : 'Lihat selengkapnya'}
                </button>
              )}
            </div>
          </motion.div>


            {/* Contact Button */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
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