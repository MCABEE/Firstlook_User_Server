import jwt from 'jsonwebtoken'
import User from '../Model/userModel.mjs';
import catchAsync from '../utils/catchAsync.mjs';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    //remove the password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'Success',
        token,
        data: {
            user
        }
    });
};

export const addUser = catchAsync(async (req, res, next) => {

    const phone = req.body?.phone
    const user = await User.find({ phone: phone })
    
    if(!user) {
        const newUser = await User.create({
            phone: phone,
        });
        createSendToken(newUser, 201, res)
    }

    createSendToken(user, 201, res)

});

export const addAboutYou = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            firstName: req.body?.firstName,
            lastName: req.body?.lastName,
            displayName: req.body?.displayName,
            dob: req.body?.dob,
            gender: req.body?.gender,
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

export const addNative = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'native.country': req.body?.country,
            'native.district': req.body?.district,
            'native.state': req.body?.state,
            'native.motherTongue': req.body?.motherToungue,
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

export const addPersonalInfo = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'personalInfo.religion': req.body?.religion,
            'personalInfo.caste': req.body?.caste,
            'personalInfo.maritalStatus': req.body?.maritalStatus,
            'personalInfo.height': req.body?.height,
            'personalInfo.weight': req.body?.weight,
            'personalInfo.bodytype': req.body?.bodyType,
            'personalInfo.physicalStatus': req.body?.physicalStatus,
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

export const addAdditionalPersonalInfo = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'personalInfo.drinkingHabits': req.body?.drinkingHabits,
            'personalInfo.smokingHabits': req.body?.smokingHabits,
            'personalInfo.foodHabits': req.body?.foodHabits,
            'personalInfo.bloodGroup': req.body?.bloodGroup,
            'personalInfo.license': req.body?.license,
            'personalInfo.financialStatus': req.body?.financialStatus,
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

export const addAcademic = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'academic.pursueAny': req.body?.option,
            'academic.academicStream': req.body?.academicStream,
            'academic.courseName': req.body?.courseName,
            'academic.country': req.body?.country,
            'academic.university': req.body?.university,
            'academic.institute': req.body?.institute,
            'academic.passOut': req.body?.passYear,
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

export const addOccupation = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'occupation.hasJob': req.body?.option,
            'occupation.country': req.body?.country,
            'occupation.state': req.body?.state,
            'occupation.district': req.body?.district,
            'occupation.city': req.body?.city,
            'occupation.annualIncome': req.body?.annualIncome,
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

export const addOccupationCategory = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'occupation.designation': req.body?.designation,
            'occupation.jobCategory': req.body?.jobCategory,
            'occupation.jobType': req.body?.jobType,
            'occupation.jobStream': req.body?.stream,
            'occupation.department': req.body?.department,
            'occupation.companyName': req.body?.companyName,
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

export const addFamily = catchAsync(async (req, res, next) => {

    const userId = req.params.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'family.fatherName': req.body?.fatherName,
            'family.fatherEducation': req.body?.fatherEducation,
            'family.fatherOccupation': req.body?.fatherOccupation,
            'family.motherName': req.body?.motherName,
            'family.motherEducation': req.body?.motherEducation,
            'family.motherOccupation': req.body?.motherOccupation,
            'family.siblings': req.body?.siblings,
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

export const addFamilyAddress = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'family.houseName': req.body?.houseName,
            'family.homeTown': req.body?.homeTown,
            'family.pincode': req.body?.pincode,
            'family.homePhone': req.body?.homePhone,
            'family.secondPhone': req.body?.secondPhone,
            'family.diocese': req.body?.diocese,
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});