import { useState } from "react";
import { MapPin, Home, Search } from "lucide-react";
import { motion } from "framer-motion";

const API_URL = process.env.REACT_APP_API_URL || "https://endpoint-niaga-production.up.railway.app" /*&& "http://localhost:5000"*/;

const PropertyList = () => {
  const [properties, setProperties] = useState([]); // Data hasil pencarian
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [searched, setSearched] = useState(false); // Status apakah sudah mencari

  const handleSearch = () => {
    fetch(`${API_URL}/properties`)
      .then((res) => res.json())
      .then((data) => {
        let filtered = data;

        if (location.trim() !== "") {
          filtered = filtered.filter((prop) =>
            prop.location.toLowerCase().includes(location.toLowerCase())
          );
        }

        if (priceRange.trim() !== "") {
          const [minPrice, maxPrice] = priceRange.split("-").map((p) => parseInt(p.trim().replace(/\./g, ""), 10));
          if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            filtered = filtered.filter((prop) => {
              const price = parseInt(prop.price.replace(/\./g, ""), 10);
              return price >= minPrice && price <= maxPrice;
            });
          }
        }

        setProperties(filtered);
        console.log("Filtered Properties:", filtered);
        setSearched(true); // Menandai bahwa pencarian sudah dilakukan
      })
      .catch((err) => console.error("Error fetching properties:", err));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
      {/* Search Form */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Lokasi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Range Harga (contoh: 50000000-100000000)"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded border focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <Home className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors"
          onClick={handleSearch}
        >
          <Search className="inline-block mr-2" size={20} />
          Cari
        </button>
      </div>

      {/* List Properti */}
      <div className="mt-6">
        {!searched ? (
          <p className="text-gray-500 text-center mt-4">Silakan cari properti</p>
        ) : properties.length > 0 ? (
          properties.map((property) => (
            <motion.div
              key={property.id}
              className="p-4 border rounded mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-gray-900 font-semibold">{formatPrice(property.price)}</p>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-gray-500 text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Properti tidak ditemukan
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
