import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken'
 
const auth = async (req, res, next) => {  
    let { cookie } = req.headers;
    
    const refreshTokens = {}
    
    let tokenInHeader = cookie && cookie.split('=')[1];
    
    if (tokenInHeader === undefined) {

        return res.status(401).send({ msg: "No valid token" });
        
    }

    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user) => {

        if (err) {

            if (err.name === 'TokenExpiredError') {
 
                const refreshToken = req.headers['REFRESH_TOKEN'];

                if (refreshToken && refreshTokens[refreshToken]) {

                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {

                        if (err) {

                            return res.status(403).json({ error: 'Invalid Token' });

                        } else {
                            
                            const newToken = jwt.sign({ userEmail: decoded.userEmail }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });

                            res.setHeader('Authorization', newToken);
                            
                            next();

                        }
                    });

                }
            } else {

                return res.status(403).json({ error: 'Invalid Token' });

            }
        }
        req.userEmail = user;
        next();
    });
};

export default auth;

