import catchAsync from "../utils/catchAsync.mjs";
import Post from '../Model/postModel.mjs';
import User from "../Model/userModel.mjs";

// Update user profile image
export const updateProfilePhoto = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const image = req.post;
    await User.findByIdAndUpdate(userId, { $set: { 'profileImage.url': image.url, 'profileImage.id': image.id } })
    res.sendStatus(201);
})

// Save new post to db
export const savePost = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const post = req.post;

    await Post.create({
        userId,
        content: {
            url: post.url,
            id: post.id
        },
        contentType: post.type
    })

    res.sendStatus(201);
})