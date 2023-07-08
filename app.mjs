import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import errorHandler from './middleware/errorHandler.mjs'
import authRouter from './Router/authRoutes.mjs'
import userRouter from './Router/userRoutes.mjs'
import adminRouter from './Router/adminRoutes.mjs'
import AppError from './utils/appError.mjs'
import protectRoute from './middleware/authMiddleware.mjs'

const app = express()

app.use((req, res, next) => {
  res.header("Cache-Control", "private,no-cache,no-store,must-revalidate");
  next();
});

// fixing "413 Request Entity Too Large" errors
app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 }))

app.use(cors({ origin: '*', methods: ["GET", "POST", "DELETE", "PATCH"] }));
app.use(logger('dev'))
app.use(cookieParser())

// Health check
app.get('/', (req, res) => res.status(200).json({ message: 'OK' }))

// api endpoints 
app.use('/auth/v1', authRouter)
app.use('/user/v1', protectRoute, userRouter)
app.use('/data/general', adminRouter)

// Error Handler
app.use(() => { throw new AppError({ statusCode: 404, message: 'Route not found!' }) })
app.use(errorHandler)

export default app;