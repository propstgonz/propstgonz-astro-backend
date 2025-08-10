import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middlewares/errorHandler';

import postsRoutes from './routes/postsRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRoutes);

app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const prisma = new PrismaClient();

app.get('/ping-db', async (_req, res) => {
  try {
    const count = await prisma.blogpost.count();
    res.send(`MongoDB connected, posts collection has ${count} documents.`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    res.status(500).send('Database connection failed');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});