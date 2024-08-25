import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export type UserSchema = InferSchemaType<typeof userSchema>;

const User = mongoose.model("Users", userSchema);
export default User;
