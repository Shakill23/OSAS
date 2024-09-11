import { getCart, addToCart, insert, removeFromCart, getProductByID, addedInCart } from "../Model/db.js";

export default {
    allCartItems : async (req, res) => {
        try {
            res.send(await getCart())
        } catch (error) {
            res.status(404).json({
                msg: "Route does not exist or server is down!"
            })
        }
    },
    itemsInCart: async (req, res) => {
        try {
            let data = await addedInCart(+req.params.id)
            res.send({
                products : data
            })
        } catch (error) {
            res.status(404).json({
                msg: "The item you are looking for doesn't exist"
            })
        }
    },
    addToCartTable : async (req, res) => {
        try {
            let { quantity } = req.body
            const [product] = await getProductByID(+req.params.id);
            let { userID } = req.query
            await insert(+req.params.id, userID, quantity)
            res.send(await addedInCart(+req.params.id));
        } catch (error) {
            res.status(404).json({
                msg: "The item you are looking for doesn't exist"
            })
        }
    },
    deleteFromCart : async (req, res) => {
        try {
            let { userID } = req.query
            await removeFromCart(+req.params.id, userID)
            res.send(await getCart())
        } catch (error) {
            res.status(404).json({
                msg: "The item you are looking for doesn't exist"
            })
        }
    } 
} 