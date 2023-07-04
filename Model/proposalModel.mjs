import { Schema, Types, model } from 'mongoose';

const proposalSchema = new Schema({
    proposerId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    proposedProfile: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default Proposal = model('Proposal', proposalSchema);