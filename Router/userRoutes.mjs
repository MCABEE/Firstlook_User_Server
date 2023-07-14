import express from 'express'
import * as userController from '../Controller/userController.mjs'
import * as profileMatchingController from '../Controller/profileMatchingController.mjs'
import { createRndomTestUsers, deleteTestUsers } from '../Controller/testDataController.mjs'
import { allMessageCount, changeRequestStatus, chat, getConnectionsUser, getMessage, requestForMessage } from '../Controller/chatController.mjs'
import { uploadImage } from '../Cloudflare/imageUploader.mjs'
import { convertImage } from '../Cloudflare/imageConvert.mjs'
import { savePost, updateProfileImage, updateProfileImageAndSaveAsPost } from '../Controller/postController.mjs'
import videoConverter from '../Cloudflare/videoConverter.mjs'
import { uploadVideo } from '../Cloudflare/videoUploader.mjs'
import { aadharImageCoverter } from '../Cloudflare/aadharImageCoverter.mjs'
import { aadharImageUploader } from '../Cloudflare/aadharImageUploader.mjs'

const router = express.Router()

router
    .route('/getUserData/:userId')
    .get(userController.getUserDetails)

router
    .route('/getLoggedUserData')
    .get(userController.getMyProfile)

router
    .route('/getLoggedUserPosts')
    .get(userController.getMyPosts)

router
    .route('/getUserPosts/:userId')
    .get(userController.getUserPosts)

router
    .route('/testUsers')
    .post(createRndomTestUsers)
    .delete(deleteTestUsers)

// router
//     .route('/testPost')
//     .post(userController.addPostsTest)

router
    .route('/matchingProfiles')
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
    .route('/addPreferenceData')
    .patch(userController.addPreferenceData)

router
    .route('/register/uploadAadhar')
    .post(userController.addAadharDetails)

// ====== GENERAL USER FUNCTIONS ====== //

router
    .route('/register/proposeUser')
    .post(userController.proposeUser)

router
    .route('/update/proposalStatus')
    .post(userController.updateProposalStatus)

router
    .route('/request/Address')
    .post(userController.requestAddress)

router
    .route('/update/addressStatus')
    .post(userController.updateAddressStatus)

router
    .route('/add/notInterested')
    .post(userController.addNotInterested)

router
    .route('/remove/notInterestedUser')
    .post(userController.removeFromNotInterested)

router
    .route('/add/favouriteUser')
    .post(userController.addFavourites)

router
    .route('/remove/favouritedUser')
    .post(userController.removeFavouritedUser)

router
    .route('/blockUser')
    .post(userController.blockUser)

router
    .route('/unBlockUser')
    .post(userController.unBlockUser)

// ====== UPLOADS ====== //
router
    .route('/register/uploadImage')
    .post(convertImage, uploadImage, updateProfileImageAndSaveAsPost)

router
    .route('/register/uploadAadharImage')
    .post(aadharImageCoverter, aadharImageUploader)

router
    .route('/upload/postImage')
    .post(convertImage, uploadImage, savePost)

router
    .route('/upload/profileImage')
    .post(convertImage, uploadImage, updateProfileImage)

router
    .route('/upload/postVideo')
    .post(videoConverter, uploadVideo, savePost)

// ====== CHAT ====== //

router
    .route('/getConnections')
    .get(getConnectionsUser)

router
    .route('/chat')
    .post(chat)

router
    .route('/getMessage/:to')
    .get(getMessage)

router
    .route('/chat/getCount')
    .get(allMessageCount)

router
    .route('/chat/messageRequest')
    .post(requestForMessage)

router
    .route('/chat/changeRequestStatus')
    .post(changeRequestStatus)

export default router