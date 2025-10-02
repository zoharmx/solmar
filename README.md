# 🌊 Mariscos Sol del Mar - Sitio Web Oficial

Sitio web moderno del restaurante Mariscos Sol del Mar construido con React, TypeScript y Vite.

## 🚀 Despliegue Rápido

### Opción 1: Desplegar en Vercel (Recomendado)

1. Ve a [Vercel](https://vercel.com)
2. Haz clic en "Add New Project"
3. Importa tu repositorio de GitHub: `https://github.com/zoharmx/solmar`
4. Configura la variable de entorno:
   - `GEMINI_API_KEY`: Tu API key de Google Gemini
5. Haz clic en "Deploy"

### Opción 2: Desplegar en Netlify

1. Ve a [Netlify](https://netlify.com)
2. Haz clic en "Add new site" → "Import an existing project"
3. Conecta tu repositorio de GitHub
4. Configura la variable de entorno:
   - `GEMINI_API_KEY`: Tu API key de Google Gemini
5. Haz clic en "Deploy site"

## 💻 Desarrollo Local

**Requisitos:** Node.js 20 o superior

1. Clona el repositorio:
   ```bash
   git clone https://github.com/zoharmx/solmar.git
   cd solmar
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   ```bash
   cp .env.example .env.local
   ```
   Luego edita `.env.local` y añade tu `GEMINI_API_KEY`

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🏗️ Build de Producción

Para crear un build optimizado para producción:

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

Para previsualizar el build:

```bash
npm run preview
```

## 🔑 Variables de Entorno

- `GEMINI_API_KEY`: API key de Google Gemini para el chatbot con IA

## 🛠️ Tecnologías

- **React 19** - UI Framework
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos (vía CDN)
- **Google Gemini AI** - Chatbot inteligente

## 📁 Estructura del Proyecto

```
solmar/
├── components/          # Componentes React
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── MenuSection.tsx
│   ├── AIChat.tsx
│   └── ...
├── App.tsx             # Componente principal
├── index.tsx           # Punto de entrada
├── index.html          # HTML template
├── vite.config.ts      # Configuración de Vite
└── package.json        # Dependencias
```

## 📞 Contacto del Restaurante

- **Dirección:** 10007 Long Beach Blvd., Lynwood, CA 90262
- **Teléfono:** (323) 357-1349
- **Email:** mariscossoldelmar@gmail.com

## 📝 Licencia

© 2025 Mariscos Sol del Mar. Todos los derechos reservados.
