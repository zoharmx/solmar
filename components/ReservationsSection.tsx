import React from 'react';

interface ReservationsSectionProps {
  onPlanEvent: () => void;
}

const ReservationsSection: React.FC<ReservationsSectionProps> = ({ onPlanEvent }) => {
  return (
    <section id="reservations" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 data-translate="reserve-table" className="font-display font-bold text-5xl text-ocean-glow mb-6">Reserve su Mesa</h2>
        <p data-translate="reserve-description" className="mt-4 text-xl text-gray-300 mb-8">Garantice su lugar para una experiencia culinaria inolvidable.</p>

        <div className="bg-gradient-to-br from-[#001a29] to-[#003d5c] rounded-3xl p-8 border-2 border-sand-gold/20 backdrop-filter backdrop-blur-lg">
          <form id="reservation-form" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" data-translate-placeholder="reserve-name" placeholder="Nombre" className="bg-black/30 border-2 border-sand-gold/30 text-white rounded-xl p-4 focus:ring-2 focus:ring-sand-gold outline-none transition" />
            <input type="tel" data-translate-placeholder="reserve-phone" placeholder="Teléfono" className="bg-black/30 border-2 border-sand-gold/30 text-white rounded-xl p-4 focus:ring-2 focus:ring-sand-gold outline-none transition" />
            <input type="date" className="bg-black/30 border-2 border-sand-gold/30 text-white rounded-xl p-4 focus:ring-2 focus:ring-sand-gold outline-none transition" style={{ colorScheme: 'dark' }} />
            <input type="time" className="bg-black/30 border-2 border-sand-gold/30 text-white rounded-xl p-4 focus:ring-2 focus:ring-sand-gold outline-none transition" style={{ colorScheme: 'dark' }} />
            <input type="number" min="1" max="20" data-translate-placeholder="reserve-guests" placeholder="Número de Personas" className="bg-black/30 border-2 border-sand-gold/30 text-white rounded-xl p-4 focus:ring-2 focus:ring-sand-gold outline-none transition md:col-span-2" />
            <button type="submit" data-translate="reserve-cta" className="md:col-span-2 w-full btn-sunset text-white font-bold py-3 px-8 rounded-xl text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg">Buscar Mesa</button>
          </form>
        </div>
        <button onClick={onPlanEvent} className="mt-8 bg-transparent border-2 border-sand-gold text-sand-gold font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-sand-gold hover:text-deep-teal flex items-center mx-auto gap-2">
          <i className="fas fa-wand-magic-sparkles"></i>
          <span data-translate="reserve-ai-cta">Planificar un Evento</span>
        </button>
      </div>
    </section>
  );
};

export default ReservationsSection;
