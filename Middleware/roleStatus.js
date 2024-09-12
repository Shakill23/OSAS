import { checkRoleStatus } from "../Model/db.js";

const isRoleEquiqToAdmin = async (req, res, next) => {

    // checks the user role in the body
    const {username, userEmail, userPass, userRole, userImage} = req.body;

    // function checking the role status
    const role = await checkRoleStatus(userRole);

    if(role == 'admin'){

        next();

    } else {

        res.sendStatus(403);

    }
} 

export default isRoleEquiqToAdmin;