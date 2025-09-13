# 🇨🇴 Nuestro Pulso - Colombia's Civic Intelligence Platform

Nuestro Pulso is a comprehensive civic technology platform designed to enhance citizen participation and democratic engagement in Colombia. Built with modern web technologies, it provides a unified space for civic discourse, news consumption, government tracking, and community participation.

## ✨ Features

### 🌟 Core Modules
- **🏠 Inicio** - Personalized civic dashboard and feed
- **💬 Chat Cívico** - Real-time civic discussions and community engagement
- **🗣️ Debates** - Structured debates on national issues
- **📊 Encuestas** - Public opinion polls and surveys
- **📰 Noticias** - Civic news aggregation and analysis
- **🤝 Cuidado** - Health and wellness community support
- **🏛️ Congreso** - Congress activity tracking and bill monitoring
- **🎬 Pulse Reels** - Short-form civic education videos
- **🛒 Mercado** - Community marketplace and local services
- **🔍 Buscar** - Universal search across all content types
- **🔔 Alertas** - Civic alerts and emergency notifications
- **🗳️ Elecciones** - Election information and candidate tracking
- **🤖 Asistente IA** - AI-powered civic guidance and information

### 🎨 Design Features
- **Colombian Theme** - Inspired by Colombian flag colors and culture
- **Glassmorphism UI** - Modern glass-effect design elements
- **Mobile-First** - Responsive design optimized for all devices
- **Accessibility** - WCAG compliant with screen reader support
- **Dark/Light Mode** - Adaptive themes for user preference

### 🔧 Technical Features
- **Real-time Updates** - Live data sync across all modules
- **Offline Support** - Progressive Web App capabilities
- **Multi-language** - Spanish primary with English support
- **Voice Search** - Speech-to-text search functionality
- **Performance Optimized** - Fast loading and smooth interactions

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast development and building
- **Tailwind CSS** - Utility-first styling with custom Colombian theme
- **React Icons** - Comprehensive icon library

### Backend
- **Express.js** - Fast, minimalist web framework
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Robust relational database
- **Firebase** - Authentication and real-time features
- **TypeScript** - Full-stack type safety

### Infrastructure
- **Vercel/Netlify** - Deployment and hosting
- **GitHub Actions** - CI/CD pipelines
- **ESLint/Prettier** - Code quality and formatting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
   cd nuestro-pulso-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database setup (optional)**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Start backend server (separate terminal)**
   ```bash
   npm run server
   ```

The application will be available at `http://localhost:5173`

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start Express backend server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Testing
To run tests for the project, use the following command:
```bash
npm test
```

## 🤝 Contributing

We welcome contributions from the Colombian civic tech community!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**🇨🇴 Hecho con ❤️ en Colombia para el fortalecimiento de la democracia participativa**