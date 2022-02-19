import express from "express";
import {getUsers, createUser, verify, myProfile, userProfile} from "../controllers/postgresql/userController.js";
import auth from "../middleware/auth.js";
import {getEventsIdsCreatedByMe} from "../controllers/postgresql/eventsController.js";
import {getEventsInterests} from "../controllers/mongodb/eventsController.js";
const router = express.Router();

router.get('/', auth, getUsers);
router.post('/add', createUser);
router.post('/verify', auth, verify);
router.post('/profile', auth, myProfile);
router.get('/id/:userId', auth, userProfile);
router.get('/profile/interests', auth, getEventsIdsCreatedByMe, getEventsInterests);

export default router;