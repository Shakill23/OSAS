import express from 'express';
import controller from '../Controllers/productController.js';
import authenticateUser from '../Middleware/authenticate.js'; // Middleware for user authentication

const router = express.Router();

// Protect all routes under '/items' with authentication middleware
router.use(authenticateUser);

router.route('/')
    .get(controller.allProducts) // Get all products (requires authentication)
    .post(controller.addProductToDB) // Add new product (requires authentication)

router.route('/:id')
    .get(controller.prodByID) // Get product by ID (requires authentication)
    .delete(controller.delProductByID) // Delete product by ID (requires authentication)
    .put(controller.editProductByID) // Update product by ID (requires authentication)

export default router;
