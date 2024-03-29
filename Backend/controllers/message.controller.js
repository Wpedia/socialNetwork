import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receivedId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receivedId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receivedId],
            });
        }

        const newMessage = new Message({
            senderId,
            receivedId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error:", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
}


export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]},
        }).populate("messages") // not reference but actual messages

        if (!conversation)  return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getMess:", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
}