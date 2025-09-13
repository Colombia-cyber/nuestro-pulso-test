# Nuestro Pulso - Red Cívica de Colombia

🇨🇴 **La plataforma líder de participación cívica en Colombia**

Una aplicación web moderna construida con React, Vite, TypeScript y Tailwind CSS que permite a los ciudadanos colombianos participar en debates, encuestas, chat en vivo y seguir la actividad política nacional.

## 🚀 Características Principales

### 🏠 **Landing Page Responsiva**
- Hero section con bandera colombiana y tema "Futuro"
- Estadísticas de participación ciudadana en tiempo real
- Call-to-action para registro y participación
- Diseño móvil-first con utilidades de Tailwind CSS

### 📊 **Dashboard de Participación Cívica**
- **💬 Chat en Vivo**: Salas de conversación por temas (Política, Educación, Salud, etc.)
- **📰 Noticias Verificadas**: Feed de noticias con categorización y trending topics
- **📜 Seguimiento Legislativo**: Monitor de proyectos de ley y proceso legislativo
- **🏛️ Monitor del Congreso**: Actividad de congresistas y métricas de rendimiento
- **📊 Encuestas Ciudadanas**: Votaciones en tiempo real con resultados visuales
- **📈 Analíticas Públicas**: Datos y tendencias de participación por región

### 🎨 **Tema Colombiano**
- Paleta de colores de la bandera (amarillo, azul, rojo)
- Iconografía patriótica (águila, bandera, símbolos nacionales)
- Fondo "Futuro" con paisajes colombianos
- Elementos visuales representativos

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS con diseño mobile-first
- **Routing**: React Router v6 para navegación SPA
- **Iconos**: React Icons (Feather Icons)
- **Backend**: Firebase (Auth, Analytics)
- **Build**: Vite con optimizaciones de producción
- **Linting**: ESLint + TypeScript

## 📁 Estructura del Proyecto

```
src/
├── assets/
│   └── images/
│       ├── colombia-flag.svg
│       ├── colombia-eagle.svg
│       └── futuro-background.svg
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── [otros componentes globales]
├── features/
│   ├── news/
│   │   └── NewsCard.tsx
│   ├── polls/
│   │   └── PollCard.tsx
│   ├── congress/
│   ├── legislation/
│   ├── analytics/
│   └── chat/
├── pages/
│   ├── HomePage.tsx
│   ├── ChatPage.tsx
│   ├── NewsPage.tsx
│   ├── LegislationPage.tsx
│   ├── CongressPage.tsx
│   ├── PollsPage.tsx
│   └── AnalyticsPage.tsx
├── context/
│   └── CivicEngagementContext.tsx
├── hooks/
│   └── index.ts
├── utils/
│   └── index.ts
└── App.jsx
```

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

## 🎯 Rutas de Navegación

- `/` - Landing page principal con hero y features
- `/chat` - Salas de chat en tiempo real por temas
- `/news` - Noticias verificadas con categorización
- `/legislation` - Seguimiento de proyectos de ley
- `/congress` - Monitor de actividad del congreso
- `/polls` - Encuestas ciudadanas activas
- `/analytics` - Dashboard de analíticas públicas

## 🧪 Testing

### Testing Manual
1. **Landing Page**: Verificar hero section, stats, y call-to-action
2. **Navegación**: Probar todas las rutas y navegación móvil
3. **Responsive**: Validar diseño en móvil, tablet y desktop
4. **Interacciones**: Probar encuestas, chat, y filtros de noticias
5. **Performance**: Verificar tiempos de carga y optimizaciones

### Comandos de Testing
```bash
# Verificar build sin errores
npm run build

# Linting de código
npm run lint

# Validar TypeScript
npx tsc --noEmit

# Servidor de desarrollo para testing manual
npm run dev
```

## 🎨 Diseño y UX

- **Mobile-First**: Diseño responsivo que prioriza experiencia móvil
- **Colores Patrióticos**: Paleta basada en la bandera colombiana (FFD700, 0033CC, CC0000)
- **Glassmorphism**: Efectos de vidrio esmerilado para modernidad
- **Accesibilidad**: Contrastes adecuados y navegación por teclado
- **Performance**: Lazy loading y code splitting automático

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con hot reload
- `npm run build` - Build optimizado para producción  
- `npm run preview` - Vista previa del build de producción
- `npm run lint` - Linting con ESLint y TypeScript

## 🔧 Configuración Avanzada

### Firebase Setup
1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Authentication y Analytics
3. Configurar dominio en Auth settings
4. Copiar configuración al archivo `.env`

### Vercel Deployment
El proyecto está configurado para despliegue automático en Vercel:
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: 18.x

## 🤝 Contribución

¡Las contribuciones son bienvenidas! 

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Seguir estructura de carpetas establecida
4. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
5. Push a la rama (`git push origin feature/nueva-funcionalidad`)
6. Abrir Pull Request

### Estándares de Código
- Usar TypeScript para todos los componentes nuevos
- Seguir convenciones de nombres establecidas
- Componentes funcionales con hooks
- Clases de Tailwind CSS para styling
- Props tipadas con interfaces

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🏆 Créditos

Desarrollado por la comunidad de Colombia-cyber para fomentar la participación cívica digital en Colombia.

---

**🇨🇴 Construyendo el futuro de Colombia juntos**