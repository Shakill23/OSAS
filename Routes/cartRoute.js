import express from 'express';
import cartController from '../Controllers/cartController.js';
import authenticate from '../Middleware/signToken.js'; // Authentication middleware

const router = express.Router();

// Ensure users are authenticated to access cart functionality
router.use(authenticate);

// Define the cart routes that are accessible by registered users
router.get('/', cartController.allCartItems); // Fetch the user's cart
router.post('/', cartController.addToCartTable); // Add items to cart
router.patch('/:cartItemId', cartController.editCart); // Edit cart item
router.delete('/:cartItemId', cartController.deleteSpecificItem); // Delete specific item from cart
router.delete('/', cartController.deleteFromCart); // Remove all items from cart

export default router;
