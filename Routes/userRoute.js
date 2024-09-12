import express from 'express';
import controller from '../Controllers/userController.js';
import onHashBefore from '../Middleware/hashPwd.js';
import isRoleEquiqToAdmin from '../Middleware/roleStatus.js';

const router = express.Router();

// Get all users, add new user
router.route('/') 
    .get(controller.getAllUSers)
    .post(onHashBefore, controller.addNewUser); // Ensure password hashing is only done for POST

// Get, delete, and edit specific user by ID
router.route('/:id')
    .get(controller.getUser)
    .delete(controller.deleteUserByID)
    .patch(onHashBefore, controller.editUserByID); // Apply password hashing only if password is being changed

export default router;
