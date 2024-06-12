import Profile from '../models/profile.model.js'; // Подключаем модель профиля
import User from '../models/user.models.js'; // Подключаем модель пользователя

export const getProfile = async (req, res) => {
    try {

        const { userId } = req.params;
        const profile = await Profile.findOne({ userId }); 
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        
        const user = await User.findById(profile.userId); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const profileData = {
            profile,
            user: {
                username: user.username,
                fullName: user.fullName,
                profilePic: user.profilePic,
                gender: user.gender,
                status: user.status,
                photos: user.photos,
                subscriptions: user.subscriptions,
                friends: user.friends,
            }
        };
        
        res.json(profileData);
    } catch (error) {
        console.error("Error in getProfile:", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
