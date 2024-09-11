import { config } from 'dotenv';
config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { checkUser, checkProfile } from '../Model/db.js';


const authenticate = async (req, res, next) => {

    const {username, emailAdd, passw, userRole, profileURL} = req.body;

    try {
        const hashedpwd = await checkUser(emailAdd, userRole);

        const validUserIsLoggedIn = await checkProfile(emailAdd);

        bcrypt.compare(passw, hashedpwd, (err, result) => {
            
            if (err) throw err
    
            if(result === true){
    
                const {emailAdd, userRole} = req.body;
    
                const token = jwt.sign({emailAdd:emailAdd, userRole: userRole}, process.env.SECRET_KEY, {expiresIn: '1h'});
                const refreshToken = jwt.sign({ emailAdd: emailAdd, userRole: userRole }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });
    
                res.cookie('jwt', token, {httpOnly: false, expiresIn: '1h'});
                res.cookie('refreshToken', refreshToken, { httpOnly: false, expiresIn: '1d' });

                res.send({
                    token: token,
                    refreshToken: refreshToken,
                    role: userRole,
                    email: emailAdd,
                    name: username,
                    isLogged: validUserIsLoggedIn,
                    msg: 'you logged in'
                })
    
                next(); 
    
            } else {
    
                res.send({
    
                    res: res.statusCode,
                    msg : 'the password does not match'
    
                });
    
            } 
        });
    } catch (error) {

        console.error('Error during authentication:', error);
        res.status(500).send({ msg: 'Internal server error' });
        
    }
}

export default authenticate;