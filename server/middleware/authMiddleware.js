import User from "../models/user";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
    const { userId } = req.auth;
    if(!userId) {
        res.json({ success: false, message: "not authenticted"})
    }else {
        const user = await User.findByID(userId);
        req.user = user;
        next()
    }
}
