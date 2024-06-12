import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['pending', 'confirmed'],
        default: 'pending'
    }
}, { timestamps: true });

const Friendship = mongoose.model('Friendship', friendshipSchema);

export default Friendship;