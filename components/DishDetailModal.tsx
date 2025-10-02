import React from 'react';

type MenuItem = {
  id: string;
  name: string;
  // FIX: Added optional properties `name_en` and `desc_en` to satisfy their usage in the component.
  name_en?: string;
  desc: string;
  desc_en?: string;
  price?: number;
  imageUrls: { thumb: string; lg?: string; md?: string };
  subcategory?: string;
  tags?: string[];
};

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const DishDetailModal: React.FC<DishDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const currentLanguage = localStorage.getItem('language') || 'es';
  const name = currentLanguage === 'en' ? (item.name_en || item.name) : item.name;
  const desc = currentLanguage === 'en' ? (item.desc_en || item.desc) : item.desc;
  const priceText = item.price ? `$${item.price.toFixed(2)}` : (currentLanguage === 'es' ? 'Precio en tienda' : 'Price in store');

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div className="modal-content rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="close-modal-btn absolute top-4 right-4 text-gray-400 hover:text-sand-gold z-10">
          <i className="fas fa-times text-2xl"></i>
        </button>
        <div id="dish-detail-content" className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src={item.imageUrls?.lg || item.imageUrls?.md || item.imageUrls?.thumb || 'https://placehold.co/600x400/004d40/ffd54f?text=Sol+del+Mar'}
                alt={name}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </div>
            <div>
              <h2 className="font-display font-bold text-4xl text-sand-gold mb-4">{name}</h2>
              <div className="mb-6">
                <p className="text-gray-300 text-lg leading-relaxed">{desc}</p>
                {item.subcategory && <p className="text-sand-gold/80 text-sm mt-2 font-medium">{item.subcategory}</p>}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-sunset-orange">{priceText}</span>
                <a href="https://wa.me/13233571349" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <i className="fab fa-whatsapp"></i>
                  <span>Ordenar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetailModal;