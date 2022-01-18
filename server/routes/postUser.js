import express from "express";
import { getUsers, createUser, verify, myProfile } from "../controllers/postgresql/userController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/', getUsers);
router.post('/add', createUser);
router.post('/verify', auth, verify);
router.post('/profile', auth, myProfile);

export default router;