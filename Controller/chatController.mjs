import Message from "../Model/messageModel.mjs";
import User from "../Model/userModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";

//Save Chat messages send between user's to db
export const chat = catchAsync(async (req, res, next) => {
    
    const { from, to, message, type } = req.body
    const newMessage = await Message.create({
        message: message,
        chatUsers: [from, to],
        sender: from,
        type
    })
    res.status(200).json({
        data: {
            newMessage
        }
    })
})

//Get the connection between User's
export const getConnectionsUser = catchAsync(async (req, res, next) => {

    const userId = req.user._id.toString()
    let connectionCount = []
    const connections = await Message.find({ chatUsers: userId }).sort({ createdAt: -1 })
    const connection = [];

    connections.map((message) => {
        const chatUsers = message.chatUsers
        const otherUsers = Object.values(chatUsers).filter((id) => id.toString() !== userId.toString());
        connection.push(...otherUsers);

    });
    const uniqueConnections = [...new Set(connection)];
    const users = await User.find({ _id: { $in: uniqueConnections } }).select({ displayName: 1, profileImage: 1 })

    const messages = await Message.find({ chatUsers: userId, sender: { $ne: userId }, read: false });
    const counts = {};
    messages.forEach(message => {
        message.chatUsers.forEach(userId => {
            if (!counts[userId]) {
                counts[userId] = 1;
            } else {
                counts[userId]++;
            }
        });
    });
    const results = Object.entries(counts).map(([userId, count]) => ({ userId, count }));
    users.map((user) => {
        results.map((data) => user._id == data.userId ? connectionCount.push(data) : null)
    })

    connectionCount = users.map((user) => {
        const countObj = connectionCount.find((count) => count.userId === user._id.toString());
        return {
          ...user.toObject(),
          unReadMessages: countObj ? countObj.count : 0,
        };
      });

    res.status(200).json({ connections: connectionCount })
})

//Get the messages send between User's
export const getMessage = catchAsync(async (req, res, next) => {
    const from = req.user._id.toString()
    const to = req.params.to

    console.log({ from, to });

    const messages = await Message.find({
        chatUsers: {
            $all: [from, to]
        }
    }).sort({ createdAt: 1 })

    const allMessage = messages.map((msg) => {
        return {
            myself: msg.sender.toString() === from,
            message: msg.message,
            time: msg.createdAt
        }
    })
    await Message.updateMany({ chatUsers: { $all: [from, to] }, sender: { $ne: from } }, { $set: { read: true } })

    res.status(200).json({ allMessage })
})

//Save Chat request to db
export const requestForMessage = catchAsync(async (req, res, next) => {
    const userId = req?.user?._id
    const { receiver } = req.body
    await Message.create({
        sender: userId,
        receiver
    })
    res.sendStatus(200)
})

export const changeRequestStatus = catchAsync(async (req, res, next) => {
    const userId = req?.user?._id
    const { receiver, status } = req.body

    await Message.findOneAndUpdate({ sender: userId, receiver }, { $set: { requestStatus: status } })

    const chatData = await Message.find()
    chatData?.map(async (data) => {
        if (chatData?.requestStatus === 'Rejected') {
            await Message.findOneAndDelete({ _id: data?._id })
        }
    })

    res.sendStatus(200)
})

export const allMessageCount = catchAsync(async (req, res, next) => {
    const userId = req?.user?._id

    const count = await Message.countDocuments({ chatUsers: userId, sender: { $ne: userId }, read: false });
    res.status(200).json({ count })
})