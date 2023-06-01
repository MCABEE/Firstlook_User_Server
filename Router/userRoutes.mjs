import express from 'express'
import { addAboutYou, addAcademic, addAdditionalPersonalInfo, addFamily, addFamilyAddress, addNative, addOccupation, addOccupationCategory, addPersonalInfo, addUser } from '../Controller/authController.mjs'

const router = express.Router()

router
    .route('/register/mobile')
    .post(addUser)

router
    .route('/register/:userId/aboutYou')
    .patch(addAboutYou)

router
    .route('/register/:userId/native')
    .patch(addNative)

router
    .route('/register/:userId/personalInfo')
    .patch(addPersonalInfo)

router
    .route('/register/:userId/additionalPersonalInfo')
    .patch(addAdditionalPersonalInfo)

router
    .route('/register/:userId/academic')
    .patch(addAcademic)

router
    .route('/register/:userId/occupation')
    .patch(addOccupation)

router
    .route('/register/:userId/occupationCategory')
    .patch(addOccupationCategory)

router
    .route('/register/:userId/family')
    .patch(addFamily)

router
    .route('/register/:userId/familyAddress')
    .patch(addFamilyAddress)

export default router