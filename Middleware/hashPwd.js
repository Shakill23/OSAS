import bcrypt from 'bcrypt';

import { addUser } from '../Model/db.js';



const onHashBefore = (req, res, next) => {

    const {username, userEmail, userPass, userRole, userImg} = req.body;

    bcrypt.hash(userPass, 10, async (err, hashPwd) => {

        if (err) throw err
        
        await addUser(username, userEmail, hashPwd, userRole, userImg);
        
        console.log(`hello ${username}`);
        
        next();
    });
}
 
export default onHashBefore;