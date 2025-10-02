import React from 'react';

interface WelcomeOverlayProps {
  onStart: () => void;
  onSkip: () => void;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onStart, onSkip }) => {
  return (
    <div id="welcome-overlay" className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="welcome-content max-w-md w-full m-4 p-8 text-center bg-gray-900 rounded-2xl border border-sand-gold/30 relative">
        <button onClick={onSkip} className="absolute top-4 right-4 text-gray-400 hover:text-sand-gold z-10" type="button">
          <i className="fas fa-times text-2xl"></i>
        </button>
        <div className="ai-avatar w-24 h-24 mx-auto mb-6 bg-ocean-blue rounded-full flex items-center justify-center">
          <i className="fas fa-robot text-4xl text-white"></i>
        </div>
        <h2 className="font-display font-bold text-3xl text-sand-gold mb-4">¡Bienvenido a Mariscos Sol Mar!</h2>
        <p className="text-gray-300 mb-6">Soy tu Chef Assistant personal. Activa tu micrófono para hablar conmigo o simplemente escucha mis recomendaciones.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button onClick={onStart} className="btn-sunset text-white font-bold py-2 px-6 rounded-xl flex items-center justify-center gap-2" type="button">
            <i className="fas fa-volume-up"></i>
            <span data-translate="continue-with-ai">Chef Assistant</span>
          </button>
          <button onClick={onSkip} className="btn-ocean text-white font-bold py-2 px-6 rounded-xl" type="button">
            <span data-translate="skip-ai">Ir al Menú</span>
          </button>
        </div>
        <div className="listening-indicator flex gap-2 justify-center">
          <div className="listening-dot w-3 h-3 bg-green-400 rounded-full"></div>
          <div className="listening-dot w-3 h-3 bg-green-400 rounded-full"></div>
          <div className="listening-dot w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <p className="text-sm text-gray-400 mt-4">Hablando con el Chef Assistant...</p>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
