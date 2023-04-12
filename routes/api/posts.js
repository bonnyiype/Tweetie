const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');

// Apply JSON parsing middleware to the router
router.use(bodyParser.json());

// Get all posts endpoint
router.get("/", (req, res) => {
    Post.find()
    .populate("postedBy")
    .populate("retweetData")
    .sort({ "createdAt": -1 })
    .then(async results => {
        results = await User.populate(results, { path: "retweetData.postedBy"});
        res.status(200).send(results);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
});

// Create a new post endpoint
router.post("/", async (req, res) => {
    if (!req.body.content) {
        console.log("Content param not sent with request");
        return res.status(400).json({ error: "Content parameter not sent with request" });
    }

    const postData = {
        content: req.body.content,
        postedBy: req.session.user
    };

    try {
        let newPost = await Post.create(postData);
        newPost = await User.populate(newPost, { path: "postedBy" });
        res.status(201).send(newPost);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Error creating post" });
    }
});

// Like or unlike a post endpoint
router.put("/:id/like", async (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user._id;

    const isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    const option = isLiked ? "$pull" : "$addToSet";

    try {
        // Update user's likes
        req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true });

        // Update post's likes
        const post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true });
        res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

// Retweet or un-retweet a post endpoint
router.post("/:id/retweet", async (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user._id;

    try {
        // Check if the user already retweeted the post
        let repost = await Post.findOneAndDelete({ postedBy: userId, retweetData: postId });

        const option = repost != null ? "$pull" : "$addToSet";

        // If the repost doesn't exist, create it
        if (repost == null) {
            repost = await Post.create({ postedBy: userId, retweetData: postId });
        }

        // Update user's retweets
        req.session.user = await User.findByIdAndUpdate(userId, { [option]: { retweets: repost._id } }, { new: true });

        // Update post's retweetUsers
        const post = await Post.findByIdAndUpdate(postId, { [option]: { retweetUsers: userId } }, { new: true });

        res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

module.exports = router;
