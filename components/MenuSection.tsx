import React, { useState, useEffect } from 'react';
import DishDetailModal from './DishDetailModal';

// Mock data for menu items
const menuData = {
    "Desayunos": [
        { id: "1", name: "Chilaquiles de Birria", desc: "Deliciosos chilaquiles bañados en salsa roja o verde, acompañados de birria", price: 12, imageUrls: { thumb: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "2", name: "Huevos Rancheros", desc: "Huevos estrellados sobre tortillas con salsa ranchera, arroz y frijoles", price: 11, imageUrls: { thumb: "https://images.pexels.com/photos/3926124/pexels-photo-3926124.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "Mariscos": [
        { id: "3", name: "Aguachile Verde", desc: "Camarones frescos marinados en limón con chile serrano y pepino", price: 15, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "4", name: "Camarones al Mojo de Ajo", desc: "Camarones salteados en mantequilla con ajo, acompañados de arroz", price: 18, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "Especialidades": [
        { id: "5", name: "Molcajete Sol y Mar", desc: "Una combinación única de mariscos y carne en molcajete caliente", price: 25, imageUrls: { thumb: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ]
};

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price?: number;
  imageUrls: { thumb: string };
};


const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(Object.keys(menuData)[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <>
      <section id="menu" className="py-20 bg-gradient-to-b from-black/50 to-deep-teal/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-glow mb-6" data-translate="menu-title">Nuestro Menú Oceánico</h2>
          </div>
          <div id="menu-categories" className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.keys(menuData).map(category => (
              <button 
                key={category}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category ? 'menu-category-active' : 'bg-black/30 text-sand-gold hover:bg-white/10'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div id="menu-items" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {menuData[activeCategory as keyof typeof menuData].map(item => (
              <div key={item.id} className="menu-item-card card-hover rounded-2xl p-6 flex gap-6" onClick={() => setSelectedItem(item)}>
                <div className="w-28 h-28 flex-shrink-0">
                  <img src={item.imageUrls.thumb} alt={item.name} className="w-full h-full object-cover rounded-xl shadow-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display font-bold text-xl text-sand-gold pr-2">{item.name}</h3>
                    {item.price && <span className="font-bold text-lg text-sunset-orange flex-shrink-0">${item.price.toFixed(2)}</span>}
                  </div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.desc}</p>
                  <span className="text-sm text-sand-gold/80 cursor-pointer hover:text-sand-gold transition-colors" data-translate="view-details">Ver detalles</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedItem && <DishDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  );
};

export default MenuSection;
