# 🇨🇴 Nuestro Pulso - Red Cívica de Colombia

![Nuestro Pulso Hero](https://github.com/user-attachments/assets/32523fd0-11ab-4551-9e2d-84befa32f772)

Una plataforma cívica moderna y profesional que conecta a los ciudadanos colombianos con la democracia a través de tecnología de vanguardia y diseño de clase mundial.

## ✨ Características Principales

### 🎨 Diseño de Clase Mundial
- **Glassmorphism** con efectos de transparencia y blur avanzados
- **Paleta Patriótica** con los colores oficiales de Colombia (amarillo, azul, rojo)
- **Mobile-First** completamente responsive desde móviles hasta desktop
- **Animaciones Fluidas** con transiciones suaves y micro-interacciones
- **Accesibilidad** diseñado para todos los usuarios

### 📱 Módulos Cívicos Completos

#### 💬 **Chat Cívico**
- Conversaciones en tiempo real moderadas
- Salas temáticas (Política, Medio Ambiente, Educación)
- 1,247+ ciudadanos activos

#### 📰 **Noticias Cívicas**
- Feed personalizable con fuentes verificadas
- Análisis de impacto cívico
- Filtros por categoría (Política, Economía, Social, Ambiente)
- Sistema de engagement (likes, compartir, comentarios)

#### 🗣️ **Debates Estructurados**
- Debates moderados sobre políticas públicas
- Sistema de votación y argumentación
- Seguimiento de propuestas ciudadanas

#### 📊 **Encuestas y Consultas**
- Encuestas ciudadanas con resultados en tiempo real
- Consultas sobre políticas públicas
- Dashboard de participación

#### 🏛️ **Seguimiento del Congreso**
- Tracking de proyectos de ley en tiempo real
- Información sobre representantes
- Alertas de votaciones importantes

#### 🗳️ **Centro Electoral**
- Información sobre elecciones
- Perfiles de candidatos
- Guías de votación

#### 🤖 **Asistente Cívico AI**
- Guía inteligente para participación ciudadana
- Respuestas sobre procesos democráticos
- Disponible 24/7

#### 📱 **Pulse Feed**
- Contenido cívico en formato corto
- Videos educativos sobre democracia
- Historias de impacto ciudadano

#### 🔔 **Sistema de Alertas**
- Notificaciones push personalizadas
- Alertas de eventos importantes
- Recordatorios de participación

#### 🛒 **Marketplace Cívico**
- Plataforma para iniciativas ciudadanas
- Proyectos comunitarios
- Financiación colaborativa

#### 🤝 **Red de Cuidado**
- Network de apoyo comunitario
- Recursos para ciudadanos
- Programas de asistencia

## 🚀 Tecnologías de Vanguardia

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS** con sistema de diseño personalizado
- **Vite 5** para desarrollo y build optimizados
- **PWA** completa con manifest colombiano

### Backend & Infraestructura
- **Firebase** Authentication, Firestore, Analytics
- **Vercel** deployment optimizado
- **GitHub Actions** CI/CD pipeline

### Design System
```css
/* Colores Patrióticos */
--colombian-yellow: #FCDC00
--colombian-blue: #003A70  
--colombian-red: #CE1126

/* Efectos Glassmorphism */
background: rgba(255, 255, 255, 0.25)
backdrop-filter: blur(10px)
border: 1px solid rgba(255, 255, 255, 0.2)
```

## 🛠️ Desarrollo Local

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Git

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
cd nuestro-pulso-test

# Instalación automática (incluye Firebase CLI)
bash setup.sh

# O instalación manual
npm install

# Desarrollo
npm run dev
# Abrir http://localhost:5173

# Build para producción
npm run build

# Preview de producción
npm run preview
```

### Variables de Entorno (Opcional)

Crea un archivo `.env` para configuración personalizada:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
```

## 🎯 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción  
npm run preview  # Preview del build
npm run lint     # Linting con ESLint
```

## 📱 PWA y Mobile

La aplicación es una **Progressive Web App** completa:

- ✅ Instalable en dispositivos móviles
- ✅ Funciona offline (próximamente)
- ✅ Notificaciones push (próximamente)
- ✅ Iconos optimizados para iOS/Android
- ✅ Tema colombiano en status bar

## 🎨 Capturas de Pantalla

### Hero Section Principal
![Hero Section](https://github.com/user-attachments/assets/32523fd0-11ab-4551-9e2d-84befa32f772)

### Chat Cívico en Vivo
![Chat Module](https://github.com/user-attachments/assets/d5e044a2-785d-4f3b-86b1-938c96cd8fba)

### Feed de Noticias
![News Module](https://github.com/user-attachments/assets/dc047bda-0a03-4788-a543-37c6638f59b7)

### Modal de Autenticación
![Login Modal](https://github.com/user-attachments/assets/01b6ccd3-ec66-443b-9657-70f01f3f470f)

## 🏗️ Arquitectura

```
src/
├── components/          # Componentes reutilizables
│   ├── HeroSection.tsx  # Hero principal con glassmorphism
│   ├── Navbar.tsx       # Navegación con dropdown
│   ├── ModuleGrid.tsx   # Grid de módulos interactivo
│   ├── LiveChat.tsx     # Chat en tiempo real
│   ├── News.tsx         # Feed de noticias
│   ├── LoginModal.tsx   # Modal de autenticación
│   └── ...              # Otros módulos
├── firebase.js          # Configuración Firebase
├── index.css           # Estilos globales + Colombian theme
└── App.tsx             # Router principal
```

## 🤝 Contribuir

1. Fork del repositorio
2. Crear branch feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📋 Roadmap

### Próximas Funcionalidades
- [ ] **Sistema de Badges** y gamificación ciudadana
- [ ] **Dashboard de Administración** completo
- [ ] **Notificaciones Push** en tiempo real
- [ ] **Modo Offline** con sincronización
- [ ] **Chat de Video** para debates en vivo
- [ ] **API Gubernamental** integración oficial
- [ ] **Análisis de Sentimiento** en debates
- [ ] **Blockchain** para votaciones verificables

### Integraciones Planificadas
- [ ] API del Congreso de Colombia
- [ ] Registraduría Nacional
- [ ] DANE (estadísticas oficiales)
- [ ] Alcaldías y gobernaciones
- [ ] Medios de comunicación verificados

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 🇨🇴 Sobre el Proyecto

**Nuestro Pulso** es una iniciativa para democratizar el acceso a la participación cívica en Colombia, utilizando tecnología moderna para conectar ciudadanos con sus representantes y facilitar el diálogo constructivo sobre el futuro del país.

### Misión
Empoderar a cada colombiano para participar activamente en la democracia a través de herramientas digitales accesibles, transparentes y seguras.

### Visión
Convertirse en la plataforma líder de participación cívica en América Latina, siendo referente mundial en tecnología democrática.

---

**Desarrollado con ❤️ para Colombia** 🇨🇴

![Colombian Flag](https://img.shields.io/badge/🇨🇴-Hecho_en_Colombia-yellow?style=for-the-badge&logo=data:image/svg+xml;base64,...)

[Reportar un Bug](https://github.com/Colombia-cyber/nuestro-pulso-test/issues) | [Solicitar Funcionalidad](https://github.com/Colombia-cyber/nuestro-pulso-test/issues) | [Documentación](https://docs.nuestropulso.co)