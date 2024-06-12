import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;
