import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminProperties from "../Components/PropertyAdmin";
import Footer from "../Components/Footer";

const AdminPanel = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();
  const location = useLocation();
  const INACTIVE_TIMEOUT = 10 * 60 * 1000; // 10 minutes

  // Enhanced logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    console.log("Logged out successfully");
    navigate("/login");
  };

  // Handle page visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleLogout();
      }
    };

    // Handle page unload
    const handleBeforeUnload = () => {
      handleLogout();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Activity detection
  useEffect(() => {
    const events = ["mousedown", "keydown", "scroll", "mousemove", "touchstart"];
    const updateActivity = () => setLastActivity(Date.now());

    events.forEach(event => window.addEventListener(event, updateActivity));
    
    return () => {
      events.forEach(event => window.removeEventListener(event, updateActivity));
    };
  }, []);

  // Inactivity check
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivity >= INACTIVE_TIMEOUT) {
        handleLogout();
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [lastActivity]);

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const storedUser = localStorage.getItem("user");

      if (!isAuthenticated || !storedUser) {
        setError("Please login to access admin panel");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const user = JSON.parse(storedUser);
        const response = await fetch(`https://endpoint-niaga-production.up.railway.app/users/${user.username}`);
        if (!response.ok) throw new Error("Authentication failed");

        await response.json();
        setIsLoggedIn(true);
      } catch (err) {
        handleLogout();
      }
    };
    checkAuth();
  }, [navigate]);

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      if (!isLoggedIn) return;
      try {
        const response = await fetch("https://endpoint-niaga-production.up.railway.app/properties");
        if (!response.ok) throw new Error("Failed to fetch properties");

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