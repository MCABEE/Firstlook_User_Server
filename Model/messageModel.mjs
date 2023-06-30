import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    chatUsers: {
        type: Array,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'image'],
        default: 'text'
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)

export default Message