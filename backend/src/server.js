import express from 'express';
import path from 'path';
import dns from'node:dns';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';

import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js'

// Set custom DNS servers to avoid potential DNS resolution issues (force Node.js itself to use Google’s DNS servers instead of the system’s default)
// Only force custom DNS if the environment variable is explicitly set to 'true'
if (ENV.FORCE_CUSTOM_DNS === 'true') {
  dns.setServers(['1.1.1.1', '8.8.8.8']);
  console.log('Using custom DNS resolvers (Cloudflare  Google)');
} else {
  // By default, Node.js will use the OS resolver (recommended for VPCs/Cloud)
  console.log('Using default system DNS resolver');
}

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

//Add validation for CLIENT_URL to prevent CORS auth failures.
const CLIENT_ORIGIN = ENV.CLIENT_URL || "http://localhost:5173";

if (!ENV.CLIENT_URL && ENV.NODE_ENV === "production") {
  throw new Error("CLIENT_URL must be set in production for CORS.");
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: CLIENT_ORIGIN, credentials: true}))

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoute)

// make ready for production
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

// Cnnect to MONGODB before acceptin requests 
// (The server starts listening before connectDB() resolves, so early /api/auth/signup traffic can fail during startup.)
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();