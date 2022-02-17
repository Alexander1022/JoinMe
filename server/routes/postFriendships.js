import express from "express";
import auth from "../middleware/auth.js";
import {checkFriendship, createFriendship, myFriends} from "../controllers/postgresql/friendshipsController.js";
const router = express.Router();

router.post('/create/id/:userId', auth, createFriendship);
router.get('/check/id/:userId', auth, checkFriendship);
router.get('/myFriends', auth, myFriends);

export default router;