import React from 'react';
import { MapPin, Phone, Star, Award, Users, Building} from 'lucide-react';
import { motion } from 'framer-motion';
import FeaturedProperties from '../Components/FeaturedProperty';
import Footer from '../Components/Footer';
import PropertyList from '../Components/PropertyList';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
      <div className="relative h-[600px]">
        <div className="absolute inset-0 bg-black/50">
          <img 
            src="https://shila.co.id/wp-content/uploads/2024/05/Apa-itu-Rumah-Luxury-Tudor-scaled.webp" 
            alt="Hero Background" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Temukan Rumah Impian Anda
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Kami menyediakan pilihan properti terbaik untuk keluarga Anda
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
              Selamat Datang di Niaga Rumah
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Niaga Rumah adalah perusahaan properti terkemuka yang berdiri sejak tahun 2010 di Jakarta. 
              Dengan pengalaman lebih dari 13 tahun, kami telah dipercaya oleh ribuan keluarga dalam 
              menemukan hunian ideal mereka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Terpercaya</h3>
              <p className="text-gray-600">
                13 tahun pengalaman dalam industri properti dengan lebih dari 10,000 transaksi sukses
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Tim Profesional</h3>
              <p className="text-gray-600">
                Didukung oleh lebih dari 200 agen properti berpengalaman dan tersertifikasi
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Portofolio Luas</h3>
              <p className="text-gray-600">
                Menawarkan beragam pilihan properti dari rumah, apartemen, hingga ruko di lokasi strategis
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-3xl font-bold text-blue-600 mb-2">10,000+</h4>
                <p className="text-gray-600">Transaksi Sukses</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-3xl font-bold text-blue-600 mb-2">200+</h4>
                <p className="text-gray-600">Agen Properti</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-3xl font-bold text-blue-600 mb-2">15+</h4>
                <p className="text-gray-600">Kota</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-3xl font-bold text-blue-600 mb-2">98%</h4>
                <p className="text-gray-600">Klien Puas</p>
              </div>
            </div>
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
  );
};

export default HomePage;