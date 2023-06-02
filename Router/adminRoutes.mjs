import express from 'express'
import { getCountries, getDistricts, getMotherToungue, getStates } from '../Controller/userController.mjs'

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

export default router