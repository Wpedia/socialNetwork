import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserPhotos, getUsersForSidebar, updateFullname, updateStatus, updateUserAvatar, followToUser, unfollowToUser, getUserSubscriptions, getFriends, getFollowers } from "../controllers/user.controller.js";

const router = express.Router()

router.get('/:userId/followers', protectRoute, getFollowers);
router.get('/subscriptions', protectRoute, getUserSubscriptions)
router.get("/", protectRoute, getUsersForSidebar)
router.get('/:userId/friends', protectRoute, getFriends);
router.get('/photos', protectRoute, getUserPhotos);

router.post('/avatar', updateUserAvatar)
router.post('/subscribe', protectRoute, followToUser)

router.put("/:userId/status", protectRoute , updateStatus);
router.put("/:userId/fullname", protectRoute , updateFullname);

router.delete('/unsubscribe/:targetUserId', protectRoute, unfollowToUser)




export default router