# Nuestro Pulso - Red Cívica de Colombia

🇨🇴 **La plataforma líder de participación cívica en Colombia**

Una aplicación web moderna construida con React, Vite, TypeScript y Tailwind CSS que permite a los ciudadanos colombianos participar en debates, encuestas, chat en vivo y seguir la actividad política nacional.

![Nuestro Pulso Screenshot](https://github.com/user-attachments/assets/e564ca66-8499-47f6-8b89-469474232f7f)

## 🚀 Características

- **🗨️ Chat en Vivo**: Conversaciones en tiempo real sobre temas de interés nacional
- **🗣️ Debates**: Debates estructurados sobre políticas públicas
- **📊 Encuestas**: Sistema de votación y encuestas ciudadanas
- **🏛️ Seguimiento del Congreso**: Actividad legislativa en tiempo real
- **📈 Centro Electoral**: Información electoral actualizada
- **📰 Noticias**: Feed de noticias políticas nacionales e internacionales
- **🔥 Firebase Integration**: Autenticación y análisis
- **📱 PWA Ready**: Aplicación web progresiva optimizada

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS con glass-morphism design
- **Backend**: Firebase (Auth, Analytics)
- **APIs**: News API para noticias en tiempo real
- **Build**: Vite con optimizaciones de producción
- **Linting**: ESLint + TypeScript

## 🏃‍♂️ Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### 1. Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
cd nuestro-pulso-test

# Instalar dependencias
npm install
```

### 2. Configuración de Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_NEWS_API_KEY=tu_news_api_key_aqui
```

### 3. Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
# Aplicación disponible en http://localhost:5173
```

### 4. Producción
```bash
# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

## 🎨 Diseño y UX

- **Background Image**: Hero section con imagen de fondo que incorpora tema esperanzador y elementos de la bandera colombiana, con espacio abierto adecuado para superposiciones de texto
- **Glass Morphism**: Diseño moderno con efectos de vidrio esmerilado
- **Colores Patrióticos**: Paleta basada en la bandera colombiana
- **Responsive**: Optimizado para móviles, tablets y desktop
- **Accesibilidad**: Cumple estándares WCAG para inclusión
- **Performance**: Carga rápida con code splitting automático

### Background Assets
La imagen de fondo principal se encuentra en `/public/colombia-background.svg` y presenta:
- Paisaje montañoso con cielo esperanzador
- Elementos sutiles de la bandera colombiana
- Área central despejada para contenido de texto
- Diseño optimizado para diferentes tamaños de pantalla

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción  
- `npm run preview` - Vista previa del build
- `npm run lint` - Linting con ESLint

## 🔧 Configuración

### Firebase Setup
1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Authentication y Analytics
3. Copiar configuración al archivo `.env`

### News API Setup
1. Registrarse en [NewsAPI.org](https://newsapi.org)
2. Obtener API key gratuita
3. Agregar `VITE_NEWS_API_KEY` al archivo `.env`

## 🤝 Contribución

¡Las contribuciones son bienvenidas! 

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🏆 Créditos

Desarrollado por la comunidad de Colombia-cyber para fomentar la participación cívica digital en Colombia.

---

**🇨🇴 Construyendo el futuro de Colombia juntos**