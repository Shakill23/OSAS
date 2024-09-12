import { pool } from '../config/index.js'


// user functions ==============

const getUsers = async () => {
    const [users] = await pool.query(`
        SELECT * FROM users
    `);
    return users;
}

const addUser = async (username, userEmail, userPass, userRole, userImg) => {
    const [user] = await pool.query(`
       INSERT INTO users (username, userEmail, userPass, userRole, userImg) 
       VALUES(?, ?, ?, ?, ?)
    `,[username, userEmail, userPass, userRole, userImg])
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


const editUser = async (username, userEmail, userPass, userRole, userImg, userID) =>{
    const [users] = await pool.query(`
    UPDATE users SET username = ?, userEmail = ?, userPass = ?, userRole = ?, userImg = ? WHERE userID = ?
    `, [username, userEmail, userPass, userRole, userImg, userID]);

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

// user check ============

const checkUser = async (userEmail, userRole) => {
    const [[{userPass}]] = await pool.query(`
        SELECT userPass FROM users WHERE userEmail = ? AND userRole = ?
    `, [userEmail, userRole])
    return userPass
}

// admin verification ============
const checkRoleStatus = async (user) => {
 const [[{userRole}]] = await pool.query(`
    SELECT * FROM users WHERE userRole = ?
 ` , [user]);
    return userRole;
}

const checkProfile = async (userEmail) => {
    const [validUser] = await pool.query(`
    SELECT * FROM users WHERE userEmail = ?
    `, [userEmail]);
    return validUser
}




// products functions ===================
const getProducts = async() => {
    const [products] = await pool.query(`
     SELECT * FROM products
    `);
    return products;
}

const getProductByID = async (id) => {
    const [product] = await pool.query(`
        SELECT * FROM products WHERE productID = ?
    `, [id]);

    if(!id || isNaN(id) || id > product){

        throw error()

    }

    return product;
}


const editProduct = async (productName, productDesc, productPrice, productImg, category, productID) => {
    const [product] = await pool.query(`
        UPDATE products SET productName = ?, productDesc = ?, productPrice = ?, productImg = ?, category = ? WHERE productID = ?
    `, [productName, productDesc, productPrice, productImg, category, productID]);
}


const deleteProduct = async(id) => {
    const [product] = await pool.query(`
    DELETE FROM products WHERE productID =?
    `, [id]);
    if(!id || isNaN(id) || id > product){

        throw error()

    }
}

const addProduct = async (productName, productDesc, productPrice, productImg, category) => {
    const [product] = await pool.query(`
    INSERT INTO products (productName, productDesc, productPrice, productImg, category) VALUES (?, ?, ?, ?, ?)
    `,[productName, productDesc, productPrice, productImg, category]);
    return getProducts(product.insertId)
}




// Cart functions ===============
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
            products.productPrice,
            (cart.quantity * products.productPrice) AS total_price,
            products.productImg AS prodUrl,
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
}

const insert = async(productID, userID) => {
    await addToCart(productID, userID);
}

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
