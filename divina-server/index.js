require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const seedDatabase = require('./utils/seedDatabase');

const app = express();

const parseOrigins = (value = '') =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const ensureDatabase = async (req, res, next) => {
  try {
    await connectDB();
    return next();
  } catch (error) {
    return res.status(503).json({
      message: 'Database connection failed',
      error: error.message,
    });
  }
};

if (process.env.NODE_ENV === 'development') {
  connectDB().then(() => {
    seedDatabase();
  });
}

app.use(express.json());

// Manual CORS headers middleware - works better with Vercel serverless
app.use((req, res, next) => {
  const allowedOrigins = [
    ...parseOrigins(process.env.CLIENT_URL),
    'https://divina-webprog2.vercel.app',
    'https://helping-seb.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Divina API is running' });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Divina API is running' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/health/db', async (req, res) => {
  try {
    const conn = await connectDB();
    res.status(200).json({ status: 'ok', host: conn.connection.host });
  } catch (error) {
    res.status(503).json({ status: 'error', message: error.message });
  }
});

app.use('/api/users', ensureDatabase, userRoutes);
app.use('/api/articles', ensureDatabase, articleRoutes);
app.use('/users', ensureDatabase, userRoutes);
app.use('/articles', ensureDatabase, articleRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 8000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
