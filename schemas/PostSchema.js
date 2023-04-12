const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Post schema
const PostSchema = new Schema({
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: Boolean,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetData: { type: Schema.Types.ObjectId, ref: 'Post' },
}, { timestamps: true });

// Create the Post model using the Post schema
let Post = mongoose.model('Post', PostSchema);

// Export the Post model
module.exports = Post;
