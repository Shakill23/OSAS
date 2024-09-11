import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productsRoute from './Routes/productsRoute.js';
import cartRoute from './Routes/cartRoute.js';
import verifyJwt from './Middleware/verifyJwt.js'
import userRoute from './Routes/userRoute.js';
import authenticate from './Middleware/signToken.js';

const app = express();
const PORT = process.env.MYSQL_ADDON_PORT || 2303;

// Static files
app.use(express.static('./Static'));

// Enable CORS with credentials
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

// Handle preflight (OPTIONS) requests for all routes
app.options('*', cors());

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Add CORS headers to every response (just to be extra sure)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Login route with CORS handling
app.post('/login', cors(), authenticate, (req, res) => { 
    // login logic goes here
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
