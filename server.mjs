import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.mjs'
import { Server } from "socket.io";
import http from 'http'
import { createClient } from 'redis';

const server = http.createServer(app)

dotenv.config({ path: './config.env' })

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Access',
            'Authorization'
        ]
    }
})

// save online users with user id and socket id
const onlineUsers = new Map();
io.on("connection", (socket) => {

    // add user to onlineUsers
    socket.on("addUser", (id) => {
        onlineUsers.set(id, socket.id)
    })

    // send message to the client
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message)
        }
    })

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });

})

mongoose.connection
    .once("open", () => {
        console.log('Database connected successfully');
        // start server after connecting with db
        server.listen(3500, () => {
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