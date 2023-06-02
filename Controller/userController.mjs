import Course from "../Model/Admin/academic/courseModel.mjs";
import Stream from "../Model/Admin/academic/streamModel.mjs";
import Language from "../Model/Admin/basic/languageModel.mjs";
import Designation from "../Model/Admin/occupation/designationModel.mjs";
import OccupationStream from "../Model/Admin/occupation/streamModel.mjs";
import City from "../Model/Admin/places/cityModel.mjs";
import Country from "../Model/Admin/places/countryModel.mjs";
import District from "../Model/Admin/places/districtModel.mjs";
import Pincode from "../Model/Admin/places/pincodeModel.mjs";
import State from "../Model/Admin/places/stateModel.mjs";
import Caste from "../Model/Admin/religion/casteModel.mjs";
import Religion from "../Model/Admin/religion/religionModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";

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

export const getCities = catchAsync(async (req, res, next) => {

    const city = await City.find()
    res.status(200).json({ city });

});

export const getMotherToungue = catchAsync(async (req, res, next) => {

    const state = req.query?.state
    const query = state ? { state } : {}
    const motherToungue = await Language.find(query)
    console.log(motherToungue)
    res.status(200).json({ motherToungue })

});

export const getReligion = catchAsync(async (req, res, next) => {

    const religion = await Religion.find()
    res.status(200).json({ religion });

});

export const getCaste = catchAsync(async (req, res, next) => {

    const caste = await Caste.find()
    res.status(200).json({ caste });

});

export const getAcademicStream = catchAsync(async (req, res, next) => {

    const academicStream = await Stream.find()
    res.status(200).json({ academicStream });

});

export const getCourseName = catchAsync(async (req, res, next) => {

    const courseName = await Course.find()
    res.status(200).json({ courseName });

});

export const getPincode = catchAsync(async (req, res, next) => {

    const pincode = await Pincode.find()
    res.status(200).json({ pincode });

});

export const getDesignation = catchAsync(async (req, res, next) => {

    const designation = await Designation.find()
    res.status(200).json({ designation });

});

export const getOccupationStream = catchAsync(async (req, res, next) => {

    const occupationStream = await OccupationStream.find()
    res.status(200).json({ occupationStream });

});