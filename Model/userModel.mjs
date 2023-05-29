import crypto from 'crypto'
import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    secondName: {
        type: String
    },
    userName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please enter a valid email']
    },
    religion: {
        type: String
    },
    personalInfo: {

        gender: {
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
        }
    },
    job: {
        designation: {
            type: String
        },
        jobType: {
            type: String
        },
        department: {
            type: String
        },
        joinedYear: {
            type: Number
        },
        industry: {
            type: String
        },
        companyName: {
            type: String
        }
    },
    address: {
        permanentAddress: {
            type: String
        },
        pincode: {
            type: Number
        },
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
    phone: {
        type: Number,
    },
    secondPhoneNumber: {
        type: Number
    },
    profilePhoto: {
        type: String
    },
    dob: {
        type: Date,
    },
    course: {
        pursueAny: {
            type: String
        },
        courseName: {
            type: String
        },
        university: {
            type: String
        },
        location: {
            type: String
        }
    },
    highestEducation: {
        stream: {
            type: String
        },
        course: {
            type: String
        },
        university: {
            type: String
        },
        location: {
            type: String
        },
        completedYear: {
            type: Number
        }
    },
    family: {
        aboutFamily: {
            type: String
        },
        aboutYou: {
            type: String
        },
        hobbies: {
            type: [String]
        },
        fatherName: {
            type: String
        },
        fatherFamilyName: {
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
        motherFamilyName: {
            type: String
        },
        motherEducation: {
            type: String
        },
        motherOccupation: {
            type: String
        },
        brothers: {
            totalBrothers: {
                type: Number
            },
            marriedBrothers: {
                type: Number
            }
        },
        sisters: {
            totalSisters: {
                type: Number
            },
            marriedSisters: {
                type: Number
            }
        }
    },
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
    status: {
        type: String,
        default: 'Active'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

})

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