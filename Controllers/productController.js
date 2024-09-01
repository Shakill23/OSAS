import { getProducts, getProductByID, editProduct, deleteProduct, addProduct, checkRoleStatus } from "../Model/db.js";

export default {
    allProducts: async (req, res) => {
        try {
            const products = await getProducts(req.body.productName);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({
                msg: "Unable to retrieve products. Please try again later."
            });
        }
    },
    prodByID: async (req, res) => {
        try {
            const product = await getProductByID(+req.params.id);
            if (!product) {
                return res.status(404).json({ msg: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({
                msg: "Unable to retrieve the product. Please try again later."
            });
        }
    },
    addProductToDB: async (req, res) => {
        try {
            if (await checkRoleStatus(req.user.userRole) !== 'admin') {
                return res.status(403).json({ msg: "Unauthorized access" });
            }
            const { productName, productDesc, amount, productURL, category } = req.body;
            if (!productName || !amount) {
                return res.status(400).json({ msg: "Product name and amount are required" });
            }
            await addProduct(productName, productDesc, amount, productURL, category);
            const products = await getProducts();
            res.status(201).json(products);
        } catch (error) {
            res.status(500).json({
                msg: "Unable to add a new product. Please try again later."
            });
        }
    },
    editProductByID: async (req, res) => {
        try {
            if (await checkRoleStatus(req.user.userRole) !== 'admin') {
                return res.status(403).json({ msg: "Unauthorized access" });
            }
            let { productName, productDesc, amount, productURL, category } = req.body;
            const product = await getProductByID(+req.params.id);
            if (!product) {
                return res.status(404).json({ msg: "Product not found" });
            }

            productName = productName || product.productName;
            productDesc = productDesc || product.productDesc;
            amount = amount || product.amount;
            productURL = productURL || product.productURL;
            category = category || product.category;

            await editProduct(productName, productDesc, amount, productURL, category, +req.params.id);
            const products = await getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({
                msg: "Unable to update the product. Please try again later."
            });
        }
    },
    delProductByID: async (req, res) => {
        try {
            if (await checkRoleStatus(req.user.userRole) !== 'admin') {
                return res.status(403).json({ msg: "Unauthorized access" });
            }
            const product = await getProductByID(+req.params.id);
            if (!product) {
                return res.status(404).json({ msg: "Product not found" });
            }
            await deleteProduct(+req.params.id);
            const products = await getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({
                msg: "Unable to delete the product. Please try again later."
            });
        }
    }
}
