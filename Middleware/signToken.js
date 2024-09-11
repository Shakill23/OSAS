import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { checkUser, checkProfile } from '../Model/db.js';

const authenticate = async (req, res, next) => {
    const { username, emailAdd, passw, userRole } = req.body;

    try {
        const hashedPwd = await checkUser(emailAdd, userRole);  // Fetch hashed password
        const validUserIsLoggedIn = await checkProfile(emailAdd);  // Verify user profile

        if (!hashedPwd) {
            return res.status(404).send({ msg: 'User not found' });
        }

        if (!process.env.SECRET_KEY || !process.env.REFRESH_TOKEN) {
            throw new Error('SECRET_KEY or REFRESH_TOKEN not defined in environment variables');
        }

        const match = await bcrypt.compare(passw, hashedPwd);  // Compare password
        if (match) {
            const token = jwt.sign(
                { emailAdd, userRole },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );

            const refreshToken = jwt.sign(
                { emailAdd, userRole },
                process.env.REFRESH_TOKEN,
                { expiresIn: '1d' }
            );

            // Set cookies with tokens
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });  // 1 hour
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 86400000 });  // 1 day

            res.send({
                token,
                refreshToken,
                role: userRole,
                email: emailAdd,
                name: username,
                isLogged: validUserIsLoggedIn,
                msg: 'You logged in successfully'
            });

            next();
        } else {
            res.status(401).send({ msg: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send({ msg: 'Internal server error' });
    }
};

export default authenticate;
