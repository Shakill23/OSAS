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
                msg: "Unable to delete a user that does not exist"
            })
        }

    }, 
    editUserByID : async (req, res) => {

        try {

            let { username, userEmail, userPass, userRole, userImg } = req.body;

            const [user] = await getUserByID(+req.params.id)
    
            username ? username : { username } = user
    
            userEmail ? userEmail : { userEmail } = user
    
            userPass ? userPass : { userPass } = user
    
            userRole ? userRole : { userRole } = user
    
            userImg ? userRole : { userRole } = user
    
            await editUser(username, userEmail, userPass, userRole, userImg, +req.params.id);
    
            res.send(await getUsers())

        } catch (error) {
            res.status(404).json({
                msg: "Unable to upadate a user that does not exist"
            })
        }

    }
}