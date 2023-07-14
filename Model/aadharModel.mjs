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
        type: String
    },
    fatherName: {
        type: String
    },
    pincode: {
        type: Number
    },
    houseName: {
        type: String
    },
    images: {
        sideOne: { url: String, id: String },
        sideTwo: { url: String, id: String },
    },
    verification: {
        verified: {
            type: Boolean,
            default: false
        },
        verifiedBy: {
            type: Objectid,
            ref: 'Admin'
        },
        verificationDate: {
            type: Date
        },
    }
}, { timestamps: true })

const Aadhar = mongoose.model('Aadhar', aadharSchema)

export default Aadhar