import { getUsers, getUserByID, addUser, deleteUser, editUser } from '../Model/db.js'

export default {
    getAllUSers : async (req, res) => {
        try {
            res.send(await getUsers(req.body.username));
        } catch (error) {
            res.status(404).json({
                msg: "Route does not exist or server is down!"
            })
        }
    },
    getUser : async (req, res) => {
        try {
            res.send(await getUserByID(+req.params.id))
        } catch (error) {
            res.status(404).json({
                msg: "Unable to get a user that does not exist"
            })
        }
    },
    addNewUser : async (req, res) => {

        try {

            res.send(await getUsers());

        } catch (error) {
            res.status(404).json({
                msg: "Make sure all inputs are filled out"
            })
        }
    },
    deleteUserByID : async (req, res) => {

        try {

            await deleteUser(+req.params.id)

            res.send(await getUsers())

        } catch (error) {
            res.status(404).json({
                msg: "Unable to delete user that does not exist"
            })
        }

    }, 
    editUserByID : async (req, res) => {

        try {

            let { username, emailAdd, passw, userRole, profileURL } = req.body;

            const [user] = await getUserByID(+req.params.id)
    
            username ? username : { username } = user
    
            emailAdd ? emailAdd : { emailAdd } = user
    
            passw ? passw : { passw } = user
    
            userRole ? userRole : { userRole } = user
    
            profileURL ? userRole : { userRole } = user
    
            await editUser(username, emailAdd, passw, userRole, profileURL, +req.params.id);
    
            res.send(await getUsers())

        } catch (error) {
            res.status(404).json({
                msg: "Unable to upadate a user that does not exist"
            })
        }

    }
}