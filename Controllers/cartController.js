import { 
    getCart, 
    insert, 
    removeFromCart, 
    getProductByID, 
    addedInCart, 
    editCart, 
    checkProfile, 
    deleteSpecificItem, 
    getAllCarts
} from "../Model/db.js";

const cartController = {
    // Admin can fetch all carts
    allCarts: async (req, res) => {
        try {
            console.log(`Fetching all carts for Admin user: ${req.user.emailAdd}`);
            const carts = await getAllCarts();
            return res.status(200).json(carts);
        } catch (error) {
            console.error('Error fetching all carts:', error);
            return res.status(500).json({ msg: "Unable to retrieve carts. Please try again later." });
        }
    },

    // All users can access their cart items
    allCartItems: async (req, res) => {
        try {
            const userId = req.user.userID; // Get the authenticated user's ID from the token
            const cartItems = await getCart(userId); // Fetch cart based on userID

            if (!cartItems || cartItems.length === 0) {
                return res.status(200).json({ products: [], msg: 'Your cart is empty.' }); // Return empty cart with message
            }
    
            return res.status(200).json({ products: cartItems });
        } catch (error) {
            console.error('Error fetching cart items:', error);
            return res.status(500).json({ msg: "Unable to retrieve cart items. Please try again later." });
        }
    },

    // Users can add items to their cart
    addToCartTable: async (req, res) => {
        try {
            const { productID, quantity } = req.body;
            const userProfile = await checkProfile(req.user.emailAdd);

            const product = await getProductByID(productID);
            if (!product) {
                return res.status(404).json({ msg: "Product not found." });
            }

            await insert(product.productID, userProfile.userID, quantity);
            const updatedCart = await addedInCart(userProfile.userID);
            return res.status(201).json(updatedCart);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            return res.status(500).json({ msg: "Unable to add item to cart. Please try again later." });
        }
    },

    // Users can remove items from their cart
    deleteFromCart: async (req, res) => {
        try {
            const userProfile = await checkProfile(req.user.emailAdd);
            const productID = req.params.productID;

            const result = await removeFromCart(productID, userProfile.userID);
            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: "Item not found in cart." });
            }

            const updatedCart = await getCart(userProfile.userID);
            return res.status(200).json(updatedCart);
        } catch (error) {
            console.error('Error removing item from cart:', error);
            return res.status(500).json({ msg: "Unable to remove item from cart. Please try again later." });
        }
    },

    // Users can edit their cart
    editCart: async (req, res) => {
        try {
            const { productID, quantity } = req.body;
            const cartID = +req.params.cartItemId;
            const userProfile = await checkProfile(req.user.emailAdd);

            const cartItem = await editCart(productID, userProfile.userID, quantity, cartID);
            if (!cartItem) {
                return res.status(404).json({ msg: "Cart item not found." });
            }

            const updatedCart = await getCart(userProfile.userID);
            return res.status(200).json(updatedCart);
        } catch (error) {
            console.error('Error updating cart:', error);
            return res.status(500).json({ msg: "Unable to update cart item. Please try again later." });
        }
    },

    // Users can delete specific items from their cart
    deleteSpecificItem: async (req, res) => {
        try {
            const userProfile = await checkProfile(req.user.emailAdd);
            const cartItemId = req.params.cartItemId;

            const result = await deleteSpecificItem(cartItemId, userProfile.userID);
            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: "Item not found in cart." });
            }

            const updatedCart = await getCart(userProfile.userID);
            return res.status(200).json(updatedCart);
        } catch (error) {
            console.error('Error deleting item from cart:', error);
            return res.status(500).json({ msg: "Unable to delete item from cart. Please try again later." });
        }
    }
};

export default cartController;
