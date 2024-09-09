// Middleware to check if the user's role is 'Admin'
const isRoleEqualToAdmin = (req, res, next) => {
    const { userID, userRole } = req.user; // Fetch userID and userRole from req.user

    if (!userID) {
        console.log("UserID is missing in req.user");
        return res.status(400).send({ msg: 'UserID is missing' });
    }

    console.log("Verifying role for user with ID:", userID, "and role:", userRole);

    if (userRole && userRole.toLowerCase() === 'admin') {
        console.log("User is an Admin. Proceeding...");
        next(); // Allow the request to proceed
    } else {
        console.log("Access denied for user role:", userRole);
        return res.status(403).json({ msg: 'Forbidden: Admin access required' });
    }
};

export default isRoleEqualToAdmin;
