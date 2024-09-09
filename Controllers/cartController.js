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
            const userProfile = await checkProfile(req.user.emailAdd);
            const cartItems = await getCart(userProfile.userID);
            return res.status(200).json({ products: cartItems });
        } catch (error) {
            return res.status(500).json({ msg: "Unable to retrieve cart items. Please try again later." });
        }
    },

    // Users can add items to their cart
    addToCartTable: async (req, res) => {
        try {
            const { quantity } = req.body;
            const product = await getProductByID(+req.params.productID);
            const userProfile = await checkProfile(req.user.emailAdd);

            await insert(product.productID, userProfile.userID, quantity);
            const updatedCart = await addedInCart(userProfile.userID);
            return res.status(201).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ msg: "Unable to add item to cart. Please try again later." });
        }
    },

    // Users can remove items from their cart
    deleteFromCart: async (req, res) => {
        try {
            const userProfile = await checkProfile(req.user.emailAdd);
            await removeFromCart(+req.params.productID, userProfile.userID);
            const updatedCart = await getCart(userProfile.userID);
            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ msg: "Unable to remove item from cart. Please try again later." });
        }
    },

    // Users can edit their cart
    editCart: async (req, res) => {
        try {
            const { productID, quantity } = req.body;
            const cartID = +req.params.cartItemId;
            const userProfile = await checkProfile(req.user.emailAdd);

            await editCart(productID, userProfile.userID, quantity, cartID);
            const updatedCart = await getCart(userProfile.userID);
            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ msg: error.message || "Unable to update cart item. Please try again later." });
        }
    },

    deleteSpecificItem: async (req, res) => {
        try {
            const userProfile = await checkProfile(req.user.emailAdd);
            await deleteSpecificItem(+req.params.cartItemId, userProfile.userID);
            const updatedCart = await getCart(userProfile.userID);
            return res.status(200).json(updatedCart);
        } catch (error) {
            return res.status(500).json({ msg: "Unable to delete item from cart. Please try again later." });
        }
    }
};

export default cartController;
