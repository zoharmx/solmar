import React, { useState } from 'react';

// --- Componente del Modal (integrado para resolver error de importación) ---
type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price?: number;
  imageUrls: { thumb: string; lg?: string };
};

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const DishDetailModal: React.FC<DishDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;
  const priceText = item.price ? `$${item.price.toFixed(2)}` : 'Precio en tienda';
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
                src={item.imageUrls?.lg || item.imageUrls?.thumb}
                alt={item.name}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="font-display font-bold text-4xl text-sand-gold mb-4">{item.name}</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{item.desc}</p>
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

// --- Datos completos y oficiales del menú con imágenes profesionales ---
const menuData = {
    "Desayunos": [
        { id: "d1", name: "Chilaquiles de Birria", desc: "Totopos de maíz bañados en salsa a tu elección, coronados con tierna birria, queso fresco y crema.", price: 12.00, imageUrls: { thumb: "https://images.pexels.com/photos/10305537/pexels-photo-10305537.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "d2", name: "Huevos con Machaca", desc: "Tradicional carne seca de res guisada con huevo, jitomate y cebolla. Servido con arroz y frijoles.", price: 12.00, imageUrls: { thumb: "https://images.pexels.com/photos/8993465/pexels-photo-8993465.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "d3", name: "Huevos a la Mexicana", desc: "Huevos revueltos con jitomate, cebolla y chile serrano. Acompañados de arroz y frijoles.", price: 11.00, imageUrls: { thumb: "https://images.pexels.com/photos/5774151/pexels-photo-5774151.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "d4", name: "Omelette", desc: "Esponjoso omelette relleno de tus ingredientes favoritos, acompañado de frijoles.", price: 10.00, imageUrls: { thumb: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400" } }
    ],
    "Entradas": [
        { id: "e1", name: "Guacamole Hecho al Momento", desc: "Aguacate fresco preparado en tu mesa con jitomate, cebolla, cilantro y un toque de limón.", price: 10.99, imageUrls: { thumb: "https://images.pexels.com/photos/5703310/pexels-photo-5703310.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "e2", name: "Empanadas de Camarón", desc: "Crujientes empanadas rellenas de un delicioso guiso de camarón con queso.", price: 13.99, imageUrls: { thumb: "https://images.pexels.com/photos/8249233/pexels-photo-8249233.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "e3", name: "Langostinos Náufragos", desc: "Jugosos langostinos salteados en nuestra salsa especial de la casa. ¡Para chuparse los dedos!", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/2284169/pexels-photo-2284169.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "e4", name: "Tostada Veranera en Salsa Roja", desc: "Mariscos frescos con mango y coco en una vibrante salsa roja.", price: 20.99, imageUrls: { thumb: "https://images.pexels.com/photos/8780918/pexels-photo-8780918.jpeg?auto=compress&cs=tinysrgb&w=400" } }
    ],
    "Botanas Marisqueras": [
        { id: "b1", name: "La Torre", desc: "Espectacular torre de mariscos frescos en capas: ceviche, camarón cocido, pulpo y aguacate.", price: 34.99, imageUrls: { thumb: "https://images.pexels.com/photos/8891009/pexels-photo-8891009.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "b2", name: "Botana Mixta", desc: "Una selección de nuestros mejores mariscos: camarón cocido, pulpo, callo de hacha y más.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/6260849/pexels-photo-6260849.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "b3", name: "Camarones Aguachiles", desc: "Camarones frescos marinados en una picosita salsa de limón, chiles y cilantro.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "b4", name: "Docena de Ostiones", desc: "Ostiones frescos y jugosos servidos en su concha, listos para prepararse a tu gusto.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/7937471/pexels-photo-7937471.jpeg?auto=compress&cs=tinysrgb&w=400" } }
    ],
    "Especialidades": [
        { id: "es1", name: "Molcajete Sol y Mar", desc: "Impresionante combinación de mariscos y carnes en una salsa especial, servido en molcajete caliente.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "es2", name: "Parrillada de Mariscos (2p)", desc: "Una fiesta de sabores del mar a la parrilla para dos: camarones, pulpo, pescado y langostinos.", price: 64.99, imageUrls: { thumb: "https://images.pexels.com/photos/6020320/pexels-photo-6020320.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "es3", name: "Mar y Tierra", desc: "La combinación perfecta de un jugoso corte de carne y camarones a la plancha o al mojo de ajo.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/3662125/pexels-photo-3662125.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "es4", name: "Mojarra Frita", desc: "Pescado entero y crujiente, frito a la perfección. Acompañado de ensalada y arroz.", price: 20.99, imageUrls: { thumb: "https://images.pexels.com/photos/8437025/pexels-photo-8437025.jpeg?auto=compress&cs=tinysrgb&w=400" } }
    ],
    "Caldos y Cocteles": [
        { id: "c1", name: "Caldo 7 Mares", desc: "Nuestra sopa insignia con una generosa mezcla de los mejores mariscos del día.", price: 26.99, imageUrls: { thumb: "https://images.pexels.com/photos/1683492/pexels-photo-1683492.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "c2", name: "Caldo de Camarón", desc: "Reconfortante y picosito caldo con camarones frescos, verduras y un toque de chipotle.", price: 24.99, imageUrls: { thumb: "https://images.pexels.com/photos/566565/pexels-photo-566565.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "c3", name: "Coctel Campechana", desc: "Clásico coctel con camarón y pulpo en nuestra salsa especial, con aguacate y pico de gallo.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/6061396/pexels-photo-6061396.jpeg?auto=compress&cs=tinysrgb&w=400" } }
    ],
    "Tacos y Burritos": [
        { id: "t1", name: "Tacos de Pescado (Baja)", desc: "Tacos estilo Baja con pescado rebozado, ensalada de col y aderezo cremoso de chipotle.", price: 3.75, imageUrls: { thumb: "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "t2", name: "Taco Governador", desc: "Deliciosa combinación de camarón salteado con pimientos y queso gratinado, en tortilla de maíz.", price: 5.50, imageUrls: { thumb: "https://images.pexels.com/photos/5560667/pexels-photo-5560667.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "t3", name: "Taco de Asada", desc: "El taco clásico con carne asada de primera, cilantro, cebolla y tu salsa favorita.", price: 3.50, imageUrls: { thumb: "https://images.pexels.com/photos/5712170/pexels-photo-5712170.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "t4", name: "Burrito de Asada", desc: "Gran tortilla de harina rellena de carne asada, arroz, frijoles, queso y guacamole.", price: 11.99, imageUrls: { thumb: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400" } }
    ],
    "Bebidas y Postres": [
        { id: "b1", name: "Aguas Frescas", desc: "Refrescantes y 100% naturales. Pregunta por nuestros sabores del día: Horchata, Piña, Limón.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "b2", name: "Café de Olla", desc: "Auténtico café mexicano endulzado con piloncillo y un toque de canela.", price: 4.00, imageUrls: { thumb: "https://images.pexels.com/photos/17693952/pexels-photo-17693952.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "p1", name: "Flan Casero", desc: "Clásico y cremoso flan de vainilla con un generoso baño de caramelo dorado.", price: 9.99, imageUrls: { thumb: "https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg?auto=compress&cs=tinysrgb&w=400" } },
        { id: "p2", name: "Plátano Macho Frito", desc: "Dulces plátanos fritos, servidos con crema o leche condensada. El postre perfecto.", price: 9.99, imageUrls: { thumb: "https://images.pexels.com/photos/5639352/pexels-photo-5639352.jpeg?auto=compress&cs=tinysrgb&w=400" } }
    ]
};

// --- Componente Principal de la Sección de Menú ---
const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(Object.keys(menuData)[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const categories = Object.keys(menuData) as Array<keyof typeof menuData>;
  return (
    <>
      <section id="menu" className="py-20 bg-gradient-to-b from-black/50 to-deep-teal/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-glow mb-6" data-translate="menu-title">Nuestro Menú Oceánico</h2>
          </div>
          <div id="menu-categories" className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map(category => (
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
