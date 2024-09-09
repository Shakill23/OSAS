import { getProducts, getProductByID, editProduct, deleteProduct, addProduct } from "../Model/db.js";

export default {
    allProducts: async (req, res) => {
        console.log("Fetching all products...");
        try {
            const products = await getProducts(req.body.productName);
            console.log("Products fetched successfully:", products);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ msg: "Unable to retrieve products. Please try again later." });
        }
    },

    prodByID: async (req, res) => {
        console.log("Fetching product by ID:", req.params.id);
        try {
            const product = await getProductByID(+req.params.id);
            if (!product) {
                console.log("Product not found with ID:", req.params.id);
                return res.status(404).json({ msg: "Product not found" });
            }
            console.log("Product fetched successfully:", product);
            res.status(200).json(product);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            res.status(500).json({ msg: "Unable to retrieve the product. Please try again later." });
        }
    },

    addProductToDB: async (req, res) => {
        console.log("Attempting to add new product:", req.body);
        try {
            const { productName, productDesc, amount, productURL, category } = req.body;

            if (!productName || !amount) {
                console.log("Validation failed: Product name or amount missing.");
                return res.status(400).json({ msg: "Product name and amount are required" });
            }

            await addProduct(productName, productDesc, amount, productURL, category);
            console.log("Product added successfully. Fetching updated product list...");
            const products = await getProducts();
            res.status(201).json(products);
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ msg: "Unable to add a new product. Please try again later." });
        }
    },

    editProductByID: async (req, res) => {
        console.log("Attempting to edit product with ID:", req.params.id, "Data:", req.body);
        try {
            const { productName, productDesc, amount, productURL, category } = req.body;

            const product = await getProductByID(+req.params.id);
            if (!product) {
                console.log("Product not found with ID:", req.params.id);
                return res.status(404).json({ msg: "Product not found" });
            }

            const updatedProduct = {
                productName: productName || product.productName,
                productDesc: productDesc || product.productDesc,
                amount: amount || product.amount,
                productURL: productURL || product.productURL,
                category: category || product.category,
            };

            console.log("Updating product with data:", updatedProduct);
            await editProduct(updatedProduct, +req.params.id);
            console.log("Product updated successfully. Fetching updated product list...");
            const products = await getProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ msg: "Unable to update the product. Please try again later." });
        }
    },

    delProductByID: async (req, res) => {
        try {
            console.log("Attempting to delete product with ID:", req.params.id);

            const product = await getProductByID(+req.params.id);
            if (!product) {
                console.log("Product not found, ID:", req.params.id);
                return res.status(404).json({ msg: "Product not found" });
            }

            await deleteProduct(+req.params.id);
            console.log("Product deleted, ID:", req.params.id);

            const products = await getProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error during product deletion:", error.message);
            res.status(500).json({ msg: "Unable to delete the product. Please try again later." });
        }
    },
};
