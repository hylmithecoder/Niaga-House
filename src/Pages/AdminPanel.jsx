import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AdminProperties from "../Components/PropertyAdmin";
import Footer from "../Components/Footer";

const AdminPanel = () => {
  const { username: paramUsername } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const INACTIVE_TIMEOUT = 10 * 60 * 1000; // 10 minutes

  // Handle user activity
  const handleUserActivity = () => {
    localStorage.setItem("lastActivity", Date.now());
  };

  // Setup activity listeners
  useEffect(() => {
    // Add event listeners for user activity
    const events = ["mousedown", "keydown", "scroll", "mousemove", "touchstart"];
    
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  // Check for inactivity
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const lastActivity = localStorage.getItem("lastActivity");
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity >= INACTIVE_TIMEOUT) {
        // handleLogout(true);
      }
    }, 1000); // Check every second

    return () => clearInterval(checkInactivity);
  }, [navigate]);

  // Enhanced logout function
  const handleLogout = (force = false) => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.clear();
    console.log("Logged out successfully");
    alert('username tidak dapat ditemukan');
    navigate("/login");
  };

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
        if (user.username !== paramUsername) {
          throw new Error("Username mismatch");
        }

        const response = await fetch(`https://endpoint-niaga-production.up.railway.app/users/${user.username}`);
        // console.log(response);
        if (!response.ok) throw new Error("Authentication failed");

        await response.json();
        setIsLoggedIn(true);
      } catch (err) {
        // handleLogout(true);
      }
    };
    checkAuth();
  }, [navigate, paramUsername]);

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      if (!isLoggedIn) return;
      try {
        const response = await fetch("https://endpoint-niaga-production.up.railway.app/properties/");
        // console.log(response);
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

  const username = localStorage.getItem("username");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Panel Admin</h2>
          <button
            onClick={() => navigate(`/admin/${username}/add-property`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            + Tambah Properti
          </button>
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
