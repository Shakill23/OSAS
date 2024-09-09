import { pool } from '../config/config.js';
import { encryptPassword } from '../Middleware/hashPass.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

// Fetch all carts for admins
const getAllCarts = async () => {
    const [carts] = await pool.query(`
        SELECT 
        cart.cartID, 
            cart.userID, 
            cart.quantity,
            products.productName,
            products.amount,
            (cart.quantity * products.amount) AS total_price,
            products.productURL
            FROM cart
            JOIN products ON cart.productID = products.productID
            `);
    return carts;
};

// Add an item to cart
const insert = async (productID, userID, quantity) => {
    const [existingProduct] = await pool.query(`
                SELECT * FROM cart
                WHERE productID = ? AND userID = ?
            `, [productID, userID]);

    if (existingProduct.length > 0) {
        const updatedQuantity = existingProduct[0].quantity + quantity;
        await pool.query(`
                    UPDATE cart
                    SET quantity = ?
                    WHERE productID = ? AND userID = ?
                `, [updatedQuantity, productID, userID]);
    } else {
        await pool.query(`
                    INSERT INTO cart (productID, userID, quantity)
                    VALUES (?, ?, ?)
                `, [productID, userID, quantity]);
    }
};

// Define removeFromCart function if it's missing
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


// Fetch a specific cart for a user
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

// New function to fetch all cart items (for admins)
const addedInCart = async (userID) => {
    const [cartItems] = await pool.query(`
        SELECT 
            cart.quantity,
            products.amount,
            (cart.quantity * products.amount) AS totalPrice,
            products.productURL,
            products.productName,
            products.productID
        FROM 
            cart
        JOIN 
            products ON cart.productID = products.productID
        WHERE 
            cart.userID = ?
    `, [userID]);
    return cartItems;
};

// Add an item to cart
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

// Update cart item
const editCart = async (productID, userID, quantity, cartID) => {
    const [result] = await pool.query(`
        UPDATE cart 
        SET productID = ?, quantity = ? 
        WHERE cartID = ? AND userID = ?
    `, [productID, quantity, cartID, userID]);

    return result;
};

// Delete a specific cart item by cartID
const deleteSpecificItem = async (cartID, userID) => {
    await pool.query(`
        DELETE FROM cart
        WHERE cartID = ? AND userID = ?
    `, [cartID, userID]);
};



// const generateJWT = (user) => {
//     console.log("User object before JWT generation:", user);
//     const payload = {
//         emailAdd: user.emailAdd,
//         userRole: user.userRole,
//         userID: user.userID, // Ensure userID is included in the payload
//     };

//     try {
//         return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
//     } catch (error) {
//         throw new Error('Error generating JWT: ' + error.message);
//     }
// };






const getUsers = async () => {
    try {
        const [users] = await pool.query(`
            SELECT * FROM users
        `);
        console.log("getUsers query result:", users);
        return users;
    } catch (error) {
        console.error("Error fetching users from DB:", error);
        throw new Error("Database error. Unable to retrieve users.");
    }
};


const addUser = async ({ username, emailAdd, passw, userRole, profileURL }) => {
    try {
        const query = `INSERT INTO users (username, emailAdd, passw, userRole, profileURL)
                       VALUES (?, ?, ?, ?, ?)`;
        await pool.execute(query, [username, emailAdd, passw, userRole, profileURL]);

        return { username, emailAdd, userRole, profileURL };
    } catch (error) {
        throw new Error('Error inserting user into the database: ' + error.message);
    }
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

    return user[0];
};

const updateUser = async (username, emailAdd, passw, userRole, profileURL, userID) => {
    console.log('Received userID:', userID); // Log the received userID

    if (!userID || isNaN(userID)) {
        console.error("Invalid user ID:", userID); // Log the invalid userID
        throw new Error("Invalid user ID");
    }

    try {
        const [result] = await pool.query(`
            UPDATE users SET username = ?, emailAdd = ?, passw = ?, userRole = ?, profileURL = ? WHERE userID = ?
        `, [username, emailAdd, passw, userRole, profileURL, userID]);

        if (result.affectedRows === 0) {
            console.error("User update failed, no rows affected."); // Log if the update failed
            throw new Error("User update failed");
        }

        console.log('User update successful, affected rows:', result.affectedRows); // Log success
        return result;
    } catch (error) {
        console.error('Error during user update query:', error); // Log any errors during the query
        throw new Error('User update failed: ' + error.message);
    }
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

const loginUser = async (emailAdd, passw) => {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM users WHERE emailAdd = ?
            `, [emailAdd]);

        if (rows.length === 0) {
            return null;
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(passw, user.passw);

        if (!isPasswordValid) {
            return null;
        }

        return user; // Ensure 'userID' is included in the returned user object
    } catch (error) {
        throw new Error('Error during login process: ' + error.message);
    }
};



const registerUser = async ({ username, emailAdd, passw, userRole = 'user', profileURL = null }) => {
    try {
        // Encrypt the password using the function from hashPass.js
        const encryptedPass = await encryptPassword(passw);

        // Add the user to the database
        const user = await addUser({ username, emailAdd, passw: encryptedPass, userRole, profileURL });

        // Generate a JWT token
        const token = generateJWT(user);

        return { user, token };
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};


const checkRoleStatus = async (userRole) => {
    try {
        console.log("Checking user role in the database:", userRole);
        const [[{ userRole: role }]] = await pool.query(`
            SELECT userRole FROM users WHERE userRole = ?
        `, [userRole]);

        if (!role) {
            throw new Error('Role not found in the database.');
        }

        console.log("Fetched role from DB:", role);
        return role;
    } catch (error) {
        console.error('Error fetching user role:', error.message);
        throw new Error('Error fetching user role: ' + error.message);
    }
};

const checkProfile = async (emailAdd) => {
    try {
        console.log("Checking user profile for:", emailAdd);
        const [userProfile] = await pool.query(`
            SELECT * FROM users WHERE emailAdd = ?
        `, [emailAdd]);

        if (!userProfile || userProfile.length === 0) {
            throw new Error('User profile not found.');
        }

        console.log("Fetched user profile:", userProfile);
        return userProfile[0]; // Assuming only one profile per email
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        throw new Error('Error fetching user profile: ' + error.message);
    }
};

const checkUser = async (emailAdd) => {
    try {
        console.log("Checking user password for:", emailAdd);
        const [[{ passw }]] = await pool.query(`
            SELECT passw FROM users WHERE emailAdd = ?
        `, [emailAdd]);

        if (!passw) {
            throw new Error('Password not found for this user.');
        }

        console.log("Fetched password from DB for", emailAdd, ":", passw);
        return passw;
    } catch (error) {
        console.error('Error fetching user password:', error.message);
        throw new Error('Error fetching user password: ' + error.message);
    }
};



export {
    getProducts,
    getProductByID,
    editProduct,
    deleteProduct,
    addProduct,
    getCart,
    addedInCart,
    addToCart,
    getAllCarts,
    insert,
    removeFromCart,
    editCart,
    checkUser,
    getUsers,
    addUser,
    deleteUser,
    getUserByID,
    checkRoleStatus,
    updateUser,
    checkProfile,
    encryptPassword,
    deleteSpecificItem,
    loginUser,
    registerUser
};
