import express from "express";
import auth from "../middleware/auth.js";
import {analyticsEvents, analyticsFriends, favsEvents} from "../controllers/postgresql/analyticsController.js";
import {getEventsAnalytics, trendingTag} from "../controllers/mongodb/eventsController.js";
const router = express.Router();

router.get('/friends', auth, analyticsFriends);
router.get('/hot', auth, favsEvents, trendingTag);
router.get('/events', auth, analyticsEvents, getEventsAnalytics);

export default router;