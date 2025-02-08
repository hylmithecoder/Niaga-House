import React, { useState, useEffect } from "react";
import CardAdmin from "./CardAdmin";

const API_URL = process.env.REACT_APP_API_URL || "https://endpoint-niaga-production.up.railway.app" /*&& "http://localhost:5000"*/;

const PropertyAdmin = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const response = await fetch(`${API_URL}/properties`);
    const data = await response.json();
    setProperties(data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleEditProperty = async (id, formData) => {
    try {
      const response = await fetch(`${API_URL}/properties/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedProperty = await response.json();
        setProperties((prevProperties) =>
          prevProperties.map((prop) => (prop.id === id ? updatedProperty : prop))
        );
      } else {
        console.error("Failed to update property");
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      const response = await fetch(`${API_URL}/properties/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProperties((prevProperties) =>
          prevProperties.filter((prop) => prop.id !== id)
        );
      } else {
        console.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <CardAdmin
            key={property.id}
            property={property}
            onEdit={handleEditProperty}
            onDelete={handleDeleteProperty}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyAdmin;
