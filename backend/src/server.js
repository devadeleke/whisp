import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import dns from 'dns';

import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();
// Set custom DNS servers to avoid potential DNS resolution issues (force Node.js itself to use Google’s DNS servers instead of the system’s default)
dns.setServers(['8.8.8.8', '8.8.4.4']);

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
    connectDB()
})