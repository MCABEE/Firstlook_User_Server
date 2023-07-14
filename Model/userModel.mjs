import crypto from 'crypto'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    displayName: {
        type: String,
    },
    gender: {
        type: String
    },
    phone: {
        type: Number,
        unique: true,
    },
    profileImage: {
        url: String,
        id: String,
    },
    dob: {
        type: Date,
    },
    personalInfo: {
        religion: {
            type: String
        },
        caste: {
            type: String
        },
        maritalStatus: {
            type: String
        },
        height: {
            type: Number
        },
        weight: {
            type: Number
        },
        bodyType: {
            type: String
        },
        physicalStatus: {
            type: String
        },
        drinkingHabits: {
            type: String
        },
        smokingHabits: {
            type: String
        },
        foodHabits: {
            type: String
        },
        bloodGroup: {
            type: String
        },
        license: {
            type: String
        },
        financialStatus: {
            type: String
        }
    },
    occupation: {
        hasJob: {
            type: String
        },
        country: {
            type: String
        },
        state: {
            type: String
        },
        district: {
            type: String
        },
        city: {
            type: String
        },
        annualIncome: {
            type: String
        },
        designation: {
            type: String
        },
        jobCategory: {
            type: String
        },
        jobType: {
            type: String
        },
        jobStream: {
            type: String
        },
        employer: {
            type: String
        },
        companyName: {
            type: String
        }
    },
    native: {
        district: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        motherTongue: {
            type: String
        }
    },
    academic: {
        pursueAny: {
            type: String
        },
        academicStream: {
            type: String
        },
        courseName: {
            type: String
        },
        country: {
            type: String
        },
        university: {
            type: String
        },
        college: {
            type: String
        },
        institute: {
            type: String
        },
        passOut: {
            type: Number
        }
    },
    family: {
        fatherName: {
            type: String
        },
        fatherEducation: {
            type: String
        },
        fatherOccupation: {
            type: String
        },
        motherName: {
            type: String
        },
        motherEducation: {
            type: String
        },
        motherOccupation: {
            type: String
        },
        siblings: {
            type: Number
        },
    },
    familyAddress: {
        houseName: {
            type: String
        },
        homeTown: {
            type: String
        },
        pincode: {
            type: Number
        },
        secondPhone: {
            type: Number
        },
        homePhone: {
            type: Number
        },
        diocese: {
            type: String
        },
        allowedUsers: [Types.ObjectId]
    },
    preferenceData: {
        age: {
            minAge: Number,
            maxAge: Number,
        },
        district: {
            type: [String]
        },
        caste: {
            type: [String]
        },
        occupation: {
            type: [String]
        },
        qualification: {
            type: [String]
        },
        location: {
            type: [String]
        },
        maritalStatus: {
            type: [String]
        },
    },
    membershipType: {
        type: String,
        enum: ['Basic', 'Standard', 'Premium'],
        default: 'Basic'
    },
    membershipValidity: {
        type: Date
    },
    connectionsCount: {
        type: Number,
        default: 0
    },
    maxConnections: {
        type: Number,
        default: 0
    },
    favourites: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    proposals: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    blockedProfiles: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    notInterested: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    profileViews: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Active'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    registartionStatus: {
        type: [String],
        default: ["About You", "Native", "Personal Info", "Personal Info2", "Academic", "Occupation", "Occupation2", "Family", "Family2", "Upload", "Verification", "Verification2"]
    },

}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User