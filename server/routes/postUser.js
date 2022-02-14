import express from "express";
import {getUsers, createUser, verify, myProfile, userProfile} from "../controllers/postgresql/userController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/', auth, getUsers);
router.post('/add', createUser);
router.post('/verify', auth, verify);
router.post('/profile', auth, myProfile);
router.get('/id/:userId', auth, userProfile);

export default router;