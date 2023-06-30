import express from 'express'
import * as appController from '../Controller/appDataController.mjs'

const router = express.Router()

router
    .route('/getAllCountries')
    .get(appController.getCountries)

router
    .route('/state')
    .get(appController.getStates)

router
    .route('/district')
    .get(appController.getDistricts)

router
    .route('/motherToungue')
    .get(appController.getMotherToungue)

router
    .route('/getAllReligion')
    .get(appController.getReligion)

router
    .route('/caste')
    .get(appController.getCaste)

router
    .route('/getAllAcademicStream')
    .get(appController.getAcademicStream)

router
    .route('/course')
    .get(appController.getCourseName)

router
    .route('/getAllPincode')
    .get(appController.getPincode)

router
    .route('/getAllHomeTown')
    .get(appController.getHomeTown)

router
    .route('/city')
    .get(appController.getCity)

router
    .route('/getAllUniversities')
    .get(appController.getUniversity)

router
    .route('/getAllInstitutes')
    .get(appController.getInstitute)

router
    .route('/getAllColleges')
    .get(appController.getCollege)

router
    .route('/getAllDesignations')
    .get(appController.getDesignation)

router
    .route('/getAllJobStreams')
    .get(appController.getOccupationStream)

export default router