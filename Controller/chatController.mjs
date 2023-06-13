import Message from "../Model/messageModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";

export const chat = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const { from, to, message } = req.body
    const newMessage = await Message.create({
        message: message,
        chatUsers: [from, to],
        sender: from
    })
    res.status(200).json({
        data: {
            newMessage
        }
    })
})

export const getConnectionsUser = catchAsync(async (req, res, next) => {

    const userId = req.params.userId
    let connectionCount = []
    const connections = await Message.find({ chatUsers: userId }).sort({ createdAt: -1 })
    const connection = [];

    connections.map((message) => {
        const chatUsers = message.chatUsers
        const otherUsers = Object.values(chatUsers).filter((id) => id.toString() !== userId.toString());
        connection.push(...otherUsers);

    });

    const uniqueConnections = [...new Set(connection)];

    const users = await Vendor.find({ _id: { $in: uniqueConnections } })

    const sortedUsers = uniqueConnections.map(id => users.find(user => user._id.toString() === id));

    const messages = await Message.find({ chatUsers: userId, sender: { $ne: userId },  read: false });
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
    users.map((vendorId) => {
        results.map((data) => vendorId._id == data.userId ? connectionCount.push(data) : null)
    })

    res.status(200).json({ sortedUsers, connectionCount })
})

export const getMessage = catchAsync(async (req, res, next) => {
    const from = req.params.user1Id
    const to = req.params.user2Id

    const newMessage = await Message.find({
        chatUsers: {
            $all: [from, to]
        }
    }).sort({ createdAt: 1 })

    const allMessage = newMessage.map((msg) => {
        return {
            myself: msg.sender.toString() === from,
            message: msg.message
        }
    })
    await Message.updateMany({ chatUsers: { $all: [from, to] }, sender: { $ne: from } }, { $set: { read: true } })

    res.status(200).json(allMessage)
})