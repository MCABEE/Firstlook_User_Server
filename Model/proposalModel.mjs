import { Schema, Types, model } from 'mongoose';

const proposalSchema = new Schema({
    proposedBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    proposedProfile: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default Proposal = model('Proposal', proposalSchema);