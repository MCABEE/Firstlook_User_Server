import catchAsync from "../utils/catchAsync.mjs";
import Post from '../Model/postModel.mjs';
import User from "../Model/userModel.mjs";
import axios from "axios";

// Update user profile image and save as post
export const updateProfileImageAndSaveAsPost = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const image = req.post;

    await User.findByIdAndUpdate(userId, { $set: { 'profileImage.url': image.url, 'profileImage.id': image.id } })

    await Post.create({
        userId,
        content: {
            url: image.url,
            id: image.id
        },
    })

    res.sendStatus(201);
})

// Update user profile image
export const updateProfileImage = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const image = req.post;
    const existingImg = await User.findById(userId, { profileImage: 1 })
    await User.findByIdAndUpdate(userId, { $set: { 'profileImage.url': image.url, 'profileImage.id': image.id } })
    
    // delete old profile image
    if (existingImg?.profileImage.id) {
        deleteOldProfileImage(existingImg.profileImage.id);
    }

    res.sendStatus(201)
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

// delete old profile image
const deleteOldProfileImage = async (imageId) => {
    const options = {
        method: 'DELETE',
        url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${imageId}`,
        headers: {
            'Authorization': `Bearer ${process.env.CLOUDFLARE_API_KEY}`
        },
    };

    // delete image from cloudflare
    await axios.request(options)
}