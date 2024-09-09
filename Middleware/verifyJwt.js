import jwt from 'jsonwebtoken'; // Ensure jwt is imported

// Generate JWT function
const generateJWT = (user) => {
    console.log("User object before JWT generation:", user); // Debugging line
    const payload = {
        emailAdd: user.emailAdd,
        userRole: user.userRole,
        userID: user.userID, // Ensure userID is included in the payload
    };

    try {
        return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    } catch (error) {
        throw new Error('Error generating JWT: ' + error.message);
    }
};

// JWT Verification Middleware
const auth = (req, res, next) => {
    console.log("Verifying JWT...");

    try {
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else {
            token = req.cookies.jwt;
        }

        console.log(`Token received: ${token}`);

        if (!token) {
            console.log("No valid token found.");
            return res.status(401).send({ msg: "No valid token" });
        }

        const user = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Token successfully verified:", user);
        
        if (!user.userID) {
            console.log("UserID is missing in the decoded token");
            return res.status(400).send({ msg: "UserID is missing in the decoded token" });
        }

        req.user = user; // Now req.user contains userID, emailAdd, userRole
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

export { generateJWT, auth };
