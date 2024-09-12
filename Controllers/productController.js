import { getProducts, getProductByID, editProduct, deleteProduct, addProduct, addToCart } from "../Model/db.js";

export default {
    allProducts : async (req, res) => {
        try {
            res.send( await getProducts(req.body.productName))
        } catch (error) {
            res.status(404).json({
                msg: "Route does not exist or server is down!"
            })
        }
    },
    prodByID : async (req, res) => {
        try {
            res.send(await getProductByID(+req.params.id))
        } catch(error){
            res.status(404).json({
                msg: "Cannot find the product you're looking for"
            })
        }
    },
    addProductToDB : async (req, res) => {
        try {
            const {productName, productDesc, productPrice, productImg, category} = req.body;
            await addProduct(productName, productDesc, productPrice, productImg, category);
            res.send(await getProducts());
        } catch (error) {
            res.status(404).json({
                msg: "Unable to add a new product check if all inputs a filled out"
            })
        }
    },
    editProductByID : async (req, res) => {
        try {

            let {productName, productDesc, productPrice, productImg, category} = req.body;

            const [product] = await getProductByID(+req.params.id);
    
            productName ? productName : {productName} = product
    
            productDesc ? productDesc : {productDesc} = product 
    
            productPrice ? productPrice : {productPrice} = product
    
            productImg ? productImg : {productImg} = product
    
            category ? category : {category} = product
    
            await editProduct(productName, productDesc, productPrice, productImg, category, +req.params.id)
    
            res.send(await getProducts())

        } catch (error) {
            res.status(404).json({
                msg: "Unable to upadate a product that does not exist"
            })
        }
    },
    delProductByID : async (req, res) => {
        try {
            await deleteProduct(+req.params.id)
            res.send(await getProducts())
        } catch (error) {
            res.status(404).json({
                msg: "Cannot delete item it probably doesn't exist"
            })
        }
    }
}