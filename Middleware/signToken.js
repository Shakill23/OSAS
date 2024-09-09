import bcrypt from 'bcrypt';
import { generateJWT } from './verifyJwt.js'; // Ensure correct import
import jwt from 'jsonwebtoken';
import { checkUser, checkProfile } from '../Model/db.js'; // Assuming these functions are defined

const authenticate = async (req, res, next) => {
    const { emailAdd, passw } = req.body;

    console.log("Starting authentication process...");

    try {
        const hashedPassw = await checkUser(emailAdd);
        console.log(`Fetched hashed password for ${emailAdd}: ${hashedPassw}`);

        if (!hashedPassw) {
            console.log("User not found.");
            return res.status(401).send({ msg: 'User not found' });
        }

        const validUserIsLoggedIn = await checkProfile(emailAdd);
        console.log("User profile details:", validUserIsLoggedIn);

        const result = await bcrypt.compare(passw, hashedPassw);
        console.log(`Password comparison result for ${emailAdd}: ${result}`);

        if (result) {
            const userRole = validUserIsLoggedIn.userRole;
            const userID = validUserIsLoggedIn.userID;
            const username = validUserIsLoggedIn.username;

            if (!userID) {
                console.log("UserID is missing in user profile");
                return res.status(400).send({ msg: "UserID is missing in user profile" });
            }

            console.log("Generating JWT with userID:", userID);
            const token = generateJWT({ emailAdd, userRole, userID }); // Generate JWT with userID
            const refreshToken = jwt.sign({ emailAdd, userRole, userID }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

            console.log(`Generated JWT for ${emailAdd}:`, token);
            console.log(`Generated refresh token for ${emailAdd}:`, refreshToken);

            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 86400000 });

            return res.send({
                token,
                refreshToken,
                role: userRole,
                email: emailAdd,
                name: username,
                isLogged: validUserIsLoggedIn,
                msg: 'You are logged in'
            });
        } else {
            console.log("Password does not match.");
            return res.status(401).send({ msg: 'Password does not match' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).send({ msg: 'Internal server error' });
    }
};

export default authenticate;
