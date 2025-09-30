import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import searchRoutes from './routes/search.js';
import colombiaHubRoutes from './routes/colombia-hub.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced environment validation with better error messages
const requiredEnvVars = {
  FRONTEND_URL: process.env.FRONTEND_URL,
};

const optionalEnvVars = {
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  VITE_NEWSAPI_KEY: process.env.VITE_NEWSAPI_KEY,
  VITE_GUARDIAN_KEY: process.env.VITE_GUARDIAN_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

// Validate required environment variables
const missingRequiredVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingRequiredVars.length > 0) {
  console.error(`
❌ Server Configuration Error:
Missing required environment variables: ${missingRequiredVars.join(', ')}

Please check your .env file and ensure these variables are set:
${missingRequiredVars.map(key => `- ${key}`).join('\n')}
  `);
  throw new Error('Missing required environment variables');
}

// Warn about missing optional variables
const missingOptionalVars = Object.entries(optionalEnvVars)
  .filter(([key, value]) => !value && key !== 'NODE_ENV')
  .map(([key]) => key);

if (missingOptionalVars.length > 0) {
  console.warn(`
⚠️  Server Configuration Warning:
Missing optional environment variables: ${missingOptionalVars.join(', ')}

Some features may be limited without these variables:
${missingOptionalVars.map(key => `- ${key}: Required for API integrations`).join('\n')}
  `);
}

console.log(`
🚀 Server Configuration:
- Environment: ${optionalEnvVars.NODE_ENV}
- Frontend URL: ${requiredEnvVars.FRONTEND_URL}
- YouTube API: ${optionalEnvVars.YOUTUBE_API_KEY ? '✅ Configured' : '❌ Missing'}
- News API: ${optionalEnvVars.VITE_NEWSAPI_KEY ? '✅ Configured' : '❌ Missing'}
- Guardian API: ${optionalEnvVars.VITE_GUARDIAN_KEY ? '✅ Configured' : '❌ Missing'}
`);

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/search', searchRoutes);
app.use('/api/colombia-hub', colombiaHubRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), service: 'nuestro-pulso-search-api', version: '1.0.0' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Search API server running on port ${PORT}`);
  console.log(`📡 Health check available at http://localhost:${PORT}/api/health`);
  console.log(`🔍 Search endpoint available at http://localhost:${PORT}/api/search`);
});

export default app;