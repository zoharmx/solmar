import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 wave-animation opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/20 via-deep-teal/40 to-black/60"></div>
      <img src="https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2" alt="Platillo de aguachile fresco estilo Sinaloa" className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <div className="fade-in-up hero-text-backdrop" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-glow mb-4">
            <span className="block text-sand-gold">Mariscos Sol Mar</span>
          </h1>
          <h2 className="block text-3xl md:text-5xl lg:text-6xl text-white font-script" data-translate="hero-subtitle">¡Puro Sabor a Mar!</h2>
        </div>
        <div className="fade-in-up mt-8" style={{ animationDelay: '0.6s' }}>
          <a href="#menu" className="bg-transparent border-2 border-sand-gold text-sand-gold font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:bg-sand-gold hover:text-deep-teal flex items-center gap-2 mx-auto w-fit">
            <i className="fas fa-compass"></i>
            <span data-translate="explore-menu">Explorar Menú</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
