import express from "express";
import auth from "../middleware/auth.js";
import {
    checkFriendship,
    createFriendship,
    friendsCounter,
    myFriends,
    removeFriendship
} from "../controllers/postgresql/friendshipsController.js";
const router = express.Router();

router.post('/create/id/:userId', auth, createFriendship);
router.get('/check/id/:userId', auth, checkFriendship);
router.get('/myFriends', auth, myFriends);
router.delete('/remove/id/:userId', auth, removeFriendship);
router.get('/friendsCounter/id/:userId', auth, friendsCounter);

export default router;