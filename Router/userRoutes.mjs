import  express  from 'express'
import { addUser } from '../Controller/authController.mjs'

const router = express.Router()

router
    .route('/register/mobile')
    .post(addUser)

export default router