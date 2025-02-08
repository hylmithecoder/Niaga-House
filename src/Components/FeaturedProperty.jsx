import React, { useState, useEffect } from "react";
import Card from "./Card";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/properties`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Properti Unggulan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <Card key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
