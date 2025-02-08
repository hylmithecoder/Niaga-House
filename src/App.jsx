import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import PropertyDetail from './Pages/Details';
import AdminPanel from './Pages/AdminPanel';
import NotFound from './Pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/property-detail/:id' element={<PropertyDetail />} /> 
          <Route path='/admin' element={<AdminPanel />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
