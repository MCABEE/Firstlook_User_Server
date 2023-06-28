import express from 'express'
import { getAcademicStream, getCaste, getCity, getCollege, getCountries, getCourseName, getDesignation, getDistricts, getHomeTown, getInstitute, getMotherToungue, getOccupationStream, getPincode, getReligion, getStates, getUniversity } from '../Controller/userController.mjs'

const router = express.Router()

router
    .route('/getAllCountries')
    .get(getCountries)

router
    .route('/state')
    .get(getStates)

router
    .route('/district')
    .get(getDistricts)

router
    .route('/motherToungue')
    .get(getMotherToungue)

router
    .route('/getAllReligion')
    .get(getReligion)

router
    .route('/caste')
    .get(getCaste)

router
    .route('/getAllAcademicStream')
    .get(getAcademicStream)

router
    .route('/course')
    .get(getCourseName)

router
    .route('/getAllPincode')
    .get(getPincode)

router
    .route('/getAllHomeTown')
    .get(getHomeTown)

router
    .route('/city')
    .get(getCity)

router
    .route('/getAllUniversities')
    .get(getUniversity)

router
    .route('/getAllInstitutes')
    .get(getInstitute)

router
    .route('/getAllColleges')
    .get(getCollege)

router
    .route('/getAllDesignations')
    .get(getDesignation)

router
    .route('/getAllJobStreams')
    .get(getOccupationStream)

export default router