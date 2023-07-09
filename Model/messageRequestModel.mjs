import mongoose from 'mongoose'

const messageRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    requestStatus: {
        type: String,
        enum: ["Accepted", "Rejected", "Pending", "Blocked"],
        default: "Pending"
    }
}, { timestamps: true })

const MessageRequest = mongoose.model('MessageRequest', messageRequestSchema)

export default MessageRequest