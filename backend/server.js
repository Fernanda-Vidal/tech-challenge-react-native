import express from 'express';
import cors from 'cors';
import postRoute from './src/routes/post.router.js';
import userRoute from './src/routes/user.router.js';
import authRoute from './src/routes/auth.router.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;
// const port = 3030;

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/post', postRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something is broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});