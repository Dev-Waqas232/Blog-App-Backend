import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId || String,
        ref: "Users",
    },
    tags: {
        type: [String],
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    likesUser: {
        type: [String],
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments",
        },
    ],
    category: {
        type: String,
        enum: [
            "Technology",
            "Health",
            "Travel",
            "Food",
            "Fashion",
            "Fitness",
            "Books",
            "Movies",
            "Music",
            "Sports",
        ],
        required: true,
    },
}, { timestamps: true });
const Blog = mongoose.model("Blogs", blogSchema);
export default Blog;
//# sourceMappingURL=blog-model.js.map