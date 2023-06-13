import User from "../Model/userModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import { client } from "../server.mjs";

export const cacheProfiles = catchAsync(async (req, res, next) => {

    const userId = req.params.userId;
    const data = await client.get(`matchingProfiles:${userId}`)

    if (data !== null) {
        const matchingProfiles = JSON.parse(data)
        res.status(200).json({ from: 'Cache', count: matchingProfiles.length, matchingProfiles })
    } else {
        next()
    }
})

export const matchingProfile = catchAsync(async (req, res) => {

    const userId = req.params.userId
    const user = await User.findById(userId)
    console.log({ gender: user.gender, dob: user.dob, pref: user.preferenceData.age });
    const oppositeGender = user.gender === 'male' ? 'female' : 'male';

    const matchingProfiles = await User.aggregate([
        {
            $match: {
                _id: { $ne: userId },
                gender: oppositeGender,
                'personalInfo.religion': user.personalInfo.religion,
                // 'personalInfo.caste': user.preferenceData.caste,
                $expr: {
                    $and: [
                        { $gte: [{ $subtract: ["$$NOW", "$dob"] }, user.preferenceData.age.minAge * 365 * 24 * 60 * 60 * 1000] },
                        { $lte: [{ $subtract: ["$$NOW", "$dob"] }, user.preferenceData.age.maxAge * 365 * 24 * 60 * 60 * 1000] },
                    ]
                }
            }
        },
        {
            $sort: { updatedAt: -1 }
        }
    ])

    client.set(`matchingProfiles:${userId}`, JSON.stringify(matchingProfiles))
    res.status(200).json({ from: 'DB', count: matchingProfiles.length, matchingProfiles })
})