import express from "express";
import auth from "../middleware/auth.js";
import {analyticsFriends, favsEvents} from "../controllers/postgresql/analyticsController.js";
import {trendingTag} from "../controllers/mongodb/eventsController.js";
const router = express.Router();

router.get('/friends', auth, analyticsFriends);
router.get('/hot', auth, favsEvents, trendingTag);

export default router;