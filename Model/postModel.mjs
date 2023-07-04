import { Schema, Types, model } from 'mongoose';

const postSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        url: { type: String, required: true },
        id: { type: String, required: true },
    },
    contentType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
    },
    views: {
        type: Number,
        default: 0
    },
    verification: {
        verified: {
            type: Boolean,
            default: false
        },
        verifiedBy: {
            type: Types.ObjectId,
            ref: 'Admin'
        },
        verificationDate: {
            type: Date
        },
    }
}, { timestamps: true });

const Post = model('Post', postSchema);
export default Post;