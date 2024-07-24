const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('pg');
const authRoutes = require('./routes/authRoutes');
const brandRoutes = require('./routes/brandRoutes');
const golfCourseRoutes = require('./routes/golfCourseRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Database connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Database connection error', err.stack));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/golfcourses', golfCourseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
