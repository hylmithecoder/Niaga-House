import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import PropertyDetail from './Pages/Details';
import AdminPanel from './Pages/AdminPanel';
import NotFound from './Pages/NotFound';
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AddProperty from './Pages/AddProperty';

function App() {
  return (
    <HelmetProvider>
    <Router>
      <Analytics/>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/property-detail/:id' element={<PropertyDetail />} /> 
          <Route path='/add-property' element={<AddProperty />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </Router>
    </HelmetProvider>
  );
}

export default App;
