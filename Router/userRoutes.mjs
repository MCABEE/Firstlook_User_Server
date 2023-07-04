import express from 'express'
import * as userController from '../Controller/userController.mjs'
import * as profileMatchingController from '../Controller/profileMatchingController.mjs'
import { createRndomTestUsers, deleteTestUsers } from '../Controller/testDataController.mjs'
import { chat, getMessage } from '../Controller/chatController.mjs'
import { uploadImage } from '../Cloudflare/imageUploader.mjs'
import { convertImage } from '../Cloudflare/imageConvert.mjs'
import { getUserDetails } from '../Controller/userController.mjs'
import { savePost, updateProfileImage, updateProfileImageAndSaveAsPost } from '../Controller/postController.mjs'
import videoConverter from '../Cloudflare/videoConverter.mjs'
import { uploadVideo } from '../Cloudflare/videoUploader.mjs'

const router = express.Router()

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
    .route('/register/uploadAadhar')
    .post(userController.addAadharDetails)

// ====== UPLOADS ====== //
router
    .route('/register/uploadImage')
    .post(convertImage, uploadImage, updateProfileImageAndSaveAsPost)

router
    .route('/register/uploadAadharImage')
    .post(convertImage, uploadImage, userController.addAadharImage)

router
    .route('/upload/postImage')
    .post(convertImage, uploadImage, savePost)

router
    .route('/upload/profileImage')
    .post(convertImage, uploadImage, updateProfileImage)

router
    .route('/upload/postVideo')
    .post(videoConverter, uploadVideo, savePost)

export default router