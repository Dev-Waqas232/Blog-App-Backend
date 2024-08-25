// src/jwtService.ts
import jwt from "jsonwebtoken";
import jwtConfig from "../utils/jwtConfig.js";
export const generateToken = (payload) => {
    return jwt.sign(payload, jwtConfig.secretKey, {
        expiresIn: jwtConfig.expiresIn,
    });
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtConfig.secretKey);
    }
    catch (error) {
        throw new Error("Invalid token");
    }
};
export const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    jwt.verify(token, jwtConfig.secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized: Invalid token" });
        }
        console.log(user);
        req.user = user;
        next();
    });
};
//# sourceMappingURL=jwt.js.map