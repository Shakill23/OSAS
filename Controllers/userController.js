import { getUsers, getUserByID, addUser, deleteUser, editUser, checkRoleStatus, checkProfile, encryptPassword, generateJWT } from '../Model/db.js';

export default {
    getAllUsers: async (req, res) => {
        try {
            if (await checkRoleStatus(req.user.userRole) !== 'admin') {
                return res.status(403).json({ msg: "Unauthorized access" });
            }
            const users = await getUsers(req.body.username);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                msg: "Server error. Unable to retrieve users."
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const userProfile = await checkProfile(req.user.emailAdd);
            if (!userProfile) {
                return res.status(404).json({ msg: "User not found" });
            }
            const user = await getUserByID(+req.params.id);
            if (!user) {
                return res.status(404).json({ msg: "User not found with the provided ID" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                msg: "Server error. Unable to retrieve user."
            });
        }
    },
    addNewUser: async (req, res) => {
        try {
            const { passw } = req.body;
            const encryptedPass = await encryptPassword(passw);
            req.body.passw = encryptedPass;
            
            await addUser(req.body);
            const token = generateJWT(req.body);
            res.status(201).json({ token, msg: "User registered successfully" });
        } catch (error) {
            res.status(400).json({
                msg: "Invalid input data. Ensure all required fields are filled out."
            });
        }
    },
    deleteUserByID: async (req, res) => {
        try {
            if (await checkRoleStatus(req.user.userRole) !== 'admin') {
                return res.status(403).json({ msg: "Unauthorized access" });
            }
            const user = await getUserByID(+req.params.id);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            await deleteUser(+req.params.id);
            res.status(200).json({ msg: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({
                msg: "Server error. Unable to delete user."
            });
        }
    },
    editUserByID: async (req, res) => {
        try {
            let { username, emailAdd, passw, userRole, profileURL } = req.body;
            const user = await getUserByID(+req.params.id);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
    
            username = username || user.username;
            emailAdd = emailAdd || user.emailAdd;
            passw = passw ? await encryptPassword(passw) : user.passw;
            userRole = userRole || user.userRole;
            profileURL = profileURL || user.profileURL;
    
            await editUser(username, emailAdd, passw, userRole, profileURL, +req.params.id);
            res.status(200).json({ msg: "User updated successfully" });
        } catch (error) {
            res.status(500).json({
                msg: "Server error. Unable to update user."
            });
        }
    }
}
