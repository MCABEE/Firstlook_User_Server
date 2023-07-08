import User from "../Model/userModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import { client } from "../server.mjs";
import Post from "../Model/postModel.mjs";

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

    const oppositeGender = user.gender === 'male' ? 'female' : 'male';
    const minAge = oppositeGender === 'male' ? calculateAge(user.dob) : 18;
    const maxAge = oppositeGender === 'male' ? 40 : calculateAge(user.dob);

    const matchingProfiles = await User.aggregate([
        {
            $match: {
                _id: { $ne: userId },
                gender: oppositeGender,
                'personalInfo.religion': user.personalInfo.religion,
                $expr: {
                    $cond: {
                        if: {
                            $or: [
                                { $ne: [user.preferenceData.age, {}] },
                                { $ne: [user.preferenceData.occupation, []] },
                                { $ne: [user.preferenceData.qualification, []] },
                                { $ne: [user.preferenceData.location, []] }
                            ]
                        },
                        then: {
                            $and: [
                                { $eq: [user.preferenceData.caste, '$personalInfo.caste'] },
                                { $gte: [{ $subtract: ["$$NOW", "$dob"] }, user.preferenceData.age.minAge * 365 * 24 * 60 * 60 * 1000] },
                                { $lte: [{ $subtract: ["$$NOW", "$dob"] }, user.preferenceData.age.maxAge * 365 * 24 * 60 * 60 * 1000] },
                                {
                                    $or: [
                                        { $in: [user.native.district, { $ifNull: ['$preferenceData.location', []] }] },
                                        { $in: [user.occupation.jobStream, { $ifNull: ['$preferenceData.occupation', []] }] },
                                        { $in: [user.academic.academicStream, { $ifNull: ['$preferenceData.qualification', []] }] },
                                    ]
                                }
                            ]
                        },
                        else: {
                            $and: [
                                { $gte: [{ $subtract: ["$$NOW", "$dob"] }, minAge * 365 * 24 * 60 * 60 * 1000] },
                                { $lte: [{ $subtract: ["$$NOW", "$dob"] }, maxAge * 365 * 24 * 60 * 60 * 1000] },
                                {
                                    $or: [
                                        { $eq: [user.native.state, '$native.state'] },
                                        { $eq: [user.occupation.city, '$occupation.city'] },
                                    ]
                                },
                                {
                                    $or: [
                                        { $eq: [user.occupation.jobStream, '$occupation.jobStream'] },
                                        { $eq: [user.academic.academicStream, '$academic.academincStream'] },
                                        { $eq: [user.academic.university, '$academic.university'] }
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        },
    ])

    // sort profiles based on compatibility score
    const sortedProfiles = await sortProfilesByScore(user, matchingProfiles)

    // Get the userId values from sortedProfiles
    const userIds = sortedProfiles.map((profile) => profile._id);

    // Find all the posts that match the userIds
    const matchingPosts = await Post.find({ userId: { $in: userIds } });

    // caching
    client.set(`matchingProfiles:${userId}`, JSON.stringify(sortedProfiles))
    res.status(200).json({ from: 'DB', count: matchingProfiles.length, matches: sortedProfiles, matchingPosts })
})


// ========= utility functions =========

// calculate age
function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
        age--;
    }

    return age;
}

// sort profiles based on score
const sortProfilesByScore = async (user, matchingProfiles) => {
    const scores = await calculateCompatibilityScores(user, matchingProfiles);
    console.log(scores);

    const sortedProfiles = matchingProfiles.sort((a, b) => {
        const scoreA = scores[matchingProfiles.indexOf(a)];
        const scoreB = scores[matchingProfiles.indexOf(b)];
        return scoreB - scoreA;
    });

    return sortedProfiles;
}

// calculate compatibility score of each profiles concurrently and return array of scores
async function calculateCompatibilityScores(user, profiles) {
    const scorePromises = profiles.map(profile => calculateCompatibilityScore(user, profile));
    const scores = await Promise.all(scorePromises);
    return scores;
};

// calculate compatibility score of a single profile and return it's score
async function calculateCompatibilityScore(user, profile) {
    let score = 0;

    const scores = await Promise.all([
        occupationMatch(user.occupation, profile.occupation),
        locationMatch(user.native, profile.native),
        academicMatch(user.academic, profile.academic)
    ])

    return score = scores.reduce((acc, cur) => acc + cur, 0);
}

// occupation match
async function occupationMatch(userOccupation, profileOccupation) {
    if (userOccupation.jobStream === profileOccupation.jobStream && userOccupation.city === profileOccupation.city) {
        return 10;
    } else if (userOccupation.jobStream === profileOccupation.jobStream) {
        return 8;
    } else if (userOccupation.city === profileOccupation.city) {
        return 5;
    } else {
        return 0
    }
}

// location match
async function locationMatch(userLocation, profileLocation) {
    if (userLocation.district === profileLocation.district) {
        return 10;
    } else if (userLocation.state === profileLocation.state) {
        return 5;
    } else {
        return 0
    }
}

// academic match
async function academicMatch(userAcademic, profileAcademic) {
    if (userAcademic.academicStream === profileAcademic.academicStream && userAcademic.institute === profileAcademic.institute || userAcademic.university === profileAcademic.university) {
        return 10;
    } else if (userAcademic.academicStream === profileAcademic.academicStream) {
        return 8;
    } else if (userAcademic.institute === profileAcademic.institute || userAcademic.university === profileAcademic.university) {
        return 6;
    } else {
        return 0
    }
}