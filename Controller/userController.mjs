import Course from "../Model/Admin/academic/courseModel.mjs";
import Employer from "../Model/Admin/employer/employerModel.mjs";
import Institution from "../Model/Admin/institutions/institutionModel.mjs";
import Designation from "../Model/Admin/occupation/designationModel.mjs";
import City from "../Model/Admin/places/cityModel.mjs";
import District from "../Model/Admin/places/districtModel.mjs";
import HomeTown from "../Model/Admin/places/homeTownModel.mjs";
import Pincode from "../Model/Admin/places/pincodeModel.mjs";
import Aadhar from "../Model/aadharModel.mjs";
import Post from "../Model/postModel.mjs";
import User from "../Model/userModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";
// import { faker } from '@faker-js/faker'

//Get User data from db
export const getUserDetails = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    const userData = await User.findOne({ _id: userId })

    res.status(200).json({ userData });
});

//Get Logged User data from db
export const getMyProfile = catchAsync(async (req, res, next) => {

    const userId = req.user?._id

    const userData = await User.findOne({ _id: userId })

    res.status(200).json({ userData });
});

//Get Logged User Posts from db
export const getMyPosts = catchAsync(async (req, res, next) => {

    const userId = req.user?._id

    const userPosts = await Post.find({ userId })

    res.status(200).json({ userPosts });
});

//Get User Posts from db
export const getUserPosts = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    const userPosts = await Post.find({ userId })

    res.status(200).json({ userPosts });
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
            await Institution.create({ country: req.body?.country, name: req.body?.university, type: 'university' });
        }
    }

    if (req.body?.college) {
        const existingCollege = await Institution.findOne({ name: req.body?.college });

        if (!existingCollege) {
            await Institution.create({ country: req.body?.country, name: req.body?.college, type: 'college' });
        }
    }

    if (req.body?.institute) {
        const existingInstitute = await Institution.findOne({ name: req.body?.institute });

        if (!existingInstitute) {
            await Institution.create({ country: req.body?.country, name: req.body?.institute, type: 'institute' });
        }
    }

    if (req.body?.courseName) {
        const existingCourseName = await Course.findOne({ name: req.body?.courseName });

        if (!existingCourseName) {
            await Course.create({ stream: req.body?.academicStream, name: req.body?.courseName });
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

    if (req.body?.city) {
        const existingCity = await City.findOne({ name: req.body?.city });

        if (!existingCity) {
            await City.create({ state: req.body?.stateID, name: req.body?.city });
        }
    }

    res.status(200).json({
        status: "success"
    })
});

//Save User Occupation data to db
export const addOccupationCategory = catchAsync(async (req, res, next) => {

    const userId = req.params?.userId

    const userData = await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'occupation.designation': req.body?.designation,
            'occupation.jobCategory': req.body?.jobCategory,
            'occupation.jobType': req.body?.jobType,
            'occupation.jobStream': req.body?.stream,
            'occupation.employer': req.body?.employerName,
            'occupation.companyName': req.body?.companyName,
        }, $pull: { registartionStatus: "Occupation2"}
    }, { multi: true })

    if (req.body?.designation) {
        const existingDesignation = await Designation.findOne({ name: req.body?.designation });

        if (!existingDesignation) {
            await Designation.create({ category: req.body?.jobCategory, name: req.body?.designation });
        }
    }

    if (req.body?.companyName) {
        const existingCompanyName = await Employer.findOne({ name: req.body?.companyName });

        if (!existingCompanyName) {
            await Employer.create({ category: req.body?.jobCategory, name: req.body?.companyName });
        }
    }

    if (req.body?.employerName) {
        const existingEmployers = await Employer.findOne({ name: req.body?.employerName });

        if (!existingEmployers) {
            await Employer.create({ category: req.body?.jobCategory, name: req.body?.employerName });
        }
    }

    res.status(200).json({
        status: "success",
        userData
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
    let districtId

    await User.findOneAndUpdate({ _id: userId }, {
        $set: {
            'familyAddress.houseName': req.body?.familyName,
            'familyAddress.homeTown': req.body?.homeTown,
            'familyAddress.pincode': req.body?.pincode,
            'familyAddress.homePhone': req.body?.contactNumber,
            'familyAddress.secondPhone': req.body?.homeContactNumber,
        }, $pull: { registartionStatus: "Family2"}
    }, { multi: true })

    if(req?.body?.district) { 
        const district = await District.findOne({ name: req?.body?.district })
        districtId = district?._id
    }

    if (req.body?.pincode) {
        const existingPincodes = await Pincode.findOne({ name: req.body?.pincode });

        if (!existingPincodes) {
            await Pincode.create({ district: districtId, code: req.body?.pincode });
        }
    }

    if (req.body?.homeTown) {
        const existingHomeTowns = await HomeTown.findOne({ name: req.body?.homeTown });

        if (!existingHomeTowns) {
            await HomeTown.create({ district: districtId, name: req.body?.homeTown });
        }
    }

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
            'occupation.employer': req.body?.employerName,
            'occupation.companyName': req.body?.companyName
        }
    }, { multi: true })

    res.status(200).json({
        status: "success"
    })
});

//Save Aadhar details to db
export const addAadharDetails = catchAsync(async (req, res, next) => {
    const userId = req?.user?._id
    console.log(req.user)
    await Aadhar.create({
        userId: userId,
        aadharNumber: req.body?.aadhar,
        fullName: req.body?.fullName,
        dob: req.body?.dob,
        fatherName: req.body?.careOf,
        pincode: req.body?.pincode,
        houseName: req.body?.houseName
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