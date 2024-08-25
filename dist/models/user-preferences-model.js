import mongoose from "mongoose";
const userPreferencesSchema = new mongoose.Schema({
    preferences: {
        type: [String],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
}, { timestamps: true });
const UserPreferences = mongoose.model("UserPreferences", userPreferencesSchema);
export default UserPreferences;
//# sourceMappingURL=user-preferences-model.js.map