import React from 'react';
import { MapPin, Phone, Star} from 'lucide-react';
import { motion } from 'framer-motion';
import FeaturedProperties from '../Components/FeaturedProperty';
import Footer from '../Components/Footer';
import PropertyList from '../Components/PropertyList';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Jual Rumah Di Medan</title>
        <meta name="description" content="Medan Land Property Adalah Tempat Jualan Rumah Terbaik Di Medan" />
        <link rel="canonical" href="https://medanlandproperty.vercel.app/" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="Jual Rumah, Rumah di Medan, Rumah di Medan Johor, Rumah Sunggal, Medan Land Property, Agen Rumah Medan, Agen Tanah Medan" />
        <meta name="author" content="Hylmi Muhammad Fiary Mahdi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="https://medanlandproperty.vercel.app/favicon.ico" />
      </Helmet>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
      <div className="relative h-[800px]">
        <div className="absolute inset-0 bg-black/50">
          <img 
            src="https://shila.co.id/wp-content/uploads/2024/05/Apa-itu-Rumah-Luxury-Tudor-scaled.webp" 
            alt="Hero Background" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Temukan Properti Impian Anda Di Kota Medan Dan Sekitarnya
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Cari Properti Yang Anda Inginkan Di Kota Medan Dan Sekitarnya
          </p>
          
          {/* Search Bar */}
          <PropertyList />
          </div>          
      </div>
      </motion.div>

    {/* Company Introduction Section */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Selamat Datang di Medan Land Property
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Medan Land Property adalah agensi properti terkemuka yang berdiri sejak tahun 2010 di Medan. 
              Dengan pengalaman lebih dari 13 tahun, kami telah dipercaya oleh ribuan keluarga dalam 
              menemukan hunian ideal mereka.
            </p>
          </div>
      </div>
    </div>
        </motion.div>
      {/* Featured Properties */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
            <FeaturedProperties />
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <Star className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Properti Berkualitas</h3>
              <p className="text-gray-600">
                Kami hanya menyediakan properti terbaik yang telah melalui seleksi ketat
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <MapPin className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Lokasi Strategis</h3>
              <p className="text-gray-600">
                Properti kami berada di lokasi-lokasi strategis dengan akses mudah
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <Phone className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Layanan 24/7</h3>
              <p className="text-gray-600">
                Tim kami siap membantu Anda kapanpun Anda membutuhkan
              </p>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
      <Footer />
    </div>
    </>
  );
};

export default HomePage;