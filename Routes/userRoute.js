import express from 'express';
import controller from '../Controllers/userController.js';
import onHashBefore from '../Middleware/hashPass.js';
import isRoleEquiqToAdmin from '../Middleware/roleStatus.js';
import authenticateUser from '../Middleware/authenticate.js'; // Middleware for user authentication

const router = express.Router();

// Root route to display API usage information
router.get('/', (req, res) => {
    res.send({
        message: "Welcome to the User Management API. Use the following routes:",
        routes: {
            getAllUsers: "GET /users - Retrieve all users",
            getUser: "GET /user/:id - Retrieve a user by ID",
            register: "POST /register - Register a new user",
            login: "POST /login - Log in as an existing user",
            editUser: "PATCH /user/:id - Update user information",
            deleteUser: "DELETE /user/:id - Delete a user by ID"
        }
    });
});

// Route to get all users (no authentication required)
router.route('/users')
    .get(controller.getAllUsers);

// Route for user registration (includes password hashing)
router.post('/register', onHashBefore, controller.registerUser);

// Route for user login (authentication with JWT)
router.post('/login', controller.loginUser);

// Routes for individual user operations
router.route('/user/:id')
    .get(authenticateUser, controller.getUser) // Require authentication
    .patch(authenticateUser, onHashBefore, controller.editUserByID) // Require authentication and hash password if present
    .delete(authenticateUser, isRoleEquiqToAdmin, controller.deleteUserByID); // Require admin role to delete users

export default router;
