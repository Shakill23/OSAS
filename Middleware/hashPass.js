import bcrypt from 'bcrypt';

import { addUser } from '../Model/db.js';



const onHashBefore = (req, res, next) => {

    const {username, emailAdd, passw, userRole, profileURL} = req.body;

    bcrypt.hash(passw, 10, async (err, hashPwd) => {

        if (err) throw err
        
        await addUser(username, emailAdd, hashPwd, userRole, profileURL);
        
        console.log(`hello ${username}`);
        
        next();
    });
}
 
export default onHashBefore;