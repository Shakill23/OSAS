import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productsRoute from './Routes/productsRoute.js';
import cartRoute from './Routes/cartRoute.js';
import verifyJwt from './Middleware/verifyJwt.js';
import userRoute from './Routes/userRoute.js';
import authenticate from './Middleware/signToken.js';

const app = express();
const PORT = process.env.MYSQL_ADDON_PORT || 2303;

// Static files
app.use(express.static('./Static'));

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Enable CORS
app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests for all routes
app.options('*', cors(corsOptions));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Add CORS headers to every response as fallback
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Login route
app.post('/login', authenticate, (req, res) => {
    // Your login logic
    res.json({ message: "Logged in" });
});

// Logout route
app.delete('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({
        msg: 'logged out successfully'
    });
});

// Route handlers
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/users', userRoute);

// Start the server
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
