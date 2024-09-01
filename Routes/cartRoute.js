import express from 'express';
import controller from '../Controllers/cartController.js';
import auth from '../Middleware/verifyJwt.js';  // Import auth middleware

const router = express.Router();

// Apply auth middleware to protect cart routes

router.route('/')
    .get(auth, controller.allCartItems);  // Only authenticated users can view all cart items

router.route('/:id')
    .get(auth, controller.itemsInCart)  // Only authenticated users can view items in their cart
    .post(auth, controller.addToCartTable)  // Only authenticated users can add items to their cart
    .patch(auth, controller.editCart)  // Only authenticated users can edit items in their cart
    .delete(auth, controller.deleteSpecificItem);  // Only authenticated users can delete a specific item from their cart

router.route('/:id/all')
    .delete(auth, controller.deleteFromCart);  // Only authenticated users can delete all items from their cart

export default router;
