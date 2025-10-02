import React from 'react';

interface HeaderProps {
  onAssistantClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAssistantClick }) => {
  return (
    <header id="header" className="floating-nav fixed top-4 left-4 right-4 z-50 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#home" className="flex-shrink-0 flex items-center gap-3 group">
          <img src="https://assets.zyrosite.com/Yg2j3Kavlei1p0kV/logo-mePJRkpbJ1ie7JWp.png" alt="Logo Sol Mar" className="h-12 w-auto transition-transform duration-300 group-hover:scale-110" />
          <span className="font-display font-bold text-xl text-sand-gold hidden sm:block">Mariscos Sol Mar</span>
        </a>
        <div className="flex items-center gap-6">
          <button onClick={onAssistantClick} className="btn-ocean text-white font-semibold py-2 px-4 rounded-xl hover:scale-105 flex items-center gap-2 transition-transform">
            <i className="fas fa-robot"></i>
            <span data-translate="chef-ai" className="hidden sm:inline">Chef Assistant</span>
          </button>
          <a href="#reservations" className="btn-sunset text-white font-bold py-2 px-6 rounded-xl hover:scale-105 flex items-center gap-2 transition-transform">
            <i className="fas fa-calendar"></i>
            <span data-translate="nav-reservations">Reservar</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
