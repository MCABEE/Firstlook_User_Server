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
        type: String,
        enum: ["Accepted", "Rejected", "Cancelled", "Pending"],
        default: "Pending"
    }
}, { timestamps: true });

const Proposal = model('Proposal', proposalSchema);
export default Proposal;