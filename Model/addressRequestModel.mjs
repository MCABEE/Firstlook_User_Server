import { Schema, Types, model } from 'mongoose';

const addressRequestSchema = new Schema({
    requestedBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestedAddressProfile: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Approved', 'Not Approved', 'Reject'],
        default: "Not Approved"
    }
}, { timestamps: true });

const AddressRequest = model('AddressRequest', addressRequestSchema);
export default AddressRequest;