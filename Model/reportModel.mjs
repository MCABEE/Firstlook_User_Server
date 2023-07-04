import { Schema, Types, model } from 'mongoose';

const reportSchema = new Schema({
    reporterId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    reportedProfile: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    detailedMessage: {
        type: String
    },
    // resolved: {
    //     type: Boolean,
    //     default: false
    // }
}, { timestamps: true });

export default Report = model('Report', reportSchema);
