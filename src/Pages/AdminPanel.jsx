import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminProperties from "../Components/PropertyAdmin";
import Footer from "../Components/Footer";

const AdminPanel = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const storedUser = localStorage.getItem("user");
      
      if (!isAuthenticated || !storedUser) {
        setError("Please login to access admin panel");
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const user = JSON.parse(storedUser);
        const response = await fetch(
          `https://endpoint-niaga-production.up.railway.app/users/${user.username}`
        );
        
        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        await response.json();
        setIsLoggedIn(true);
      } catch (err) {
        setError("Authentication failed. Please login again.");
        localStorage.clear();
        setLoading(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch properties data
  useEffect(() => {
    const fetchProperties = async () => {
      if (!isLoggedIn) return;

      try {
        const response = await fetch(
          "https://endpoint-niaga-production.up.railway.app/properties"
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [isLoggedIn]);

  if (!isLoggedIn && error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-500">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Panel Admin</h2>
          <a
            href="/add-property"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            + Tambah Properti
          </a>
        </div>
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && <AdminProperties properties={properties} />}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;