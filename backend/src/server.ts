import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Route imports
import newsTopicsRoutes from './routes/newsTopics.js';
import pulseFeedRoutes from './routes/pulseFeed.js';
import reelsRoutes from './routes/reels.js';
import searchRoutes from './routes/search.js';
import usersRoutes from './routes/users.js';
import { incidentsRouter, alertsRouter, congressRouter, electionsRouter, pollsRouter, marketplaceRouter, civicAssistantRouter } from './routes/incidents.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Nuestro Pulso API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
app.use('/api/news-topics', newsTopicsRoutes);
app.use('/api/pulse-feed', pulseFeedRoutes);
app.use('/api/reels', reelsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/incidents', incidentsRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/congress', congressRouter);
app.use('/api/elections', electionsRouter);
app.use('/api/polls', pollsRouter);
app.use('/api/marketplace', marketplaceRouter);
app.use('/api/civic-assistant', civicAssistantRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: [
      '/health',
      '/api/news-topics',
      '/api/pulse-feed',
      '/api/reels',
      '/api/search',
      '/api/users',
      '/api/incidents',
      '/api/alerts',
      '/api/congress',
      '/api/elections',
      '/api/polls',
      '/api/marketplace',
      '/api/civic-assistant',
    ],
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  
  const isDev = process.env.NODE_ENV !== 'production';
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(isDev && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🇨🇴 Nuestro Pulso API server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app;