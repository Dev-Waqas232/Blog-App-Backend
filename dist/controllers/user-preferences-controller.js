import UserPreferences from "models/user-preferences-model.js";
export const addUserPreferences = async (req, res) => {
    const data = req.body;
    try {
        const response = await UserPreferences.create({
            ...data,
            user: req.user.userId,
        });
        console.log(response);
        res.status(201).json({ message: "Preferences Added", ok: true });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", ok: false });
    }
};
//# sourceMappingURL=user-preferences-controller.js.map