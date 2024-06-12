import User from "../models/user.models.js"
import { v4 } from 'uuid'
import dotenv from 'dotenv';
import fs from 'fs'
import decodeBase64Image from "../utils/decodeBase64Image.js";
import Subscription from "../models/subscription.model.js";
// dotenv.config();

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in getUsersForSidebar", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}


export const updateUserAvatar = async (req, res) => {
    try {
        const decodedImage = decodeBase64Image(req.body.file);
        const userId = req.body.userId;
        const user = await User.findById(userId);

        const avatarName = v4() + ".jpg";
        fs.writeFileSync(process.env.STATIC_PATH + "\\" + avatarName, decodedImage.data);

        user.photos.push(avatarName);

        user.profilePic = avatarName;

        await user.save();

        return res.json(user);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'Upload avatar error' });
    }
}

// export const deleteAvatar = async (req, res) => {
//     try {
//         const user = await User.findById(req.id)
//         fs.unlinkSync(config.get('staticPath') + "\\" + user.avatar)
//         user.avatar = null
//         await user.save()
//         return res.json(user)
//     } catch (e) {
//         console.log(e)
//         return res.status(400).json({message: 'Delete avatar error'})
//     }
// }

export const updateStatus = async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        user.status = status;
        await user.save();

        return res.status(200).json({ message: "Статус пользователя успешно обновлен", user });
    } catch (error) {
        console.error("Ошибка при обновлении статуса пользователя:", error);
        return res.status(500).json({ message: "Ошибка сервера при обновлении статуса пользователя" });
    }
};

export const updateFullname = async (req, res) => {
    const { userId } = req.params;
    const { fullName } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        user.fullName = fullName;
        await user.save();

        return res.status(200).json({ message: "Имя пользователя успешно обновлено", user });
    } catch (error) {
        console.error("Ошибка при обновлении статуса пользователя:", error);
        return res.status(500).json({ message: "Ошибка сервера при обновлении имени пользователя" });
    }
};

export const followToUser = async (req, res) => {
    try {
        const { subscriber, targetUser } = req.body;
        const existingSubscription = await Subscription.findOne({ subscriber, targetUser });

        if (existingSubscription) {
            return res.status(400).json({ message: 'Вы уже подписаны на этого пользователя' });
        }

        // Проверяем, являются ли пользователи друзьями
        const areFriends = await Subscription.exists({
            subscriber: targetUser,
            targetUser: subscriber
        });

        // Если пользователи подписываются друг на друга, добавляем их в друзья
        if (areFriends) {
            await User.findByIdAndUpdate(subscriber, { $push: { friends: targetUser } });
            await User.findByIdAndUpdate(targetUser, { $push: { friends: subscriber } });
        }

        const newSubscription = new Subscription({ subscriber, targetUser });
        await newSubscription.save();

        // Добавляем идентификатор целевого пользователя в поле подписок текущего пользователя
        await User.findByIdAndUpdate(subscriber, { $push: { subscriptions: targetUser } });

        res.status(201).json({ message: 'Подписка успешно создана', subscription: newSubscription });
    } catch (error) {
        console.error('Ошибка при создании подписки:', error);
        res.status(500).json({ message: 'Ошибка сервера при создании подписки' });
    }
}

export const getUserSubscriptions = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('subscriptions', 'targetUser');
        res.status(200).json(user.subscriptions);
    } catch (error) {
        console.error('Ошибка при получении подписок пользователя:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const unfollowToUser = async (req, res) => {
    try {
        const { targetUserId } = req.params;
        const userId = req.user._id;

        // Удаляем подписку из коллекции Subscription
        await Subscription.findOneAndDelete({ subscriber: userId, targetUser: targetUserId });

        // Проверяем, являются ли пользователи друзьями
        const areFriends = await Subscription.exists({
            subscriber: targetUserId,
            targetUser: userId
        });

        // Если пользователи друзья, удаляем их из списка друзей друг у друга
        if (areFriends) {
            await User.findByIdAndUpdate(userId, { $pull: { friends: targetUserId } });
            await User.findByIdAndUpdate(targetUserId, { $pull: { friends: userId } });
        }

        // Удаляем идентификатор целевого пользователя из поля подписок текущего пользователя
        await User.findByIdAndUpdate(userId, { $pull: { subscriptions: targetUserId } });

        res.status(200).json({ message: 'Подписка успешно удалена' });
    } catch (error) {
        console.error('Ошибка при удалении подписки:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getFollowers = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('subscriptions', 'username'); 
        
        res.status(200).json(user.subscriptions);
    } catch (error) {
        console.error('Ошибка при получении подписчиков:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getFriends = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('friends', 'username profilePic'); 
        res.status(200).json(user);
    } catch (error) {
        console.error('Ошибка при получении друзей:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserPhotos = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const photos = user.photos;

        return res.json({ photos });
    } catch (error) {
        console.error('Error fetching user photos:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
