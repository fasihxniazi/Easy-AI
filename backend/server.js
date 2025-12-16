import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './configs/cloudinary.js';

const app = express();

// ===== Connect to Cloudinary =====
connectCloudinary();

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== Clerk Middleware =====
app.use(clerkMiddleware());

// ===== Health Check Route (required by Elastic Beanstalk) =====
app.get('/health', (req, res) => res.status(200).send('OK'));

// ===== Root Route =====
app.get('/', (req, res) => res.send('Server is Live!'));

// ===== Protected Routes =====
app.use('/api/ai', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);

// ===== Error Handling Middleware =====
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});