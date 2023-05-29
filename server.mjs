import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.mjs'

dotenv.config({path: './config.env'})

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection
.once("open",()=>console.log("database connected successfully"))
.on("error",error => {
    console.log("error: ",error);
})

app.listen(3500, () => {
    console.log('server started')
})
