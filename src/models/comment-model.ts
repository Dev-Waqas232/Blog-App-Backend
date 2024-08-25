import mongoose, { Mongoose } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    comment: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true }
);

export type CommentSchemaType = mongoose.InferSchemaType<typeof commentSchema>;

const Comment = mongoose.model("Comments", commentSchema);

export default Comment;
