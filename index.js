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
const PORT = process.env.MYSQL_ADDON_PORT || 3023;

app.use(express.static('./Static'));

app.use(cors({
    origin: 'https://w-commerce-4c78f.web.app',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.post('/login', authenticate, (req, res) => { 
});

app.delete('/logout', (req, res) => {
    res.clearCookie('jwt')
    res.json({
        msg : 'logged out successfully'
    });
});

app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/users', userRoute);

app.listen(PORT, console.log(`server running on http://localhost:${PORT}`));

