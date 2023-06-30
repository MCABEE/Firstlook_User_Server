import { Server } from "socket.io";

export default function initializeSocket(server) {

    const io = new Server(server, {
        cors: {
            origin: "*",
            credentials: true,
            allowedHeaders: ["Content-Type", "Access", "Authorization"],
        },
    });

    // save online users with user id and socket id
    const onlineUsers = new Map();

    io.on("connection", (socket) => {

        // add user to onlineUsers
        socket.on("addUser", (id) => {
            onlineUsers.set(id, socket.id);
        });

        // send message to the client
        socket.on("send-msg", (data) => {
            const sendUserSocket = onlineUsers.get(data.to);
            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("msg-receive", data.message);
            }
        });

        // Handle disconnections
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
}