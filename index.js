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
const PORT = process.env.MYSQL_ADDON_PORT || 3450;

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.static('./Static'));

app.options('*', cors(corsOptions));

//Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.post('/login', authenticate, (req, res) => {
    res.json({ message: 'Logged in Successfully!' });
});
app.delete('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({ msg: 'Logged out successfully' });
});
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/users', userRoute);

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));


