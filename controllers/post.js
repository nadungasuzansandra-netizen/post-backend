const Post = require("../models/post");

const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new Post({...post, creater: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", result: newPost});
    }catch (error) {
        res.status(500).json({ message: "Error while creating post",error: error.message });
    }
}

const getPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json({ message: "Posts fetched successfully", result: posts});

    }catch (error) {
        res.status(500).json({ message: "Error while fetching posts", error: error.message });

    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const existingPost = await Post.finallyId(id);
        
        if (!existingPost) {
            return res.status(404).json({message: "Post not found" });
        }

        if (req.userId !== existingPost.creator) {
            return res.status(403).json({ message: "Unauthorised access, you are not the owner of this post"});
        }

        existingPost.title = title;
        existingPost.content = content;
        
        await existingPost.save();

        res.status(200).json({ message: "Post updated successfully", result: existingPost });

    } catch (error) {
        res.status(500).json({ message: "Error while updating post", error: error.message });

    }
}

module.exports = {
    createPost,
    getPosts
}