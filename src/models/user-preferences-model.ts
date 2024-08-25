import mongoose from "mongoose";

const userPreferencesSchema = new mongoose.Schema(
  {
    preferences: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

export type UserPreferencesSchema = mongoose.InferSchemaType<
  typeof userPreferencesSchema
>;

const UserPreferences = mongoose.model(
  "UserPreferences",
  userPreferencesSchema
);
export default UserPreferences;
