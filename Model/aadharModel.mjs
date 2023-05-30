import mongoose from 'mongoose'
const Objectid = mongoose.Schema.Types.ObjectId

const aadharSchema = new mongoose.Schema({
    userId: {
        type: Objectid,
        ref: 'User'
    },
    aadharNumber: {
        type: Number
    },
    fullName: {
        type: String
    },
    dob: {
        type: Date
    },
    fatherName: {
        type: String
    },
    address: {
        type: String
    }
}, { timestamps: true })

const Aadhar = mongoose.model('Aadhar', aadharSchema)

export default Aadhar