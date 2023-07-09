import Institution from "../Model/Admin/institutions/institutionModel.mjs";
import Aadhar from "../Model/aadharModel.mjs";
import User from "../Model/userModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";
// import { faker } from '@faker-js/faker'

//Get User data from db
export const getUserDetails = catchAsync(async (req, res, next) => {

    const userId = req.user

    const userData = await User.findOne({ _id: userId })
    console.log(userData)
    res.status(200).json({ userData });

});

//Save User About data to db
export const addAboutYou = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            firstName: req.body?.firstName,
            lastName: req.body?.lastName,
            displayName: req.body?.displayName,
            dob: req.body?.dob,
            gender: req.body?.gender
        }, $pull: { registartionStatus: "About You"}
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save User Native data to db
export const addNative = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'native.country': req.body?.country,
            'native.district': req.body?.district,
            'native.state': req.body?.state,
            'native.motherTongue': req.body?.motherToungue,
        }, $pull: { registartionStatus: "Native"}
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save User Personal data to db
export const addPersonalInfo = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'personalInfo.religion': req.body?.religion,
            'personalInfo.caste': req.body?.caste,
            'personalInfo.maritalStatus': req.body?.maritalStatus,
            'personalInfo.height': req.body?.height,
            'personalInfo.weight': req.body?.weight,
            'personalInfo.bodyType': req.body?.bodyType,
            'personalInfo.physicalStatus': req.body?.physicalStatus,
        }, $pull: { registartionStatus: "Personal Info"}
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save User Personal data to db
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
        }, $pull: { registartionStatus: "Personal Info2"}
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save User Academic data to db & update admin data of Institution
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
            'academic.college': req.body?.college,
            'academic.passOut': req.body?.passYear,
        }, $pull: { registartionStatus: "Academic"}
    }, { multi: true })

    if (req.body?.university) {
        const existingUniversity = await Institution.findOne({ name: req.body?.university });

        if (!existingUniversity) {
            const uni = await Institution.create({ country: req.body?.country, name: req.body?.university, type: 'university' });
        }
    }

    if (req.body?.college) {
        const existingCollege = await Institution.findOne({ name: req.body?.college });

        if (!existingCollege) {
            const det = await Institution.create({ country: req.body?.country, name: req.body?.college, type: 'college' });
            console.log(det)
        }
    }

    if (req.body?.institute) {
        const existingInstitute = await Institution.findOne({ name: req.body?.institute });

        if (!existingInstitute) {
            const was = await Institution.create({ country: req.body?.country, name: req.body?.institute, type: 'institute' });
            console.log(was)
        }
    }

    res.status(200).json({
        status: "success"
    })
});

//Save User Occupation data to db
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
        }, $pull: { registartionStatus: "Occupation"}
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save User Occupation data to db
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
        }, $pull: { registartionStatus: "Occupation2"}
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save User Family data to db
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
        }, $pull: { registartionStatus: "Family"}
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save User Family Address data to db
export const addFamilyAddress = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'familyAddress.houseName': req.body?.houseName,
            'familyAddress.homeTown': req.body?.homeTown,
            'familyAddress.pincode': req.body?.pincode,
            'familyAddress.homePhone': req.body?.homePhone,
            'familyAddress.secondPhone': req.body?.secondPhone,
            'familyAddress.diocese': req.body?.diocese,
        }, $pull: { registartionStatus: "Family2"}
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save User About data to db (Quick Signup)
export const addAboutYouQuick = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            firstName: req.body?.firstName,
            lastName: req.body?.lastName,
            displayName: req.body?.displayName,
            dob: req.body?.selectedDate,
            gender: req.body?.selectedGender,
            'personalInfo.religion': req.body?.religion,
            'personalInfo.caste': req.body?.caste,
            'personalInfo.maritalStatus': req.body?.maritalStatus
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save User Native data to db (Quick Signup)
export const addNativeQuick = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'native.country': req.body?.country,
            'native.district': req.body?.district,
            'native.state': req.body?.state,
            'native.motherTongue': req.body?.motherToungue,
            'occupation.designation': req.body?.designation,
            'occupation.jobCategory': req.body?.jobCategory,
            'occupation.jobType': req.body?.jobType,
            'occupation.jobStream': req.body?.stream,
            'occupation.department': req.body?.department,
            'occupation.companyName': req.body?.companyName
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save Aadhar details to db
export const addAadharDetails = catchAsync(async (req, res, next) => {
    const userId = req.user

    await Aadhar.create({
        userId: userId,
        aadharNumber: req.body?.aadharNumber,
        fullName: req.body?.name,
        dob: req.body?.date_of_birth,
        fatherName: req.body?.care_of,
        address: req.body?.locality
    })

    res.status(200).json({
        status: "success"
    })

})

// export const addPostsTest = catchAsync(async (req, res, next) => {
//     const users = await User.find().skip(100).limit(500);

//     for (const user of users) {
//         await Post.create({
//             userId: user._id,
//             content: {
//                 url: faker.image.url(), // Generate a random image URL
//                 id: Math.random()
//             },
//             // Set any other properties for the post as needed
//         });
//     }

//     res.sendStatus(201)
// })