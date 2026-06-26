import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getApiBaseUrl } from './config';
import { createApiRouter } from './routes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl: getApiBaseUrl() });
});

app.use('/api', createApiRouter());

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`MongoDB connected to ${MONGODB_URI}`);
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});
