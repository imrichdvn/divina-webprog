const mongoose = require('mongoose');

// Global cached connection for Vercel serverless functions
let cachedConnection = null;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in your .env file.');
  }

  // Return cached connection if available
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Cache the connection for reuse
    cachedConnection = conn;
    
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;