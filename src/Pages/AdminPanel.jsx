import React, { useState, useEffect } from "react";
import AdminProperties from "../Components/PropertyAdmin";
import { getProperties } from "../utils/PropertyStorage";
import Footer from "../Components/Footer";

const AdminPanel = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(getProperties()); // Ambil data properti dari localStorage saat komponen dimuat
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Panel Admin</h2>
      <a href="/add-property" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Tambah Properti</a>
      <AdminProperties properties={properties} />
    </div>
    <Footer />
    </div>
  );
};

export default AdminPanel;
