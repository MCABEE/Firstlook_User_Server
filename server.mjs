import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.mjs'
import { createClient } from 'redis';

dotenv.config({ path: './config.env' })

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection
    .once("open", () => {
        console.log('Database connected successfully');
        // start server after connecting with db
        app.listen(3500, () => {
            console.log('server started')
        })
    })
    .on("error", error => {
        console.log("error: ", error);
    })


// Redis 
export const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
await client.connect().then(() => console.log('Redis connection established'));