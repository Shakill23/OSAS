import { 
    getUsers, 
    getUserByID, 
    addUser, 
    deleteUser as removeUser, 
    updateUser as editUser, 
    encryptPassword,  
    loginUser 
} from '../Model/db.js';

import { generateJWT } from '../Middleware/verifyJwt.js'; 
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
    console.log('Controller: getAllUsers executed');
    try {
        const users = await getUsers(req.body.username);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAllUsers:', error.message);
        res.status(500).json({ msg: "Server error. Unable to retrieve users." });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await getUserByID(+req.params.userID);
        if (!user) {
            return res.status(404).json({ msg: "User not found with the provided userID" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Server error. Unable to retrieve user." });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, emailAdd, passw, userRole, profileURL } = req.body;

        const encryptedPassword = await encryptPassword(passw);
        await addUser({ 
            username, 
            emailAdd, 
            passw: encryptedPassword, 
            userRole, 
            profileURL 
        });

        const token = generateJWT({ username, emailAdd, userRole }); 
        res.status(201).json({ msg: 'Registration successful', token });
    } catch (error) {
        console.error('Error during user registration:', error.message);
        res.status(500).json({ msg: "Unable to register user. Please try again later." });
    }
};

const updateUser = async (req, res) => {
    try {
        const { username, emailAdd, password, userRole } = req.body;
        const userID = +req.params.userID; 
        
        console.log('Update request for userID:', userID); 

        const user = await getUserByID(userID);
        if (!user) {
            console.log('User not found with userID:', userID); 
            return res.status(404).json({ msg: "User not found with the provided userID" });
        }

        const updatedUser = {
            username: username || user.username,
            emailAdd: emailAdd || user.emailAdd,
            passw: password ? await encryptPassword(password) : user.passw,
            userRole: userRole || user.userRole,
        };

        console.log('Updated user data:', updatedUser); 

        await editUser(updatedUser.username, updatedUser.emailAdd, updatedUser.passw, updatedUser.userRole, user.profileURL, userID);
        res.status(200).json({ msg: 'User successfully updated' });
    } catch (error) {
        console.error('Error during user update:', error.message);
        res.status(500).json({ msg: "Unable to update user. Please try again later." });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await getUserByID(+req.params.userID);
        if (!user) {
            return res.status(404).json({ msg: "User not found with the provided userID" });
        }

        await removeUser(+req.params.userID);
        res.status(200).json({ msg: 'User successfully deleted' });
    } catch (error) {
        res.status(500).json({ msg: "Unable to delete user. Please try again later." });
    }
};

const loginUserController = async (req, res) => {
    try {
        const { emailAdd, passw } = req.body;
        const user = await loginUser(emailAdd, passw);
        if (!user) {
            return res.status(403).json({ msg: "Invalid email or password" });
        }

        console.log("User object from loginUser:", user);

        const token = generateJWT({ userID: user.userID, emailAdd: user.emailAdd, userRole: user.userRole });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ msg: "Login failed. Please try again later." });
    }
};

export {
    getAllUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUserController
};
