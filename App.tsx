
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DailyDuas from './pages/DailyDuas';
import Categories from './pages/Categories';
import QadrDuas from './pages/QadrDuas';
import ProphetDuas from './pages/ProphetDuas';
import QuranicDuas from './pages/QuranicDuas';
import AIDuaGenerator from './pages/AIDuaGenerator';
import { CrescentMoon } from './components/IslamicDecorations';

const Footer: React.FC = () => (
  <footer className="bg-[#050b1d] border-t border-[#d4af37]/10 py-12">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <CrescentMoon className="w-12 h-12 text-[#d4af37] mx-auto mb-4 opacity-50" />
      <p className="font-amiri text-2xl text-[#d4af37]/80 mb-2">رمضان مبارك</p>
      <p className="text-[#f8f1e7]/40 text-sm mb-8">تقبل الله منا ومنكم صالح الأعمال</p>
      <div className="flex justify-center gap-6 text-sm text-[#f8f1e7]/30">
        <span>صدقة جارية</span>
        <span>•</span>
        <span>١٤٤٦ هـ</span>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a1128] text-[#f8f1e7] flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/daily" element={<DailyDuas />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/qadr" element={<QadrDuas />} />
            <Route path="/prophets" element={<ProphetDuas />} />
            <Route path="/quranic" element={<QuranicDuas />} />
            <Route path="/ai-dua" element={<AIDuaGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
