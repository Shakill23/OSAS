import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { checkUser, checkProfile } from '../Model/db.js';

const authenticate = async (req, res, next) => {
    const { username, emailAdd, passw, userRole } = req.body;

    try {
        const hashedPwd = await checkUser(emailAdd, userRole);
        const validUserIsLoggedIn = await checkProfile(emailAdd);

        if (!process.env.SECRET_KEY || !process.env.REFRESH_TOKEN) {
            throw new Error('SECRET_KEY or REFRESH_TOKEN not defined in environment variables');
        }

        bcrypt.compare(passw, hashedPwd, (err, result) => {
            if (err) throw err;

            if (result === true) {
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

                // Set the cookies with the tokens
                res.cookie('jwt', token, { httpOnly: false, maxAge: 3600000 });  // 1 hour
                res.cookie('refreshToken', refreshToken, { httpOnly: false, maxAge: 86400000 });  // 1 day

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
                res.status(401).send({
                    msg: 'The password does not match'
                });
            }
        });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send({ msg: 'Internal server error' });
    }
};

export default authenticate;
