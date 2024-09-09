// Middleware to check if the user's role is 'Admin'
const isRoleEqualToAdmin = (req, res, next) => {
    const { userID, userRole } = req.user;

    if (!userID || !userRole) {
        console.log("UserID or userRole is missing in req.user");
        return res.status(400).json({ msg: 'UserID or role is missing' });
    }

    if (userRole.toLowerCase() !== 'admin') {
        console.log("Access denied for user role:", userRole);
        return res.status(403).json({ msg: 'Admin access required' });
    }

    next();
};


export default isRoleEqualToAdmin;
