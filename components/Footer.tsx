import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t-2 border-sand-gold/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">&copy; 2025 Mariscos Sol Mar. <span data-translate="rights-reserved">Todos los derechos reservados.</span></p>
      </div>
    </footer>
  );
};

export default Footer;
