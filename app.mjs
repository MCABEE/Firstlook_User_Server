import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import errorHandler from './middleware/errorHandler.mjs'
import userRouter from './Router/userRoutes.mjs'
import adminRouter from './Router/adminRoutes.mjs'
import AppError from './utils/appError.mjs'

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

app.use('/api/v1/', userRouter)
app.use('/api/data/general', adminRouter)

// Error Handler
app.use(() => { throw new AppError({ statusCode: 404, message: 'Route not found!' }) })
app.use(errorHandler)

export default app;