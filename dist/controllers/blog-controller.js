import Blog from "models/blog-model.js";
import Comment from "models/comment-model.js";
import User from "models/user-model.js";
import UserPreferences from "models/user-preferences-model.js";
import mongoose from "mongoose";
export const addBlog = async (req, res) => {
    const data = req.body;
    try {
        const response = await Blog.create({ ...data, author: req.user.userId });
        res
            .status(201)
            .json({ message: "Post Created Successfully", response, ok: true });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", ok: false });
    }
};
export const fetchBlogs = async (req, res) => {
    const user = req.user.userId;
    const param = req.query;
    try {
        const blogs = await Blog.find().lean();
        // showing blogs of the user which is logged in
        if (param?.user) {
            const userBlogs = blogs.filter((blog) => blog.author.toString() === req.user.userId);
            for (const blog of userBlogs) {
                blog.author = "You";
            }
            return res.status(200).json({
                message: "Data fetched",
                ok: true,
                blogs: userBlogs,
                user,
            });
        }
        // filtering user's on blogs and showing all other blogs
        const filteredBlogs = blogs.filter((blog) => blog.author.toString() !== user);
        for (const blog of blogs) {
            const authorId = new mongoose.Types.ObjectId(blog.author);
            const author = await User.findById(authorId).lean();
            // console.log(author);
            if (author) {
                blog.author = author.firstName;
            }
            else {
                blog.author = "Unknown";
            }
        }
        // showing blogs according to preference
        if (param?.preference) {
            const userPreferences = await UserPreferences.findOne({ user: user });
            const { preferences } = userPreferences;
            const preferenceBlogs = filteredBlogs.filter((blog) => preferences.includes(blog.category));
            return res.status(200).json({
                message: "Data fetched",
                ok: true,
                blogs: preferenceBlogs,
                preferences: true,
                user,
            });
        }
        return res.status(200).json({
            message: "Data fetched",
            ok: true,
            blogs: filteredBlogs,
            preferences: false,
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", ok: false });
    }
};
export const fetchBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Not Found", ok: false });
    }
    try {
        const blog = await Blog.findById(id).lean();
        const author = await User.findById(blog.author).lean();
        blog.author = author.firstName;
        const comments = await Comment.find({ blogId: id })
            .sort({ createdAt: -1 })
            .populate("user")
            .lean();
        console.log(comments);
        const commentsWithUserDetails = comments.map((comment) => {
            const userDetails = comment.user
                ? {
                    firstName: comment.user.firstName,
                    lastName: comment.user.lastName,
                    email: comment.user.email,
                    password: comment.user.password,
                }
                : null;
            return {
                text: comment.comment,
                createdAt: comment.createdAt,
                author: {
                    firstName: userDetails.firstName,
                },
            };
        });
        res.status(200).json({
            message: "Data fetched successfully",
            blog: {
                ...blog,
                comments: commentsWithUserDetails,
            },
            ok: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", ok: false });
    }
};
export const updateLikes = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found", ok: false });
        }
        if (!blog.likesUser.includes(req.user.userId)) {
            blog.likesUser.push(req.user.userId);
            blog.likes++;
            await blog.save();
            return res.status(200).json({ message: "Post Liked", ok: true });
        }
        else {
            return res
                .status(400)
                .json({ message: "You have already likes the post", ok: false });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", ok: false });
    }
};
export const addComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    console.log("Hello");
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog doesn't found", ok: false });
        }
        const newComment = await Comment.create({
            comment,
            user: req.user.userId,
            blogId: id,
        });
        blog.comments.push(newComment._id);
        await blog.save();
        res.status(201).json({ message: "Comment Added", ok: true, blog });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", ok: false });
    }
};
//# sourceMappingURL=blog-controller.js.map