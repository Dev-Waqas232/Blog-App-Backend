import bcrypt from "bcryptjs";
import User from "models/user-model.js";
import { generateToken } from "middlewares/jwt.js";
export const register = async (req, res) => {
    const data = await req.body;
    try {
        const checkUser = await User.findOne({ email: data.email });
        if (checkUser) {
            return res
                .status(409)
                .json({ message: "User already exists", ok: false });
        }
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await User.create({
            ...data,
            password: hashedPassword,
        });
        const { _id, email, password } = user;
        const token = generateToken({ userId: _id, email, password });
        res
            .status(201)
            .json({ message: "User Created Successfully", ok: true, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", ok: false });
    }
};
export const login = async (req, res) => {
    const data = req.body;
    try {
        const userExists = await User.findOne({ email: data.email });
        if (!userExists) {
            return res
                .status(404)
                .json({ message: "Invalid Credentials", ok: false });
        }
        const passwordMatch = await bcrypt.compare(data.password, userExists.password);
        if (!passwordMatch) {
            return res
                .status(404)
                .json({ message: "Invalid Credentials", ok: false });
        }
        const token = generateToken({
            email: data.email,
            userId: userExists._id,
        });
        return res
            .status(200)
            .json({ message: "Logged in successfully", ok: true, token });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", ok: false });
    }
};
//# sourceMappingURL=auth-controller.js.map