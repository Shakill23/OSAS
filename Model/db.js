import { pool } from '../config/config.js';

// Product settings ===============

const getProducts = async () => {
    const [products] = await pool.query(`
        SELECT * FROM products
    `);
    return products;
};

const getProductByID = async (id) => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid product ID");
    }

    const [product] = await pool.query(`
        SELECT * FROM products WHERE productID = ?
    `, [id]);

    if (product.length === 0) {
        throw new Error("Product not found");
    }

    return product;
};

const editProduct = async (productName, productDesc, amount, productURL, category, productID) => {
    if (!productID || isNaN(productID)) {
        throw new Error("Invalid product ID");
    }

    const [result] = await pool.query(`
        UPDATE products SET productName = ?, productDesc = ?, amount = ?, productURL = ?, category = ? WHERE productID = ?
    `, [productName, productDesc, amount, productURL, category, productID]);

    if (result.affectedRows === 0) {
        throw new Error("Product update failed");
    }

    return result;
};

const deleteProduct = async (id) => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid product ID");
    }

    const [result] = await pool.query(`
        DELETE FROM products WHERE productID = ?
    `, [id]);

    if (result.affectedRows === 0) {
        throw new Error("Product deletion failed");
    }

    return result;
};

const addProduct = async (productName, productDesc, amount, productURL, category) => {
    const [result] = await pool.query(`
        INSERT INTO products (productName, productDesc, amount, productURL, category) VALUES (?, ?, ?, ?, ?)
    `, [productName, productDesc, amount, productURL, category]);

    if (result.affectedRows === 0) {
        throw new Error("Failed to add product");
    }

    return getProducts(result.insertId);
};

// Cart settings ===============

const getCart = async (userID) => {
    const [cart] = await pool.query(`
        SELECT 
            cart.cartID,
            cart.quantity,
            products.productName,
            products.amount,
            (cart.quantity * products.amount) AS total_price,
            products.productURL
        FROM 
            cart
        JOIN 
            products ON cart.productID = products.productID
        WHERE 
            cart.userID = ?
    `, [userID]);
    return cart;
};

const addedInCart = async (userID) => {
    const [cartItems] = await pool.query(`
        SELECT 
            cart.quantity,
            products.amount,
            (cart.quantity * products.amount) AS totalPrice,
            products.productURL AS productURL,
            products.productName AS productName,
            products.productID AS productID
        FROM 
            cart
        JOIN 
            products ON cart.productID = products.productID
        WHERE 
            cart.userID = ?
    `, [userID]);

    return cartItems;
};

const addToCart = async (productID, userID) => {
    const [existingProduct] = await pool.query(`
        SELECT * FROM cart
        WHERE productID = ? AND userID = ?
    `, [productID, userID]);

    if (existingProduct.length > 0) {
        const updatedQuantity = existingProduct[0].quantity + 1;

        await pool.query(`
            UPDATE cart
            SET quantity = ?
            WHERE productID = ? AND userID = ?
        `, [updatedQuantity, productID, userID]);

    } else {
        await pool.query(`
            INSERT INTO cart (productID, userID, quantity)
            VALUES (?, ?, 1)
        `, [productID, userID]);
    }
};

const insert = async (productID, userID) => {
    await addToCart(productID, userID);
};

const editCart = async (productID, userID, quantity, cartID) => {
    if (!cartID || isNaN(cartID)) {
        throw new Error("Invalid cart ID");
    }

    const [result] = await pool.query(`
        UPDATE cart 
        SET productID = ?, quantity = ? 
        WHERE cartID = ? AND userID = ?
    `, [productID, quantity, cartID, userID]);

    if (result.affectedRows === 0) {
        throw new Error("Update failed, possibly due to an invalid cart ID or no changes made");
    }

    return result;
};

const removeFromCart = async (productID, userID) => {
    const [existingProduct] = await pool.query(`
        SELECT * FROM cart
        WHERE productID = ? AND userID = ?
    `, [productID, userID]);

    if (existingProduct.length > 0) {
        const updatedQuantity = existingProduct[0].quantity - 1;

        if (updatedQuantity <= 0) {
            await pool.query(`
                DELETE FROM cart
                WHERE productID = ? AND userID = ?
            `, [productID, userID]);
        } else {
            await pool.query(`
                UPDATE cart
                SET quantity = ?
                WHERE productID = ? AND userID = ?
            `, [updatedQuantity, productID, userID]);
        }
    }
};

// User settings ===============

const checkUser = async (emailAdd, userRole) => {
    const [[{ passw }]] = await pool.query(`
        SELECT passw FROM users WHERE emailAdd = ? AND userRole = ?
    `, [emailAdd, userRole]);
    return passw;
};

const getUsers = async () => {
    const [users] = await pool.query(`
        SELECT * FROM users
    `);
    return users;
};

const addUser = async (username, emailAdd, passw, userRole, profileURL) => {
    const [result] = await pool.query(`
        INSERT INTO users (username, emailAdd, passw, userRole, profileURL) 
        VALUES(?, ?, ?, ?, ?)
    `, [username, emailAdd, passw, userRole, profileURL]);

    if (result.affectedRows === 0) {
        throw new Error("Failed to add user");
    }

    return getUsers(result.insertId);
};

const getUserByID = async (userID) => {
    if (!userID || isNaN(userID)) {
        throw new Error("Invalid user ID");
    }

    const [user] = await pool.query(`
        SELECT * FROM users WHERE userID = ?
    `, [userID]);

    if (user.length === 0) {
        throw new Error("User not found");
    }

    return user;
};

const editUser = async (username, emailAdd, passw, userRole, profileURL, userID) => {
    if (!userID || isNaN(userID)) {
        throw new Error("Invalid user ID");
    }

    const [result] = await pool.query(`
        UPDATE users SET username = ?, emailAdd = ?, passw = ?, userRole = ?, profileURL = ? WHERE userID = ?
    `, [username, emailAdd, passw, userRole, profileURL, userID]);

    if (result.affectedRows === 0) {
        throw new Error("User update failed");
    }

    return result;
};

const deleteUser = async (userID) => {
    if (!userID || isNaN(userID)) {
        throw new Error("Invalid user ID");
    }

    const [result] = await pool.query(`
        DELETE FROM users WHERE userID = ?
    `, [userID]);

    if (result.affectedRows === 0) {
        throw new Error("User deletion failed");
    }

    return result;
};

// Admin and Profile Check

const checkRoleStatus = async (userRole) => {
    const [[{ userRole: role }]] = await pool.query(`
        SELECT userRole FROM users WHERE userRole = ?
    `, [userRole]);

    return role;
};

const checkProfile = async (emailAdd) => {
    const [userProfile] = await pool.query(`
        SELECT * FROM users WHERE emailAdd = ?
    `, [emailAdd]);

    return userProfile;
};

export {
    getProducts,
    getProductByID,
    editProduct,
    deleteProduct,
    addProduct,
    getCart,
    addedInCart,
    insert,
    addToCart,
    removeFromCart,
    editCart,
    checkUser,
    getUsers,
    addUser,
    deleteUser,
    getUserByID,
    checkRoleStatus,
    editUser,
    checkProfile
};
