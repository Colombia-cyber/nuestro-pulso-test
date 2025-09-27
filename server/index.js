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

// Fail fast if required env variables are missing
if (!process.env.FRONTEND_URL) {
  throw new Error('Missing FRONTEND_URL in environment!');
}
if (!process.env.YOUTUBE_API_KEY) {
  console.warn('Warning: YOUTUBE_API_KEY is missing. YouTube features will be disabled.');
}

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