import { useState } from "react";
import { MapPin, Search, Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const API_URL = process.env.REACT_APP_API_URL || "https://endpoint-niaga-production.up.railway.app";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/properties`);
      const data = await response.json();
      
      let filtered = data;
      if (location.trim() !== "") {
        filtered = filtered.filter((prop) =>
          prop.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      setProperties(filtered);
      setSearched(true);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <><Helmet>
        <title>Jual Rumah di Medan | Properti Dijual Terbaru Medan Land Property</title>
        <meta name="keywords" content="Jual Rumah, Rumah di Medan, Rumah di Medan Johor, Rumah Sunggal, Medan Land Property, Agen Rumah Medan, Agen Tanah Medan" />
        <meta name="description" content="Cari rumah dijual di Medan dan sekitarnya dengan harga terbaik. Temukan properti impian Anda sekarang." />
        <meta property="og:title" content="Jual Rumah di Medan | Properti Terbaru" />
        <meta property="og:description" content="Temukan properti terbaik di Medan. Jual beli rumah, apartemen, dan tanah dengan harga terjangkau." />
        <meta property="og:url" content="https://medanlandproperty.vercel.app/" />
      </Helmet>

    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
    {/* Search Header */}
    <div className="p-4 bg-white border-b">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Cari Properti</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Masukkan lokasi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>
        <button
          className="bg-blue-600 text-white w-full sm:w-auto px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          onClick={handleSearch}
          disabled={loading}
        >
          <Search size={20} />
          {loading ? "Mencari..." : "Cari"}
        </button>
      </div>
    </div>

    {/* Property List with Improved Scroll */}
    <div className="max-h-[75vh] overflow-auto px-2 pb-[env(safe-area-inset-bottom)]">
      {!searched ? (
        <div className="flex flex-col items-center justify-center p-6">
          <Building2 size={48} className="text-gray-300 mb-3" />
          <p className="text-gray-500 text-center text-sm">
            Masukkan lokasi untuk mencari properti
          </p>
        </div>
      ) : loading ? (
        <div className="p-6">
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 h-28 rounded-lg"></div>
            ))}
          </div>
        </div>
      ) : properties.length > 0 ? (
        <div className="p-3">
          {properties.map((property) => (
            <motion.div
              key={property.id}
              className="p-3 border border-gray-200 rounded-lg mb-3 hover:shadow-md transition-all cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/property-detail/${property.id}`)}
            >
              <div className="flex flex-wrap sm:flex-nowrap gap-3">
                {/* Property Image */}
                <div className="w-full sm:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Property Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{property.specs}</span>
                    <span className="text-sm font-bold text-gray-900">{formatPrice(property.price)}</span>
                    <button 
                      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                      onClick={() => navigate(`/property-detail/${property.id}`)}
                    >
                      Lihat Detail
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Building2 size={48} className="text-gray-300 mb-3" />
          <p className="text-gray-500 text-center text-sm">
            Tidak ada properti ditemukan di lokasi ini
          </p>
        </motion.div>
      )}
    </div>
  </div>
  </>
  );
};

export default PropertyList;