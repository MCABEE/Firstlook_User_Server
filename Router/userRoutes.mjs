import express from 'express'
import * as userController from '../Controller/userController.mjs'
import * as profileMatchingController from '../Controller/profileMatchingController.mjs'
import { createRndomTestUsers, deleteTestUsers } from '../Controller/testDataController.mjs'
import { chat, getMessage } from '../Controller/chatController.mjs'
import { uploadImage } from '../Cloudflare/imageUploader.mjs'
import { convertImage } from '../Cloudflare/imageConvert.mjs'
import { compressAndUploadVideo } from '../Cloudflare/videoUploader.mjs'
import { upload } from '../Cloudflare/videoConverter.mjs'
import { getUserDetails } from '../Controller/userController.mjs'

const router = express.Router()

router
    .route('/addTestImage')
    .patch(userController.addTestImage)

router
    .route('/getUserData')
    .get(getUserDetails)

router
    .route('/testUsers')
    .post(createRndomTestUsers)
    .delete(deleteTestUsers)

router
    .route('/matchingProfiles/:userId')
    .get(profileMatchingController.cacheProfiles, profileMatchingController.matchingProfile)

router
    .route('/register/:userId/aboutYou')
    .patch(userController.addAboutYou)

router
    .route('/register/:userId/native')
    .patch(userController.addNative)

router
    .route('/register/:userId/personalInfo')
    .patch(userController.addPersonalInfo)

router
    .route('/register/:userId/additionalPersonalInfo')
    .patch(userController.addAdditionalPersonalInfo)

router
    .route('/register/:userId/academic')
    .patch(userController.addAcademic)

router
    .route('/register/:userId/occupation')
    .patch(userController.addOccupation)

router
    .route('/register/:userId/occupationCategory')
    .patch(userController.addOccupationCategory)

router
    .route('/register/:userId/family')
    .patch(userController.addFamily)

router
    .route('/register/:userId/familyAddress')
    .patch(userController.addFamilyAddress)

router
    .route('/register/:userId/aboutYouQuick')
    .patch(userController.addAboutYouQuick)

router
    .route('/register/:userId/addNativeQuick')
    .patch(userController.addNativeQuick)

router
    .route('/chat')
    .post(chat)

router
    .route('/getMessage/:user1Id/:user2Id')
    .get(getMessage)

router
    .route('/uploadImage/postImage')
    .post(convertImage, uploadImage)

router
    .route('/uploadVideo/postVideo')
    .post(upload.single('video'), compressAndUploadVideo)

export default router