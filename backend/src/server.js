import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);

// make ready for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})