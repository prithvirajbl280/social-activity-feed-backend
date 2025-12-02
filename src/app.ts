import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import activityRoutes from './routes/activityRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;
