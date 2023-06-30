import { Schema, model } from 'mongoose';

const adminPostSchema = new Schema({
    image: {
        url: { type: String, required: true },
        id: { type: String, required: true },
    },
    title: { type: String, required: true },
    buttonName: { type: String },
    landingPage: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    audience: { type: Object }
}, { timestamps: true })

const AdminPost = model('AdminPost', adminPostSchema);

export default AdminPost;