import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../Components/Footer';
import {  useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-gray-800'>
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
              <motion.h2
                className="text-4xl font-bold text-red-500 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                404 Not Found
              </motion.h2>
              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Halaman Tidak Ditemukan
              </motion.p>
              <motion.button
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded text-white font-semibold"
                onClick={() => navigate("/")}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Kembali ke Beranda
              </motion.button>
            </div>
          </div>
      <Footer/>
    </div>
  );
};

export default NotFound;
