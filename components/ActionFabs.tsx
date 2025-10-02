import React from 'react';

const ActionFabs: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
      <a 
        href="https://wa.me/13233571349" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Chat on WhatsApp" 
        className="action-fab w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </a>
      <a 
        href="tel:323-357-1349" 
        aria-label="Call Us" 
        className="action-fab w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <i className="fas fa-phone text-2xl"></i>
      </a>
    </div>
  );
};

export default ActionFabs;
