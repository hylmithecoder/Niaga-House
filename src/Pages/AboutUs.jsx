import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Check, 
  Building2, 
  Trophy,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const AboutUs = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { icon: Building2, value: "500+", label: "Properti Terjual" },
    { icon: Users, value: "1000+", label: "Klien Puas" },
    { icon: Trophy, value: "15+", label: "Tahun Pengalaman" },
    { icon: MapPin, value: "50+", label: "Lokasi di Medan" },
  ];

  const values = [
    {
      title: "Kepercayaan",
      description: "Kami membangun hubungan jangka panjang berdasarkan kepercayaan dengan klien kami."
    },
    {
      title: "Profesionalisme",
      description: "Tim kami terdiri dari para profesional berpengalaman dalam industri properti."
    },
    {
      title: "Inovasi",
      description: "Kami selalu mengadopsi teknologi terbaru untuk memberikan layanan terbaik."
    },
    {
      title: "Integritas",
      description: "Kejujuran dan transparansi adalah fondasi dari setiap transaksi kami."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://placehold.co/1920x1080?text=Medan+Land+Property"
            alt="Medan City Skyline"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div 
            className="text-white max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Medan Land Property</h1>
            <p className="text-xl text-gray-300 mb-8">
              Mewujudkan impian hunian ideal Anda dengan layanan properti terpercaya di Kota Medan sejak 2008.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Hubungi Kami
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Medan Land Property adalah perusahaan properti terkemuka yang berdedikasi untuk memberikan 
              layanan properti terbaik di Kota Medan. Dengan pengalaman lebih dari 15 tahun, kami telah 
              membantu ribuan klien menemukan properti impian mereka. Komitmen kami terhadap kualitas, 
              profesionalisme, dan kepuasan klien telah menjadikan kami salah satu agen properti 
              terpercaya di Sumatera Utara.
            </p>
          </motion.div>

          {/* Company Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Check className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Hubungi Kami</h2>
            <p className="text-gray-400">Temukan properti impian Anda bersama kami</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MapPin className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Alamat</h3>
              <p className="text-gray-400">Jl. Pintu Air IV Gg. Ternak No. 1C<br />Medan, Sumatera Utara</p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Phone className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Telepon</h3>
              <p className="text-gray-400">+62 813 6222 9383</p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Mail className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-400">info@medanlandproperty.com</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;