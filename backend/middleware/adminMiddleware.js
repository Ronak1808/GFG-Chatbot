const { User } = require("../config/models");
const jwtp= 'hitin';
const jwt = require("jsonwebtoken")
async function adminMiddleware(req, res, next) {
    // Implement user auth logic
// You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
        token = req.headers.authorization.split(" ")[1];

        //decodes token id
        const decoded = jwt.verify(token, jwtp);
        const { email } = decoded;
        req.user = await User.findOne({ email }).select("-password");

        next();
        } catch (error) {
        res.status(401).send("not authorized");
        return;
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}

module.exports = adminMiddleware;