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
        unique: true,
    },
    gender: {
        type: String
    },
    phone: {
        type: Number,
        unique: true,
    },
    images: {
        type: [String]
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
        department: {
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
        siblings: {
            type: Number
        },
    },
    preferenceData: {
        age: {
            minAge: Number,
            maxAge: Number,
        },
        height: {
            minHeight: Number,
            maxHeight: Number,
        },
        caste: {
            type: String
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
            type: String
        },
    },
    userType: {
        type: String,
        default: 'Basic'
    },
    status: {
        type: String,
        default: 'Active'
    },
    registartionStatus: {
        type: [String],
        default: ["About You", "Native", "Personal Info", "Academic", "Occupation", "Family", "Upload", "Verification"]
    },
    favourites: [{
        type: Types.ObjectId, 
        ref: 'User', 
    }],
    proposals: [{
        type: Types.ObjectId, 
        ref: 'User', 
    }],
    password: {
        type: String,
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Password are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {

        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)

        return JWTTimestamp < changedTimestamp
    }

    //false means not changed
    return false
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

const User = mongoose.model('User', userSchema)

export default User