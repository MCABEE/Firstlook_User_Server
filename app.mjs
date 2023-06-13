import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import userRouter from './Router/userRoutes.mjs'
import adminRouter from './Router/adminRoutes.mjs'

const app = express()

app.use((req, res, next) => {
  res.header("Cache-Control", "private,no-cache,no-store,must-revalidate");
  next();
});

// fixing "413 Request Entity Too Large" errors
app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 }))

app.use(cors({ origin: '*', methods: ["GET", "POST", "DELETE", "PATCH"] }));
app.use(logger('dev'))
app.use(cookieParser())

app.use('/', userRouter)
app.use('/api/data/general', adminRouter)

export default app;