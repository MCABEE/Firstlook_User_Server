import { Schema, Types, model } from 'mongoose';

const addressRequestSchema = new Schema({
    requestedUserId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestedAddressProfile: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestStatus: {
        type: String,
        enum: ['Approved', 'Not Approved'],
        default: "Not Approved"
    }
}, { timestamps: true });

export default AddressRequest = model('AddressRequest', addressRequestSchema);
