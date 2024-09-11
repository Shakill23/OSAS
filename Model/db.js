import { pool } from '../config/config.js'


const getProducts = async() => {
    const [products] = await pool.query(`
     SELECT * FROM products
    `);
    return products;
}

// returns product by an id
const getProductByID = async (id) => {
    const [product] = await pool.query(`
        SELECT * FROM products WHERE productID = ?
    `, [id]);

    if(!id || isNaN(id) || id > product){

        throw error()

    }

    return product;
}


const editProduct = async (productName, productDesc, amount, productURL, category, productID) => {
    const [product] = await pool.query(`
        UPDATE products SET productName = ?, productDesc = ?, amount = ?, productURL = ?, category = ? WHERE productID = ?
    `, [productName, productDesc, amount, productURL, category, productID]);
}


const deleteProduct = async(id) => {
    const [product] = await pool.query(`
    DELETE FROM products WHERE productID =?
    `, [id]);
    if(!id || isNaN(id) || id > product){

        throw error()

    }
}

const addProduct = async (productName, productDesc, amount, productURL, category) => {
    const [product] = await pool.query(`
    INSERT INTO products (productName, productDesc, amount, productURL, category) VALUES (?, ?, ?, ?, ?)
    `,[productName, productDesc, amount, productURL, category]);
    return getProducts(product.insertId)
}




// Cart settings ===============
const getCart = async () => {
    const [cart] = await pool.query(`
        SELECT * FROM cart
    `)
    return cart
}

const addedInCart = async (userID) => {
    const [cartItems] = await pool.query(`
        SELECT 
            cart.quantity,
            products.amount,
            (cart.quantity * products.amount) AS total_price,
            products.productURL AS prodUrl,
            products.productName AS prodName,
            products.productID AS prodID
        FROM 
            cart
        JOIN 
            products ON cart.productID = products.productID
        WHERE 
            cart.userID = ?
    `, [userID]);
    
    return cartItems;
}

const addToCart = async (productID, userID) => {
    // Check if the product is already in the cart
    const [existingProduct] = await pool.query(`
        SELECT * FROM cart
        WHERE productID = ? AND userID = ?
    `, [productID, userID]);

    if (existingProduct.length > 0) {

        // Update the quantity of the existing product in the cart
        const updatedQuantity = existingProduct[0].quantity + 1;

        await pool.query(`
            UPDATE cart
            SET quantity = ?
            WHERE productID = ? AND userID = ?
        `, [updatedQuantity, productID, userID]);

    } else {

        // Insert the product into the cart
        await pool.query(`
            INSERT INTO cart (productID, userID, quantity)
            VALUES (?, ?, 1)
        `, [productID, userID]);

    }
}

const insert = async(productID, userID) => {
    // Call the addToCart function to add the product to the cart
    await addToCart(productID, userID);
}

const removeFromCart = async (productID, userID) => {
    // Check if the product is already in the cart
    const [existingProduct] = await pool.query(`
        SELECT * FROM cart
        WHERE productID = ? AND userID = ?
    `, [productID, userID]);

    if (existingProduct.length > 0) {
        // Decrease the quantity of the existing product in the cart
        const updatedQuantity = existingProduct[0].quantity - 1;

        if (updatedQuantity <= 0) {
            // If the updated quantity is less than or equal to zero, remove the product from the cart
            await pool.query(`
                DELETE FROM cart
                WHERE productID = ? AND userID = ?
            `, [productID, userID]);
        } else {
            // Update the quantity of the existing product in the cart
            await pool.query(`
                UPDATE cart
                SET quantity = ?
                WHERE productID = ? AND userID = ?
            `, [updatedQuantity, productID, userID]);
        }
    }
}



// user verification
const checkUser = async (emailAdd, userRole) => {
    try {
        const [rows] = await pool.query(`
            SELECT passw FROM users WHERE emailAdd = ? AND userRole = ?
        `, [emailAdd, userRole]);

        if (rows.length === 0) {
            return null;  // No user found
        }

        return rows[0].passw;  // Return the hashed password
    } catch (error) {
        console.error('Error in checkUser:', error);
        throw error;
    }
};


// user settings

const getUsers = async () => {
    const [users] = await pool.query(`
        SELECT * FROM users
    `);
    return users;
}

const addUser = async (username, emailAdd, passw, userRole, profileURL) => {
    const [user] = await pool.query(`
       INSERT INTO users (username, emailAdd, passw, userRole, profileURL) 
       VALUES(?, ?, ?, ?, ?)
    `,[username, emailAdd, passw, userRole, profileURL])
    return getUsers(user.insertId)
}

const getUserByID =  async (userID) => {
    const [user] = await pool.query(`
        SELECT * FROM users WHERE userID = ?
    `,[userID]);

    if(!userID || isNaN(userID) || userID > user){

        throw error()

    }

    return user
}


const editUser = async (username, emailAdd, passw, userRole, profileURL, userID) =>{
    const [users] = await pool.query(`
    UPDATE users SET username = ?, emailAdd = ?, passw = ?, userRole = ?, profileURL = ? WHERE userID = ?
    `, [username, emailAdd, passw, userRole, profileURL, userID]);

    if(!userID || isNaN(userID) || userID > users){

        throw error()

    }
}

   
const deleteUser = async (userID) => {
    const [users] = await pool.query(`
        DELETE FROM users WHERE userID = ?
    `,[userID])

    if(!userID || isNaN(userID) || userID > users){

        throw error()

    }
}

// admin check
const checkRoleStatus = async (user) => {
 const [[{userRole}]] = await pool.query(`
    SELECT * FROM users WHERE userRole = ?
 ` , [user]);
    return userRole;
}

const checkProfile = async (emailAdd) => {
    const [validUser] = await pool.query(`
    SELECT * FROM users WHERE emailAdd = ?
    `, [emailAdd]);
    return validUser
}
  
 
export {getProducts, getProductByID, editProduct, deleteProduct, addProduct, getCart, addedInCart, insert, addToCart, removeFromCart, checkUser, getUsers, addUser, deleteUser, getUserByID, checkRoleStatus, editUser, checkProfile}






































// const addToCart = async (productID) => {
//     const [addToCart] = await pool.query(`
//         SELECT * FROM products
//         INNER JOIN cart ON products.productID = cart.productID
//         WHERE cart.userID = ?
//     `, [productID]);
//     return addToCart
// }
// // console.log(await addToCart(1))

// const insert = async(productID, userID, quantity) => {
//     const [result] = await pool.query(`
//       INSERT INTO cart (productID, userID, quantity) VALUES (?,?,?)
//     `,[productID, userID, quantity])
//     return addToCart()
// }
