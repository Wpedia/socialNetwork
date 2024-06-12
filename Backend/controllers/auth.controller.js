import User from "../models/user.models.js"
import Profile from "../models/profile.model.js"

import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"
function getRandomAvatarNumber() {
    return Math.floor(Math.random() * 76) + 1; // Генерация случайного числа от 1 до 10
}

// Функция для генерации имени файла аватарки
function getAvatarFilename(avatarNumber) {
    return `${avatarNumber}.jpg`; // Формат имени файла аватарки
}

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const avatarNumber = getRandomAvatarNumber();
        const profilePic = getAvatarFilename(avatarNumber);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic
        });

        if (newUser) {
            const newProfile = await Profile.create({ userId: newUser._id });
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                profile: newProfile,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// export const signup = async (req, res) => {
//     try {
//         const { fullName, username, password, confirmPassword, gender } = req.body
        
//         if (password !== confirmPassword) {
//             return res.status(400).json({ error: "pass is not correct" })
//         }

//         const user = await User.findOne({ username })

//         if (user) {
//             return res.status(400).json({ error: "Username is not correct" })
//         }

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
//         const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

//         const newUser = new User({
//             fullName,
//             username,
//             password: hashedPassword,
//             gender,
//             profilePic: gender === "male" ? boyProfilePic : girlProfilePic
//         })

//         if (newUser) {

//             const newProfile = await Profile.create({ userId: newUser._id });
//             // gen JWT here
//             generateTokenAndSetCookie(newUser._id, res)
//             await newUser.save()

//             res.status(201).json({
//                 _id: newUser._id,
//                 fullName: newUser.fullName,
//                 username: newUser.username,
//                 profilePic: newUser.profilePic,
//                 profile: newProfile,
//             })
//         } else {
//             res.status(400).json({error: "Ivalid user data"})
//         }

//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" })
//     }
// }

export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

