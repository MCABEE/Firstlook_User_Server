import { Router } from "express";
import * as authController from '../Controller/authController.mjs';

const router = Router();

router
    .route('/register/mobile')
    .post(authController.addUser)

export default router;