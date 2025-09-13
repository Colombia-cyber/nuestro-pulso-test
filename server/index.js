import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const NEWS_TOPICS_FILE = path.join(DATA_DIR, 'news-topics.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(NEWS_TOPICS_FILE)) {
  fs.writeFileSync(NEWS_TOPICS_FILE, JSON.stringify([], null, 2));
}

// Helper functions
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
const writeUsers = (users) => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
const readNewsTopics = () => JSON.parse(fs.readFileSync(NEWS_TOPICS_FILE, 'utf8'));
const writeNewsTopics = (topics) => fs.writeFileSync(NEWS_TOPICS_FILE, JSON.stringify(topics, null, 2));
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// News Topics Routes

// POST /news/topics - Create a new news topic
app.post('/news/topics', async (req, res) => {
  try {
    const { title, description, authorId } = req.body;
    
    // Validate required fields
    if (!title || !description || !authorId) {
      return res.status(400).json({
        error: 'Missing required fields: title, description, and authorId are required'
      });
    }

    const users = readUsers();
    const user = users.find(u => u.id === authorId);

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // Create the news topic
    const newsTopic = {
      id: generateId(),
      title,
      description,
      authorId,
      createdAt: new Date().toISOString(),
      author: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    const topics = readNewsTopics();
    topics.push(newsTopic);
    writeNewsTopics(topics);

    res.status(201).json(newsTopic);
  } catch (error) {
    console.error('Error creating news topic:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// GET /news/topics - List all news topics
app.get('/news/topics', async (req, res) => {
  try {
    const topics = readNewsTopics();
    const users = readUsers();
    
    // Enrich topics with author information
    const enrichedTopics = topics.map(topic => {
      const author = users.find(u => u.id === topic.authorId);
      return {
        ...topic,
        author: author ? {
          id: author.id,
          name: author.name,
          email: author.email
        } : null
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(enrichedTopics);
  } catch (error) {
    console.error('Error fetching news topics:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Helper route to create a test user (for development)
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    const users = readUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email already exists'
      });
    }

    const user = {
      id: generateId(),
      name,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(user);
    writeUsers(users);

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Get all users (for development)
app.get('/users', async (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Data directory: ${DATA_DIR}`);
});

export default app;