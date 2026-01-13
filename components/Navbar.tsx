
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CrescentMoon } from './IslamicDecorations';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'أدعية قرآنية', path: '/quranic' },
    { label: 'أدعية الأنبياء', path: '/prophets' },
    { label: 'أدعية بالنية', path: '/categories' },
    { label: 'ليلة القدر', path: '/qadr' },
    { label: 'أدعية الأيام', path: '/daily' },
    { label: 'الرئيسية', path: '/' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-cairo transition-all hover:text-[#d4af37] ${
                  location.pathname === item.path ? 'text-[#d4af37] font-bold' : 'text-[#f8f1e7]/80'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-amiri text-2xl font-bold text-[#d4af37]">أدعية رمضان</span>
            <CrescentMoon className="w-8 h-8 text-[#d4af37] transition-transform group-hover:scale-110" />
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#f8f1e7] p-2 rounded-lg"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a1128]/95 backdrop-blur-xl border-b border-[#d4af37]/20 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-4 text-center">
            {[...navItems].reverse().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block py-4 rounded-md text-xl font-medium text-[#f8f1e7]/80 hover:text-[#d4af37]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
