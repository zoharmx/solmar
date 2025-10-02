import React, { useState, useEffect } from 'react';
import DishDetailModal from './DishDetailModal';

// Official menu data
const menuData = {
    "CHILAQUILES": [
        { id: "chilaquiles-birria", name: "Chilaquiles de Birria", desc: "Chilaquiles crujientes bañados en tu salsa favorita, acompañados de tierna birria.", price: 12.00, imageUrls: { thumb: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "chilaquiles-bistec", name: "Chilaquiles de Bistec", desc: "Chilaquiles con jugoso bistec, una opción contundente y deliciosa.", price: 12.00, imageUrls: { thumb: "https://images.pexels.com/photos/2338015/pexels-photo-2338015.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "chilaquiles-huevo", name: "Chilaquiles de Huevo", desc: "Un clásico para el desayuno, chilaquiles con huevo al gusto.", price: 8.00, imageUrls: { thumb: "https://images.pexels.com/photos/2095469/pexels-photo-2095469.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "DESAYUNOS MEXICANOS": [
        { id: "huevos-mexicana", name: "Huevos a la Mexicana", desc: "Huevos revueltos con jitomate, cebolla y chile. Incluye Arroz y Frijoles.", price: 11.00, imageUrls: { thumb: "https://images.pexels.com/photos/3926124/pexels-photo-3926124.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "huevos-tocino", name: "Huevos con Tocino", desc: "Huevos al gusto con crujiente tocino. Incluye Arroz y Frijoles.", price: 11.00, imageUrls: { thumb: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "huevos-chorizo", name: "Huevos con Chorizo", desc: "Huevos revueltos con chorizo de la casa. Incluye Arroz y Frijoles.", price: 11.00, imageUrls: { thumb: "https://images.pexels.com/photos/5914157/pexels-photo-5914157.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "huevos-jamon", name: "Huevos con Jamon", desc: "Huevos revueltos con jamón de pavo. Incluye Arroz y Frijoles.", price: 11.00, imageUrls: { thumb: "https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "huevos-machaca", name: "Huevos con Machaca", desc: "Tradicional machaca con huevo. Incluye Arroz y Frijoles.", price: 12.00, imageUrls: { thumb: "https://images.pexels.com/photos/4057758/pexels-photo-4057758.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "huevos-estrellados", name: "Huevos Estrellados", desc: "Dos huevos fritos sobre tortilla. Incluye Arroz y Frijoles.", price: 10.00, imageUrls: { thumb: "https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "huevos-divorciados", name: "Huevos Divorciados", desc: "Dos huevos estrellados, uno bañado en salsa roja y otro en salsa verde. Incluye Arroz y Frijoles.", price: 10.00, imageUrls: { thumb: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "omelett", name: "Omelett", desc: "Omelett de tres huevos con ingredientes a elegir. Incluye Arroz y Frijoles.", price: 10.00, imageUrls: { thumb: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "TACOS DORADOS": [
        { id: "tacos-requeson", name: "Requeson", desc: "Orden de 3 tacos dorados de requesón. Incluye Arroz y Frijoles.", price: 4.50, imageUrls: { thumb: "https://images.pexels.com/photos/4958742/pexels-photo-4958742.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tacos-pollo", name: "Pollo", desc: "Orden de 3 tacos dorados de pollo. Incluye Arroz y Frijoles.", price: 4.50, imageUrls: { thumb: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tacos-papa", name: "Papa", desc: "Orden de 3 tacos dorados de papa. Incluye Arroz y Frijoles.", price: 4.50, imageUrls: { thumb: "https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tacos-papa-pollo", name: "Papa con Pollo", desc: "Orden de 3 tacos dorados de papa con pollo. Incluye Arroz y Frijoles.", price: 4.50, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "BURRITOS": [
        { id: "burrito-varios", name: "Asada, Chorizo, Huevo con Machaca", desc: "Tu elección de carne en un burrito generoso. Regular o Bañado.", price: 12.50, imageUrls: { thumb: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "burrito-asada", name: "Burritos de Asada", desc: "Jugosa carne asada en un burrito. Regular o Bañado.", price: 12.50, imageUrls: { thumb: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "burrito-birria", name: "Burritas de Birria", desc: "Deliciosa birria en burrito.", price: 8.50, imageUrls: { thumb: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "burrito-asada-2", name: "Asada", desc: "El clásico burrito de asada.", price: 11.99, imageUrls: { thumb: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "burrito-pollo", name: "Pollo", desc: "Burrito de pollo marinado.", price: 11.99, imageUrls: { thumb: "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "QUESADILLAS": [
        { id: "quesadilla-queso", name: "Quesadilla de Queso", desc: "Quesadilla clásica con queso derretido. Incluye Arroz y Frijoles.", price: 4.50, imageUrls: { thumb: "https://images.pexels.com/photos/4969843/pexels-photo-4969843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "quesadilla-asada", name: "Quesadilla de Asada", desc: "Quesadilla con carne asada. Incluye Arroz y Frijoles.", price: 6.00, imageUrls: { thumb: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "quesadilla-birria", name: "Quesadilla de Birria", desc: "Quesadilla con birria de la casa. Incluye Arroz y Frijoles.", price: 6.00, imageUrls: { thumb: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "quesadilla-marlin", name: "Queso o Marlin", desc: "Quesadilla rellena de queso o marlin ahumado.", price: 17.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "quesadilla-solo-queso", name: "Solo Queso", desc: "Una quesadilla sencilla solo con queso.", price: 10.99, imageUrls: { thumb: "https://images.pexels.com/photos/4969843/pexels-photo-4969843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "quesadilla-pollo", name: "Pollo", desc: "Quesadilla con pollo a la plancha.", price: 14.99, imageUrls: { thumb: "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "quesadilla-carne-asada", name: "Carne Asada", desc: "Quesadilla con nuestra jugosa carne asada.", price: 15.99, imageUrls: { thumb: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "ENCHILADAS": [
        { id: "enchiladas-suizas", name: "Enchiladas Suizas con Queso", desc: "Orden de 3 enchiladas en salsa verde cremosa con queso gratinado. Incluye Arroz y Frijoles.", price: 8.50, imageUrls: { thumb: "https://images.pexels.com/photos/2095469/pexels-photo-2095469.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "enchiladas-pollo", name: "Enchiladas de Pollo", desc: "Orden de 3 enchiladas de pollo en salsa a elección. Incluye Arroz y Frijoles.", price: 8.50, imageUrls: { thumb: "https://images.pexels.com/photos/2790387/pexels-photo-2790387.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "enchiladas-pollo-verdes", name: "Enchiladas de Pollo Verdes", desc: "Orden de 3 enchiladas de pollo en salsa verde. Incluye Arroz y Frijoles.", price: 8.50, imageUrls: { thumb: "https://images.pexels.com/photos/5411030/pexels-photo-5411030.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "enchiladas-pollo-rojas", name: "Enchiladas de Pollo Rojas", desc: "Orden de 3 enchiladas de pollo en salsa roja. Incluye Arroz y Frijoles.", price: 8.50, imageUrls: { thumb: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "enchiladas-birria", name: "Enchiladas de Birria Roja o Verde", desc: "Orden de 3 enchiladas de birria en tu salsa favorita. Incluye Arroz y Frijoles.", price: 8.50, imageUrls: { thumb: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "enchiladas-del-mar", name: "Enchiladas Del Mar", desc: "Rellenas de una mezcla de mariscos, bañadas en salsa cremosa.", price: 25.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "enchiladas-pollo-2", name: "Enchiladas de Pollo", desc: "Clásicas enchiladas de pollo con arroz y frijoles.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/2790387/pexels-photo-2790387.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "BIRRIA": [
        { id: "birria-caldo", name: "Birria con Caldo", desc: "Birria de res servida en su jugo. Incluye Arroz y Frijoles.", price: 10.50, imageUrls: { thumb: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tacos-birria", name: "Tacos de Birria", desc: "Tacos de birria con queso y consomé.", price: 2.50, imageUrls: { thumb: "https://images.pexels.com/photos/7627414/pexels-photo-7627414.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "PANCAKES & WAFFLES": [
        { id: "pancake-regular", name: "Pancake Regular", desc: "Dos pancakes esponjosos con mantequilla y miel.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "pancake-tres-leches", name: "Pancake Tres Leches", desc: "Pancakes bañados en la tradicional salsa de tres leches.", price: 8.00, imageUrls: { thumb: "https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "french-toast", name: "French Toast", desc: "Tostadas a la francesa con canela y azúcar.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/6941029/pexels-photo-6941029.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "waffles", name: "WAFFLES", desc: "Waffles crujientes por fuera y suaves por dentro.", price: 6.00, imageUrls: { thumb: "https://images.pexels.com/photos/1655901/pexels-photo-1655901.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "STARTERS": [
        { id: "hecho-al-momento", name: "Hecho al Momento", desc: "Guacamole fresco preparado en tu mesa.", price: 10.99, imageUrls: { thumb: "https://images.pexels.com/photos/4057738/pexels-photo-4057738.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "empanadas-camaron", name: "Empanadas de Camarón", desc: "Empanadas crujientes rellenas de camarón.", price: 13.99, imageUrls: { thumb: "https://images.pexels.com/photos/3926133/pexels-photo-3926133.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "taquitos-dorados", name: "Taquitos Dorados", desc: "Pequeños tacos fritos para empezar.", price: 15.99, imageUrls: { thumb: "https://images.pexels.com/photos/4958742/pexels-photo-4958742.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "langostinos-naufragos", name: "Langostinos Náufragos", desc: "Langostinos salteados en nuestra salsa especial.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "cucarachas", name: "Cucarachas", desc: "Camarones fritos con una salsa picante especial.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "ESPECIALIDADES DE LA CASA": [
        { id: "botana-caliente", name: "Botana Caliente", desc: "Una selección de nuestros mejores mariscos calientes.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "molcajete-mariscos", name: "Molcajete de Mariscos Sol y Mar", desc: "Para Una Persona. La joya de la casa, mariscos en molcajete.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/5639430/pexels-photo-5639430.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "parrillada-mariscos-1", name: "Parrillada de Mariscos (Para Una Persona)", desc: "Selección de mariscos a la parrilla.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "parrillada-mariscos-2", name: "Parrillada de Mariscos (Para Dos Personas)", desc: "El doble de sabor para compartir.", price: 64.99, imageUrls: { thumb: "https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "parrillada-asada-1", name: "Parrillada De Carne Asada (Para Una Persona)", desc: "Para los amantes de la carne.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "parrillada-asada-2", name: "Parrillada De Carne Asada (Para Dos Personas)", desc: "Más carne para compartir.", price: 64.99, imageUrls: { thumb: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "parrillada-mixta", name: "Parrillada Mixta (Para Dos Personas)", desc: "La combinación perfecta de carne y mariscos.", price: 64.99, imageUrls: { thumb: "https://images.pexels.com/photos/3662136/pexels-photo-3662136.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "carne-asada", name: "Carne Asada", desc: "Un clásico corte de carne asada a la parrilla.", price: 25.99, imageUrls: { thumb: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "pollo-empanizado", name: "Pollo Empanizado", desc: "Pechuga de pollo empanizada y crujiente.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/60616/appetizer-breaded-chicken-chicken-fillet-60616.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "pollo-parrilla", name: "Pollo a la Parrilla", desc: "Pechuga de pollo marinada y asada a la parrilla.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "mar-y-tierra", name: "Mar y Tierra", desc: "La combinación perfecta de carne y camarones.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/3662136/pexels-photo-3662136.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "filete-grenudo", name: "Filete Greñudo Costeño", desc: "Filete de pescado con una preparación especial de la costa.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "steak-tampiquena", name: "Steak Tampiqueña", desc: "Steak servido con enchiladas y guacamole.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "mojarra-frita", name: "Mojarra Frita", desc: "Mojarra entera frita, crujiente y deliciosa.", price: 9.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "BRUNCH": [
        { id: "machaca-sinaloense", name: "Machaca Sinaloense", desc: "La auténtica machaca de Sinaloa, ¡puro sabor!", price: 17.99, imageUrls: { thumb: "https://images.pexels.com/photos/4057758/pexels-photo-4057758.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "casa-quiles", name: "Casa-Quiles", desc: "Nuestra versión especial de chilaquiles, ¡te sorprenderá!", price: 17.99, imageUrls: { thumb: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "chilaquiles", name: "Chilaquiles", desc: "Elige tu salsa y proteína favorita para estos chilaquiles.", price: 14.99, imageUrls: { thumb: "https://images.pexels.com/photos/2338015/pexels-photo-2338015.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "burrito-chorizo", name: "Burrito de Chorizo", desc: "Un burrito cargado de sabor con nuestro chorizo casero.", price: 12.99, imageUrls: { thumb: "https://images.pexels.com/photos/5914157/pexels-photo-5914157.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "burrito-mojado", name: "Burrito en Mojado en Salsa Roja / Verde", desc: "Baña tu burrito en salsa roja o verde por un extra.", price: 3.00, imageUrls: { thumb: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "huevos-rancheros", name: "Huevos Rancheros", desc: "Un clásico del desayuno mexicano que nunca falla.", price: 12.99, imageUrls: { thumb: "https://images.pexels.com/photos/3926124/pexels-photo-3926124.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "agregar-carne-asada", name: "Agregar Carne Asada", desc: "Añade jugosa carne asada a tu platillo.", price: 6.00, imageUrls: { thumb: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "huevos-mexicana-brunch", name: "Huevos a la Mexicana", desc: "Huevos revueltos con los colores de México.", price: 12.99, imageUrls: { thumb: "https://images.pexels.com/photos/3926124/pexels-photo-3926124.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "FAJITAS": [
        { id: "fajitas-mixtas", name: "Fajitas Mixtas", desc: "Una combinación de pollo, res y camarones.", price: 26.99, imageUrls: { thumb: "https://images.pexels.com/photos/3662136/pexels-photo-3662136.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "fajitas-pollo", name: "Pollo", desc: "Tiernas fajitas de pollo marinado.", price: 24.99, imageUrls: { thumb: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "fajitas-res", name: "Res", desc: "Jugosas fajitas de res a la parrilla.", price: 26.99, imageUrls: { thumb: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "SHRIMP COMBINATIONS": [
        { id: "shrimp-plancha", name: "A la plancha", desc: "Camarones frescos cocinados a la plancha. Acompañado con arroz, papa al horno y ensalada.", price: 24.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "shrimp-diabla", name: "A la Diabla", desc: "Camarones en nuestra salsa diabla picosita. Acompañado con arroz, papa al horno y ensalada.", price: 24.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "shrimp-mojo", name: "Al Mojo de Ajo", desc: "Camarones salteados en una deliciosa salsa de ajo. Acompañado con arroz, papa al horno y ensalada.", price: 24.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "shrimp-empanizados", name: "Empanizados", desc: "Camarones crujientes y dorados. Acompañado con arroz, papa al horno y ensalada.", price: 25.99, imageUrls: { thumb: "https://images.pexels.com/photos/3926133/pexels-photo-3926133.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "shrimp-costa-azul", name: "Costa Azul", desc: "Camarones envueltos en tocino y rellenos de queso. Acompañado con arroz, papa al horno y ensalada.", price: 27.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "shrimp-rancheros", name: "Rancheros", desc: "Camarones en una salsa ranchera casera. Acompañado con arroz, papa al horno y ensalada.", price: 24.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "PULPO COMBINATIONS": [
        { id: "pulpo-diabla", name: "Pulpo a la Diabla", desc: "Pulpo tierno en nuestra salsa diabla. Acompañado con arroz, papa al horno y ensalada.", price: 28.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "pulpo-mojo", name: "Pulpo al Mojo de Ajo", desc: "Pulpo salteado en una deliciosa salsa de ajo. Acompañado con arroz, papa al horno y ensalada.", price: 28.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "FISH COMBINATIONS": [
        { id: "filete-plancha", name: "Filete a la Plancha", desc: "Filete de pescado fresco a la plancha. Acompañado con arroz, papa al horno y ensalada.", price: 22.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "filete-diabla", name: "Filete a la Diabla", desc: "Filete de pescado en salsa diabla. Acompañado con arroz, papa al horno y ensalada.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "filete-mojo", name: "Filete al Mojo de Ajo", desc: "Filete de pescado en salsa de ajo. Acompañado con arroz, papa al horno y ensalada.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "filete-parrilla", name: "Fillete a la Parrilla", desc: "Filete de pescado asado a la parrilla. Acompañado con arroz, papa al horno y ensalada.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "mojarra-grande", name: "Mojarra Frita (Grande, Frita, A la Diabla o Al Mojo de Ajo)", desc: "Una mojarra grande preparada a tu gusto.", price: 20.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "diablo-fish-taco", name: "Diablo Fish Taco", desc: "Taco de pescado con un toque picante.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "CALDOS": [
        { id: "caldo-7-mares", name: "7 Mares", desc: "El rey de los caldos, con una variedad de mariscos.", price: 26.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "caldo-camaron", name: "Caldo de Camaron", desc: "Un caldo reconfortante y lleno de sabor a camarón.", price: 24.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "caldo-pescado", name: "Caldo de Pescado", desc: "Caldo tradicional de pescado, como hecho en casa.", price: 22.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "costa-brava", name: "Costa Brava", desc: "Un caldo especial de la casa con un toque picante.", price: 24.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "BOTANAS MARISQUERAS": [
        { id: "la-torre", name: "La Torre", desc: "Una impresionante torre de mariscos frescos.", price: 34.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "botana-mixta", name: "Botana Mixta", desc: "Una selección de nuestras mejores botanas de mariscos.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "camarones-aguachiles", name: "Camarones Aguachiles", desc: "Camarones marinados en una salsa picante de chiles.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "camaron-cosido", name: "Camaron Cosido", desc: "Camarones cocidos, listos para disfrutar.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "camaron-y-pulpo", name: "Camaron y Pulpo", desc: "La combinación perfecta de camarón y pulpo.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "camaron-y-callo", name: "Camaron y Caldo de Hacha", desc: "Una delicia para los amantes del callo de hacha.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "callo-de-hacha", name: "Callo de Hacha Original", desc: "Callo de hacha fresco y de la mejor calidad.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "docena-ostiones", name: "Docena de Ositones", desc: "Ostiones frescos, servidos en su concha.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/257853/pexels-photo-257853.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "media-docena-ostiones", name: "Media Docena de Ostiones", desc: "Media docena para empezar.", price: 18.99, imageUrls: { thumb: "https://images.pexels.com/photos/257853/pexels-photo-257853.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "shots-ostiones", name: "Shots de Ostiones", desc: "Un shot preparado con ostión, ¡pruébalo!", price: 6.25, imageUrls: { thumb: "https://images.pexels.com/photos/257853/pexels-photo-257853.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "TOSTADAS": [
        { id: "tostada-mango", name: "Mango en salsa Negra", desc: "Una tostada exótica y deliciosa. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 15.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-mixta", name: "Mixta (Camaron, Jaiba, Pulpo y Abulon)", desc: "Una tostada con todos los sabores del mar. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 18.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-veranera", name: "Veranera en Salsa Roja", desc: "Camarón, jaiba, pulpo, abulón, mango, coco. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 20.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-aguachile", name: "Aguachile en Salsa Verde", desc: "La frescura del aguachile en una tostada. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 14.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-ceviche-camaron", name: "Ceviche de Camaron", desc: "La clásica tostada de ceviche de camarón. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 9.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-ceviche-pescado", name: "Ceviche de Pescado", desc: "La clásica tostada de ceviche de pescado. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 7.99, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-camaron-cocido", name: "Camaron Cocido", desc: "Tostada de camarón cocido. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 10.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-pulpo", name: "Pulpo", desc: "Tostada de pulpo fresco. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 13.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-camaron-jaiba", name: "Camaron Cocido y Jaiba", desc: "Una combinación deliciosa. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 13.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-abulon", name: "Abulon", desc: "Tostada de abulón. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 7.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "tostada-jaiba", name: "Jaiba", desc: "Tostada de jaiba fresca. Con cebolla, cilantro, pepino, tomate, salsa negra.", price: 7.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "COCTELES": [
        { id: "coctel-medium", name: "Medium", desc: "Elige entre Camaron, Pulpo, Abulon Imitacion, Jaiba.", price: 16.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "coctel-large", name: "Large", desc: "Un coctel más grande para más sabor.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "coctel-callo", name: "Callo de Hacha", desc: "Un coctel de lujo con callo de hacha.", price: 33.99, imageUrls: { thumb: "https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "coctel-campechana", name: "Campechana", desc: "Una mezcla de varios mariscos en un solo coctel.", price: 23.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "SUSHI": [
        { id: "sushi-sinaloa", name: "Sinaloa Roll", desc: "Un rollo con el sabor auténtico de Sinaloa.", price: undefined, imageUrls: { thumb: "https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "sushi-california", name: "California Roll", desc: "El clásico rollo California que a todos les gusta.", price: undefined, imageUrls: { thumb: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "sushi-guamuchilito", name: "Guamuchilito Roll", desc: "Un rollo especial de la casa, ¡pruébalo!", price: undefined, imageUrls: { thumb: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "sushi-mar-tierra", name: "Mar y Tierra Roll", desc: "La combinación perfecta de mar y tierra en un rollo.", price: undefined, imageUrls: { thumb: "https://images.pexels.com/photos/3662136/pexels-photo-3662136.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "TAQUERIA": [
        { id: "taco-asada", name: "Taco de Asada", desc: "El taco de asada que nunca falla.", price: 3.50, imageUrls: { thumb: "https://images.pexels.com/photos/4958742/pexels-photo-4958742.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "taco-pollo-taqueria", name: "Taco de Pollo", desc: "Taco de pollo marinado y jugoso.", price: 2.99, imageUrls: { thumb: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "TACOS DE MARISCOS": [
        { id: "taco-sol-y-mar", name: "Sol y Mar", desc: "El taco especial de la casa con una mezcla de mariscos.", price: 5.50, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "taco-marlin", name: "Marlin", desc: "Taco de marlin ahumado, una delicia.", price: 5.25, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "taco-governador", name: "Governador", desc: "El famoso taco gobernador con camarón y queso.", price: 5.50, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "taco-pulpo-endiablado", name: "Pulpo Endiablado", desc: "Taco de pulpo en nuestra salsa diabla.", price: 6.99, imageUrls: { thumb: "https://images.pexels.com/photos/6231843/pexels-photo-6231843.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "taco-pescado-baja", name: "Pescado estilo Baja", desc: "El clásico taco de pescado estilo Baja.", price: 3.75, imageUrls: { thumb: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "taco-camaron-baja", name: "Taco de Camaron estilo Baja", desc: "Taco de camarón estilo Baja, crujiente y fresco.", price: 3.75, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "NACHOS": [
        { id: "nachos-asada", name: "Asada", desc: "Nachos con carne asada, frijol, queso, crema y guacamole.", price: 15.99, imageUrls: { thumb: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "nachos-pollo", name: "Pollo", desc: "Nachos con pollo, frijol, queso, crema y guacamole.", price: 15.99, imageUrls: { thumb: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "nachos-camaron", name: "Camaron", desc: "Nachos con camarones, frijol, queso, crema y guacamole.", price: 19.99, imageUrls: { thumb: "https://images.pexels.com/photos/1833332/pexels-photo-1833332.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "KIDS MENU": [
        { id: "kids-pancakes", name: "Pancakes (Two Pieces)", desc: "Dos pancakes para los más pequeños.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "kids-camarones", name: "Camarones Empanizados", desc: "Camarones crujientes para niños.", price: 10.99, imageUrls: { thumb: "https://images.pexels.com/photos/3926133/pexels-photo-3926133.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "kids-enchiladas", name: "Enchiladas de Queso con Arroz y Frijoles", desc: "Enchiladas suaves de queso para niños.", price: 10.99, imageUrls: { thumb: "https://images.pexels.com/photos/2095469/pexels-photo-2095469.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "DESSERTS": [
        { id: "dessert-platano", name: "Platano Macho", desc: "Plátano macho frito, un postre tradicional.", price: 9.99, imageUrls: { thumb: "https://images.pexels.com/photos/6941029/pexels-photo-6941029.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "dessert-flan", name: "Flan Casero", desc: "Flan hecho en casa, cremoso y delicioso.", price: 9.99, imageUrls: { thumb: "https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=160" } }
    ],
    "BEBIDAS": [
        { id: "bebida-jarritos", name: "Jarritos", desc: "Refrescos mexicanos de sabores.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/1304523/pexels-photo-1304523.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "bebida-coca", name: "Coca-Cola", desc: "Coca-Cola clásica.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "bebida-coca-light", name: "Coca-Cola Light", desc: "Coca-Cola de dieta.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "bebida-sprite", name: "Sprite", desc: "Refresco de lima-limón.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "bebida-fanta", name: "Fanta", desc: "Refresco de naranja.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "bebida-lata", name: "Sodas de Lata", desc: "Variedad de sodas en lata.", price: 4.00, imageUrls: { thumb: "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "cafe-regular", name: "Cafe Regular", desc: "Café americano recién hecho.", price: 2.25, imageUrls: { thumb: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "cafe-descafeinado", name: "Cafe Descafeinado", desc: "Café descafeinado para cualquier hora.", price: 3.00, imageUrls: { thumb: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "cafe-canela", name: "Cafe con Canela", desc: "Café con un toque de canela.", price: 4.00, imageUrls: { thumb: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "cafe-olla", name: "Cafe de Olla", desc: "Café de olla tradicional mexicano.", price: 4.00, imageUrls: { thumb: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "champurrado", name: "Champurrados", desc: "Bebida caliente y espesa de chocolate y maíz.", price: 4.00, imageUrls: { thumb: "https://images.pexels.com/photos/5946633/pexels-photo-5946633.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "limonada-mineral", name: "Limonada Mineral", desc: "Limonada refrescante con agua mineral.", price: 6.99, imageUrls: { thumb: "https://images.pexels.com/photos/1304523/pexels-photo-1304523.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "jugo-naranja", name: "Jugo de Naranja", desc: "Jugo de naranja natural recién exprimido.", price: 8.00, imageUrls: { thumb: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "jugo-verde", name: "Jugo Verde", desc: "Jugo verde detox con vegetales frescos.", price: 8.00, imageUrls: { thumb: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "agua-orchata", name: "Orchata", desc: "Agua fresca de horchata.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/4226895/pexels-photo-4226895.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "agua-pina", name: "Piña", desc: "Agua fresca de piña.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=160" } },
        { id: "agua-limon", name: "Limon", desc: "Agua fresca de limón.", price: 5.00, imageUrls: { thumb: "https://images.pexels.com/photos/1304523/pexels-photo-1304523.jpeg?auto=compress&cs=tinysrgb&w=160" } }
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
