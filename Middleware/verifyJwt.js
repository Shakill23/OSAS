import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    const { cookie } = req.headers;

    if (!process.env.SECRET_KEY || !process.env.REFRESH_TOKEN) {
        return res.status(500).send({ msg: 'SECRET_KEY or REFRESH_TOKEN not defined' });
    }

    let tokenInHeader = cookie && cookie.split('=')[1];

    if (!tokenInHeader) {
        return res.status(401).send({ msg: "No valid token" });
    }

    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                const refreshToken = req.headers['refresh-token'];

                if (refreshToken) {
                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
                        if (err) {
                            return res.status(403).json({ error: 'Invalid refresh token' });
                        } else {
                            const newToken = jwt.sign(
                                { emailAdd: decoded.emailAdd, userRole: decoded.userRole },
                                process.env.SECRET_KEY,
                                { expiresIn: '1h' }
                            );

                            res.setHeader('Authorization', newToken);
                            next();
                        }
                    });
                } else {
                    return res.status(403).json({ error: 'Refresh token not found' });
                }
            } else {
                return res.status(403).json({ error: 'Invalid token' });
            }
        } else {
            req.emailAdd = user.emailAdd;
            req.userRole = user.userRole;
            next();
        }
    });
};

export default auth;
