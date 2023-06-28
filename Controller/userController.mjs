import Course from "../Model/Admin/academic/courseModel.mjs";
import Stream from "../Model/Admin/academic/streamModel.mjs";
import Language from "../Model/Admin/basic/languageModel.mjs";
import Institution from "../Model/Admin/institutions/institutionModel.mjs";
import Designation from "../Model/Admin/occupation/designationModel.mjs";
import OccupationStream from "../Model/Admin/occupation/streamModel.mjs";
import City from "../Model/Admin/places/cityModel.mjs";
import Country from "../Model/Admin/places/countryModel.mjs";
import District from "../Model/Admin/places/districtModel.mjs";
import HomeTown from "../Model/Admin/places/homeTownModel.mjs";
import Pincode from "../Model/Admin/places/pincodeModel.mjs";
import State from "../Model/Admin/places/stateModel.mjs";
import Caste from "../Model/Admin/religion/casteModel.mjs";
import Religion from "../Model/Admin/religion/religionModel.mjs";
import User from "../Model/userModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";

export const getUserDetails = catchAsync(async (req, res, next) => {

    const userId = req.query?.userId

    const userData = await User.findById(userId)
    res.status(200).json({ userData });

});

export const getCountries = catchAsync(async (req, res, next) => {

    const countries = await Country.find()
    res.status(200).json({ countries });

});

export const getStates = catchAsync(async (req, res, next) => {

    const country = req.query?.country
    const query = country ? { country } : {}
    const states = await State.find(query)
    res.status(200).json({ states })

});

export const getDistricts = catchAsync(async (req, res, next) => {

    const state = req.query?.state
    const query = state ? { state } : {}
    const districts = await District.find(query)
    res.status(200).json({ districts })

});

export const getMotherToungue = catchAsync(async (req, res, next) => {

    const state = req.query?.state
    const query = state ? { state } : {}
    const motherToungue = await Language.find(query)
    res.status(200).json({ motherToungue })

});

export const getReligion = catchAsync(async (req, res, next) => {

    const religion = await Religion.find()
    res.status(200).json({ religion });

});

export const getCaste = catchAsync(async (req, res, next) => {

    const religion = req.query?.religion
    const query = religion ? { religion } : {}
    const caste = await Caste.find(query)
    res.status(200).json({ caste })

});

export const getAcademicStream = catchAsync(async (req, res, next) => {

    const academicStream = await Stream.find()
    res.status(200).json({ academicStream });

});

export const getCourseName = catchAsync(async (req, res, next) => {

    const stream = req.query?.stream
    const query = stream ? { stream } : {}
    const courseName = await Course.find(query)
    res.status(200).json({ courseName })

});

export const getUniversity = catchAsync(async (req, res, next) => {

    const country = req.query?.country || null;
    const institutions = await Institution.aggregate([
        {
            $match: {
                type: "university",
                $expr: {
                    $cond: {
                        if: { $ne: [country, null] },
                        then: { $eq: ['$country', country] },
                        else: {}
                    }
                }
            }
        },
        {
            $group: { _id: '$country', institutions: { $push: { _id: '$_id', name: '$name', location: '$location' } } }
        }
    ])
    res.status(200).json({ institutions })

});

export const getCollege = catchAsync(async (req, res, next) => {

    const country = req.query?.country || null;
    const institutions = await Institution.aggregate([
        {
            $match: {
                type: "college",
                $expr: {
                    $cond: {
                        if: { $ne: [country, null] },
                        then: { $eq: ['$country', country] },
                        else: {}
                    }
                }
            }
        },
        {
            $group: { _id: '$country', institutions: { $push: { _id: '$_id', name: '$name', location: '$location' } } }
        }
    ])
    res.status(200).json({ institutions })

});

export const getInstitute = catchAsync(async (req, res, next) => {

    const country = req.query?.country || null;
    const institutions = await Institution.aggregate([
        {
            $match: {
                type: "institute",
                $expr: {
                    $cond: {
                        if: { $ne: [country, null] },
                        then: { $eq: ['$country', country] },
                        else: {}
                    }
                }
            }
        },
        {
            $group: { _id: '$country', institutions: { $push: { _id: '$_id', name: '$name', location: '$location' } } }
        }
    ])
    res.status(200).json({ institutions })

});

export const getPincode = catchAsync(async (req, res, next) => {

    const pincode = await Pincode.find()
    res.status(200).json({ pincode });

});

export const getHomeTown = catchAsync(async (req, res, next) => {

    const homeTown = await HomeTown.find()
    res.status(200).json({ homeTown });

});

export const getCity = catchAsync(async (req, res, next) => {

    const state = req.query?.state
    const query = state ? { state } : {}
    const cities = await City.find(query)
    res.status(200).json({ cities })

});

export const getDesignation = catchAsync(async (req, res, next) => {

    const stream = req.query?.stream
    const query = stream ? { stream } : {}
    const designation = await Designation.find(query)
    res.status(200).json({ designation })

});

export const getOccupationStream = catchAsync(async (req, res, next) => {

    const occupationStream = await OccupationStream.find()
    res.status(200).json({ occupationStream });

});